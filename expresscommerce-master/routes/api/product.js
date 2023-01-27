const express = require("express");
const router = express.Router();
const { ensureTokenAuth } = require("../../middleware/auth");
const { getProducts, getProduct, getProductById, getProductByBrandName } = require("../../lib/product");
const { getBrandByName } = require("../../lib/brand");
const { fetchProductPrice } = require("../../lib/pricerow");
const { getBaseSiteByCode } = require("../../lib/basesite");
const { fetchProductStock } = require("../../lib/stocklevel");
const { getRatingData } = require("../../lib/customerReview");
const { getLanguageByIsoCode } = require("../../lib/language");
const { getCategoryByID } = require("../../lib/category");
const { getMediaWithCatalog } = require("../../lib/media");
const ProductModel = require("../../models/Product");
// Read the properies file 
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('properties/local.properties');
const url = require('url');
var http = require('http');



// @desc   get all product List
// @route   GET /product List
router.get("/:baseSiteId/products/", ensureTokenAuth, async (req, res) => {
  try {
    console.log("entereeeeeee");
    const productList = await getProducts();
    // console.log(productList);
    res.status(200).json(productList);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err,
    });
  }
});

// @desc   get all product By Brand Name
// @route   GET /product List by Brand name
router.get("/:baseSiteId/products/brand/:name", ensureTokenAuth, async (req, res) => {
  // Check Brand
  const brand = await getBrandByName(req.params.name);
  if (null === brand) {
    return res.status(404).json({ "error": 400, "message": "Brand not available", "Brand Name": req.body.brand });
  }
  else {
    try {
      
      const productList = await getProductByBrandName(req.params.name);
      console.log(productList);
      res.status(200).json(productList);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: err,
      });
    }
  }
});



router.post("/:baseSiteId/setbaseproduct", ensureTokenAuth, async (req, res) => {
  try {
    console.log("entereeeeeee");
    const oAuthClient = req.user;
    const baseSite = await getBaseSiteByCode(req.params.baseSiteId);
    const catalog = baseSite.productCatalog;
    const product = await getProduct(req.body.productCode, catalog);
    const baseProductCode = await getProduct(req.body.baseProductCode, catalog);
    console.log("product::", product);
    console.log("baseProductCode::", baseProductCode);

    //productParams  
    baseProductParams = {
      baseProduct: baseProductCode
    };
    const savedData = await ProductModel.findByIdAndUpdate(product._id, { $set: baseProductParams });
    console.log("savedData::", savedData);

    return res.status(200).json(savedData);


  } catch (err) {

  }

});
// @desc   get product based on code and session catalog
// @route   get /product based on code 
router.get("/:baseSiteId/medias/:mediaCode", ensureTokenAuth, async (req, res) => {
  try {
    const baseSite = await getBaseSiteByCode(req.params.baseSiteId);
    const catalog = baseSite.productCatalog;

    //const searchProduct = await getProduct(req.params.productCode, catalog);
    const media = await getMediaWithCatalog(req.params.mediaCode, catalog);
    res.status(200).json(media);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err,
    });
  }
});

// @desc   get product based on code and session catalog
// @route   get /product based on code 
router.get("/:baseSiteId/products/:productCode", ensureTokenAuth, async (req, res) => {
  try {
    const oAuthClient = req.user;
    const baseSite = await getBaseSiteByCode(req.params.baseSiteId);
    console.log("baseSite:", baseSite);
    const catalog = baseSite.productCatalog;
    // console.log("catalog:", catalog);
    let currency;
    let currencySymbol;
    if (null != baseSite.defaultCurrency) {
      currency = baseSite.defaultCurrency.isocode;
      currencySymbol = baseSite.defaultCurrency.symbol;
    } else {
      currency = 'INR';
      currencySymbol = '₹';
    }

    let language;
    if (null != baseSite.defaultLanguage) {
      language = baseSite.defaultLanguage._id;
    } else {
      const language1 = await getLanguageByIsoCode("en_US");
      language = language1._id;
    }
    // Check search product 
    const product = await getProduct(req.params.productCode, catalog);
    if (null === product) {
      return res.status(200).json({ "error": 400, "message": "Product not available", "product code": req.body.productCode });
    }


    //creating DAO for product     
    var productJson =
    {
      id: product._id,
      code: product.code,
      name: product.title,
      description: product.description,
      productType: product.productType,
      unit: product.unit,
      catalogCode: catalog.code,
      productApprovalstatus: product.status,
      inUseStatus: product.inUseStatus,
      fsnStatus: product.fsnStatus,
      onSale: product.onSale,
      isPerishable: product.isPerishable,
      creationdate: product.creationdate,
      thumbnailImage: product.thumbnailImage != null ? product.thumbnailImage : "",
      mainImage: product.mainImage != null ? product.mainImage : "",
      baseProduct: product.baseProduct != null ? product.baseProduct.code : "",
      medias: product.medias,
      categories: product.categories,
      rating: product.rating,
      catalog: product.catalog,
    };

    // fetch the product Price
    var priceJson = await fetchProductPrice(product, catalog, currency, currencySymbol);

    //check the product stock
    var stockJson = await fetchProductStock(product);

    //calculate reviewAvgRating  
    var reviews = await getRatingData(product, language);
    var reviewsJson = { productReviews: reviews };

    var variantOptions = await fetchVariantOptions(product, catalog, currency, currencySymbol);

    var baseOptions = await fetchBaseOptions(product, catalog, currency, currencySymbol);
    console.log('base product:', baseOptions)
    //Merging all the Json into single response
    var productDetail = {
      ...productJson,
      ...priceJson,
      ...stockJson,
      ...reviewsJson,
      ...variantOptions,
      ...baseOptions
    };
    var productDetailCol = []
    productDetailCol.push(productDetail)
    res.status(200).json(productDetailCol);

  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err,
    });
  }
});

async function fetchBaseOptions(product, catalog, currency, currencySymbol) {

  if (product.baseProduct) {
    var baseProduct = product.baseProduct;
    var variantsProducts = [];
    console.log('Base product variants', baseProduct.variants)
    if (null != baseProduct.variants && baseProduct.variants.length >= 1) {
      //To get variants- get all product which have same searchproduct code in baseproduct field 
      for (variant of baseProduct.variants) {
        console.log('variant:: ', variant)
        var variantObject = await fetchVariantDetails(variant, catalog, currency, currencySymbol);
        variantsProducts.push(variantObject)
      }
    }
    var baseProductJson = {
      baseProduct: baseProduct.code,
      baseOptions: [{
        options: variantsProducts,
        selected: variantsProducts.filter(variantObject => product.code === variantObject.code).shift(),
        variantType: 'StyleVariantProduct'
      }]
    }
  }
  return baseProductJson;
}

async function fetchVariantOptions(product, catalog, currency, currencySymbol) {

  var variantsProductsJson;
  var variantsProducts = [];
  if (null != product.variants && product.variants.length >= 1) {
    //To get variants- get all product which have same searchproduct code in baseproduct field 
    for (variant of product.variants) {
      //  console.log('variant:: ', variant)
      var variantObject = await fetchVariantDetails(variant, catalog, currency, currencySymbol);
      variantsProducts.push(variantObject)
    }
  }
  variantsProductsJson = {
    variantOptions: variantsProducts
  }
  return variantsProductsJson;
}

const currencySymbal = (currency) => {
  return currency == 'USD' ? '$' : '₹';
}

//product code method
const getBaseProductCode = async function (product) {
  if (null != product.baseProduct) {
    const baseProduct = await getProductById(product.baseProduct._id);
    return baseProduct.code;
  } else {
    return "";
  }
}

module.exports = router;

async function fetchVariantDetails(variant, catalog, currency, currencySymbol) {
  var productJson = {
    code: variant.code,
    name: variant.title,
    medias: variant.medias,
    color: variant.color,
    size: variant.size
  };
  // fetch the product Price
  var priceJson = await fetchProductPrice(variant, catalog, currency, currencySymbol);
  //check the product stock
  var stockJson = await fetchProductStock(variant);
  var variantObject = {
    ...productJson,
    ...priceJson,
    ...stockJson,
  };
  return variantObject;
}


