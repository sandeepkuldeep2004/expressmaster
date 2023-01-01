const SolrNode = require("solr-node");
const { getCatalogById } = require("../lib/catalog");
const { getCategoryByID } = require("../lib/category");
const { getProductPriceDetails } = require("./pricerow");
const { getProductStock } = require("./stocklevel");
const { getRatingData } = require("./customerReview");
const { getBaseSiteByCode } = require("../lib/basesite");
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('properties/local.properties');

var client = new SolrNode({
  host: properties.get("SOLR_HOST"),
  port: properties.get("SOLR_PORT"),
  core: properties.get("SOLR_CORE"),
  protocol: properties.get("SOLR_PROTOPCOL"),
});

const createProductInSolr = async function (product) {
  const baseSite = await getBaseSiteByCode(properties.get("DEFAULT_BASESITE_ID"));
  let currency;
  let currencySymbol;
  if (null != baseSite.defaultCurrency) {
    currency = baseSite.defaultCurrency.isocode;
    currencySymbol = baseSite.defaultCurrency.symbol;
  } else {
    currency = 'INR';
    currencySymbol = '₹';
  }

  console.log("Product syncing in solr with product code :: ", product.code)
  var catalog = await getCatalogById(product.catalog);
  //console.log('catalog is:', catalog.code)
  if (!catalog) {
    console.error("catalog not found with code ID: ", product.catalog)
    return;
  }
  //var category = await getCategoryByID(product.categories)
  //fetch all product Categories
  const categories = product.categories
  if (!categories && categories.length == 0) {
    console.error("category not found in product with code : ", product.code, " and category result ::", categories)
    return;
  }
  const categoryCodeCol = []
  const categoryNameCol = []
  const categoryNameColString = []
  for (category of categories) {
    let categoryModel = await getCategoryByID(category)
    categoryCodeCol.push(categoryModel.code);
    categoryNameCol.push(categoryModel.title);
    categoryNameColString.push("'" + categoryModel.code + "'")
  }

  // Check the product Price
  var productPrice = await getProductPriceDetails(product.code, catalog, currency);

  //check the product stock
  var productStock = await getProductStock(product.code);

  var media;
  if (product.medias && product.medias.length >= 1) {
    media = product.medias.sort((a, b) => a.priority - b.priority).shift();
    // console.log('Product -', product.code, ' Media is ==', media)
  }
  //calculate reviewAvgRating  
  var reviews = await getRatingData(product, null);
  //console.log("Review rating ::",reviews)
  var productRow =
  {
    id: product._id,
    code: product.code,
    code_string: "'" + product.code + "'",
    name: product.title,
    brand: product.brand,
    description: product.description,
    productType: product.productType,
    unit: product.unit,
    catalogCode: catalog.code,
    productApprovalstatus: product.status,
    inUseStatus: product.inUseStatus,
    fsnStatus: product.fsnStatus,
    onSale: product.onSale,
    isPerishable: product.isPerishable,
    isPickupAvailable: false,
    multidimensional: true,
    price: null != productPrice ? productPrice.priceValue : 0,
    formatedPrice: currencySymbol + (null != productPrice ? productPrice.priceValue.toFixed(2) : 0),
    currency: currency,
    inStock: null != productStock && productStock.availableQty >= 1 ? true : false,
    availableQtyInStock: null != productStock ? productStock.availableQty : 0,
    inStockstatus: null != productStock ? productStock.inStockStatus : 'null',
    creationdate: product.creationdate,
    categoryCode: categoryCodeCol,
    categoryName: categoryNameCol,
    categoryCode_string: categoryNameColString,
    thumbnailImage: media != null ? media.thumbnail : "",
    mainImage: media != null ? media.main : "",
    summary: product.description,
    ...reviews,
  };
  //console.log("row request is::", productRow)
  await client.update(productRow, { commit: true }, function (err, result) {
    if (err) {
      console.log("Error while indixing ::", err);
      return;
    }
    //console.log("Response:", result.responseHeader);
  });

}
const searchProductsByTerm = async (term, currentPage, pageSize, sort) => {

  // Search
  var keyword = '*' + term + '*';
  var OR_OP = ' OR ';
  var searchString = 'name:' + keyword
    + OR_OP
    + 'description:' + keyword + OR_OP
    + 'code_string:' + keyword + OR_OP
    + 'summary:' + keyword + OR_OP
    + 'brand:' + keyword + OR_OP
    + 'categoryName:' + keyword;

  try {
    // Build a search query var
    const searchQuery = client
      .query()
      .q(searchString)
      .addParams({
        wt: "json",
        indent: true
      })
      .start(currentPage * pageSize)
      .rows(pageSize)
      .sort("code " + sort)
      .facetQuery({ field: ['categoryCode', 'categoryName'], mincount: 1 });
    console.log(searchQuery);

    const result = await client.search(searchQuery);
    //  console.log('Product Search Response:: ', result);
    return successResponse(result)
  } catch (e) {
    console.error(e);
    return errorResponse(e)
  }
}


const removeProductInSolr = async (id) => {
  var objQuery = { id: +id }
  // Build a search query var
  try {
    // Update document to Solr server
    // Delete document using objQuery
    console.log("query:: ", objQuery)
    client.delete(objQuery, function (err, result) {
      if (err) {
        console.log("Error while deleting product", err);
        return;
      }
      console.log('Response:', result.responseHeader);
    });
  } catch (e) {
    console.error(e);
  }
}


const searchProductsByCategoryCode = async (categoryCode, currentPage, pageSize, sort) => {

  // Search
  var searchString = 'categoryCode_string:' + categoryCode;

  try {
    // Build a search query var
    const searchQuery = client
      .query()
      .q(searchString)
      .addParams({
        wt: "json",
        indent: true
      })
      .start(currentPage * pageSize)
      .rows(pageSize)
      .sort("code " + sort)
      .facetQuery({ field: 'categoryCode', mincount: 1 });
    console.log(searchQuery);


    const result = await client.search(searchQuery);
    //  console.log('Product Search Response:: ', result);
    return successResponse(result)
  } catch (e) {
    console.error("Error while searching ::", e);
    return errorResponse(e)
  }
}


const searchProductsByBrandName = async (brand, currentPage, pageSize, sort) => {

  // Search
  var searchString = 'brand:' + brand;

  try {
    // Build a search query var
    const searchQuery = client
      .query()
      .q(searchString)
      .addParams({
        wt: "json",
        indent: true
      })
      .start(currentPage * pageSize)
      .rows(pageSize)
      .sort("code " + sort)
      .facetQuery({ field: 'brand', mincount: 1 });
    console.log(searchQuery);


    const result = await client.search(searchQuery);
    //  console.log('Product Search Response:: ', result);
    return successResponse(result)
  } catch (e) {
    console.error("Error while searching ::", e);
    return errorResponse(e)
  }
}

const successResponse = (result) => {
  var products = [];
  var total = 0;
  var start = 0;
  var facet_fields = {};

  if (result && result.response) {
    products = result.response.docs;
    total = result.response.numFound;
    start = result.response.start;
  }
  if (result.facet_counts && result.facet_counts.facet_fields) {
    facet_fields = result.facet_counts.facet_fields
  }
  response = {
    "facets": { fields: facet_fields },
    "total": total,
    "start": start,
    "products": products,
  }
  return response;
}
const errorResponse = (e) => {
  return {
    "total": 0,
    "start": 0,
    "products": [],
    "error": e.message,
    "facets": {}
  }
}
const searchProductById = async (id) => {
  var strQuery = 'id:' + id;
  // Build a search query var
  const query = client
    .query()
    .q(strQuery)
    .addParams({
      wt: "json",
      indent: true,
    })
    .start(0)
    .rows(10);

  try {
    console.log('request:', query)
    const result = await client.search(query);
    console.log('Response:', result.response);
    return result.response.docs[0];
  } catch (e) {
    console.error(e);
    return errorResponse(e)
  }
}

const searchAllProducts = async () => {
  const authorQuery = "*:*";
  const result = null;
  // Build a search query var
  const query = client
    .query()
    .q(authorQuery)
    .addParams({
      wt: "json",
      indent: true,
    })
    .start(0)
    .rows(100);

  try {
    const result = await client.search(query);
    // console.log('Response:', result.response);
    return result.response;
  } catch (e) {
    console.error(e);
    return errorResponse(e)
  }
}
module.exports = {
  searchProductById, searchAllProducts, createProductInSolr,
  searchProductsByTerm, searchProductsByCategoryCode, removeProductInSolr, searchProductsByBrandName
}