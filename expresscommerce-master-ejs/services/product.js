const ProductModel = require('../models/Product')
const { getCatalogService } = require('../services/catalog');
const { fetchProductPriceService,getProductPriceService} = require("../services/pricerow");
const { getDefaultBaseSite } = require("./basesite");
const { fetchProductStockService,getProductStockService } = require("../services/stocklevel");
const { getRatingDataService } = require("../services/customerReview");
const { getLanguageByIsoCodeService } = require("../services/language");
const { getProducts,getProductByIds } = require("../dao/Product");

// @desc    fetch all active Catalogs
//@param {active}
//This method needs to correct
const getProductListService = async function (codes) {
  //var valueArr = codes.split(', ')
  var products = []
  for (code of codes) {

    var stringArray = code.split(':')
    console.log(stringArray)
    const catalog = await getCatalogService(stringArray[1]);
    var product = await getProduct(stringArray[0], catalog);
    products.push(product);
  }

  return products;
}

// @desc    fetch all products
//@param {active}
//This method needs to correct
const getProductsService = async () => {
  //var valueArr = codes.split(', ')
  const productsData = await getProducts();

  var productList=[];

  
        for (productsDataIrr of productsData) {
      var price = await getProductPriceService(productsDataIrr.code,productsDataIrr.catalog._id);
      var stock = await getProductStockService(productsDataIrr.code);
      var medias = await getProductDTOByProductMediaService(productsDataIrr.medias);

        let productsDataObj = {
          _id: productsDataIrr._id,
          code: productsDataIrr.code,
          title:productsDataIrr.title,
          status:productsDataIrr.status,
          categories:productsDataIrr.categories,
          medias:medias,
          price:price,
          stock:stock,
          catalog:productsDataIrr.catalog
        };
        productList.push(productsDataObj);
      }
  console.log("Searching all products",productList)

  return productList;
}


const populateProductService = async function (products) {
  let productDTOs = [];
  if (products && products.length > 0) {
    const baseSite = await getDefaultBaseSite();
    //console.log("baseSite:", baseSite);
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
      const language1 = await getLanguageByIsoCodeService("en_US");
      language = language1._id;
    }

    for (product of products) {
      let productDTO = await getProductDTOByProductModel1(product, catalog, currency, currencySymbol, language)
      productDTOs.push(productDTO);
    };
  }
  return productDTOs;
}

// @desc    fetch product by code
//@param {code}
const getProductDTOByProductModel1Service = async function (product, catalog, currency, symbol, language) {
  let mediaDTO;
  if (product.medias && product.medias.length >= 1) {
    media = product.medias.sort((a, b) => a.priority - b.priority).shift();
    //  console.log('Product -', product.code, ' Media is ==', media)
    mediaDTO = {
      thumbnail: media.thumbnail,
      main: media.main,
      type: media.type
    }
  }
  let priceJson = await fetchProductPriceService(product, catalog, currency, symbol)
  //check the product stock
  var stockJson = await fetchProductStockService(product);
  //calculate reviewAvgRating  
  var reviews = await getRatingDataService(product, language);
  var reviewsJson = { productReviews: reviews };

  let productData = {
    _id: product._id,
    code: product.code,
    title: product.title,
    description: product.description,
    status: product.status,
    media: mediaDTO,
    catalog: product.catalog.code,
    ...priceJson,
    ...stockJson,
    ...reviewsJson
  }
  return productData;
}
// @desc    fetch product by code
//@param {code}
const getProductDTOByProductModelService = async function (product) {
  let mediaDTO;
  if (product.medias && product.medias.length >= 1) {
    media = product.medias.sort((a, b) => a.priority - b.priority).shift();
    //  console.log('Product -', product.code, ' Media is ==', media)
    mediaDTO = {
      thumbnail: media.thumbnail,
      main: media.main,
      type: media.type
    }
  }
  let productData = {
    _id: product._id,
    code: product.code,
    title: product.title,
    description: product.description,
    status: product.status,
    media: mediaDTO,
    catalog: product.catalog.code
  }
  return productData;
}
const getProductDTOByProductMediaService = async function (medias) {
  let mediaDTO;
  if (medias && medias.length >= 1) {
    media = medias.sort((a, b) => a.priority - b.priority).shift();
    //  console.log('Product -', product.code, ' Media is ==', media)
    mediaDTO = {
      thumbnail: media.thumbnail,
      main: media.main,
      type: media.type
    }
  }
  
  return mediaDTO;
}


// @desc    fetch product by code
//@param {code}
const getProductDTOByCodeService = async function (code) {
  let product = await getProductByCode(code);
  let mediaDTO;
  if (product.medias && product.medias.length >= 1) {
    media = product.medias.sort((a, b) => a.priority - b.priority).shift();
    //console.log('Product -', product.code, ' Media is ==', media)
    mediaDTO = {
      thumbnail: media.thumbnail,
      main: media.main,
      type: media.type
    }
  }

  let productData = {
    code: product.code,
    title: product.title,
    description: product.description,
    status: product.status,
    media: mediaDTO
  }
  return productData;
}

// @desc    fetch product by code
//@param {code}
const getProductByCodeService = async function (id) {
  return await ProductModel.findOne({ _id: id })
    .populate([
      { path: 'medias', model: 'Media', select: 'code priority main thumbnail type -_id', populate: { path: 'catalog', select: 'code -_id' } },
      { path: 'catalog', select: 'code _id', },
      { path: 'baseProduct', select: 'code ' }
    ]).lean();
}

// @desc    fetch product By code and catalog
//@param {code,catalog}
const getProductService = async function (code, catalog) {
  //console.log('requested ', code, ' | catalog', catalog)
  return ProductModel.findOne({ code: code, catalog: catalog })
    .populate([
      { path: 'medias', model: 'Media', select: 'code priority main thumbnail type _id', populate: { path: 'catalog', select: 'code -_id' } },
      { path: 'categories', model: 'Category', select: '_id code title' },
      { path: 'catalog', select: 'code -_id', },
      { path: 'baseProduct', populate: { path: 'variants', populate: { path: 'medias', } } },
      { path: 'variants', populate: { path: 'medias', } }
    ]).lean();
}
// @desc    fetch all active Catalogs
//@param {active}
const getProductByBaseProductService = async function (baseProductCode, catalog) {
  return ProductModel.find({ baseProduct: baseProductCode, catalog: catalog }).lean();
}

// @desc    fetch product by Id
//@param {code}


const getProductByIdService = async function (code){
  //var valueArr = codes.split(', ')
  console.log("ids",+code);

  const productDataDetail = await getProductByIds(code);

  console.log("Searching all tewere fff products",+productDataDetail.code);

  var productList=[];
 
  console.log("Searching all tewere products",+productList)

  return productList;
}


module.exports = {
  getProductListService, getProductService, getProductsService, getProductByCodeService,
  getProductByBaseProductService, getProductByIdService, getProductDTOByCodeService, getProductDTOByProductModelService,
  populateProductService,getProductDTOByProductModel1Service,getProductDTOByProductMediaService
}