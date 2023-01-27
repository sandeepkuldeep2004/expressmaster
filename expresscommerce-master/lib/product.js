const ProductModel = require('../models/Product')
const { getCatalog } = require('../lib/catalog');
const { fetchProductPrice } = require("../lib/pricerow");
const { getDefaultBaseSite } = require("./basesite");
const { fetchProductStock } = require("../lib/stocklevel");
const { getRatingData } = require("../lib/customerReview");
const { getLanguageByIsoCode } = require("../lib/language");
// @desc    fetch all active Catalogs
//@param {active}
//This method needs to correct
const getProductList = async function (codes) {
  //var valueArr = codes.split(', ')
  var products = []
  for (code of codes) {

    var stringArray = code.split(':')
    console.log(stringArray)
    const catalog = await getCatalog(stringArray[1]);
    var product = await getProduct(stringArray[0], catalog);
    products.push(product);
  }

  return products;
}

// @desc    fetch all products
//@param {active}
//This method needs to correct
const getProducts = async () => {
  //var valueArr = codes.split(', ')
  console.log("Searching all products")
  var products = await ProductModel.find()
    .populate([
      { path: 'medias', model: 'Media', select: 'code priority main thumbnail type -_id', populate: { path: 'catalog', select: 'code -_id' } },
      { path: 'categories', model: 'Category', select: 'code title' },
      { path: 'catalog', select: 'code' },
      { path: 'baseProduct', select: 'code ' }
    ]).lean();
  // console.log("Searching all products",products)
  return products;
}


const populateProduct = async function (products) {
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
      const language1 = await getLanguageByIsoCode("en_US");
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
const getProductDTOByProductModel1 = async function (product, catalog, currency, symbol, language) {
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
  let priceJson = await fetchProductPrice(product, catalog, currency, symbol)
  //check the product stock
  var stockJson = await fetchProductStock(product);
  //calculate reviewAvgRating  
  var reviews = await getRatingData(product, language);
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
const getProductDTOByProductModel = async function (product) {
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


// @desc    fetch product by code
//@param {code}
const getProductDTOByCode = async function (code) {
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
const getProductByCode = async function (code) {
  return await ProductModel.findOne({ code: code })
    .populate([
      { path: 'medias', model: 'Media', select: 'code priority main thumbnail type -_id', populate: { path: 'catalog', select: 'code -_id' } },
      { path: 'categories', model: 'Category', select: 'code title' },
      { path: 'catalog', select: 'code -_id', },
      { path: 'baseProduct', select: 'code ' }
    ]).lean();
}


// @desc    fetch product by brand Name
//@param {code}
const getProductByBrandName = async function (brand) {
  return await ProductModel.find({ brand: brand})
    .populate([
      { path: 'medias', model: 'Media', select: 'code priority main thumbnail type -_id', populate: { path: 'catalog', select: 'code -_id' } },
      { path: 'categories', model: 'Category', select: 'code title' },
      { path: 'catalog', select: 'code -_id', },
      { path: 'baseProduct', select: 'code ' }
    ]).lean();
}

// @desc    fetch product By code and catalog
//@param {code,catalog}
const getProduct = async function (code, catalog) {
  //console.log('requested ', code, ' | catalog', catalog)
  return ProductModel.findOne({ code: code, catalog: catalog })
    .populate([
      { path: 'medias', model: 'Media', select: 'code priority main thumbnail type _id', populate: { path: 'catalog', select: 'code -_id' } },
      { path: 'categories', model: 'Category', select: 'code title' },
      { path: 'catalog', select: 'code -_id', },
      { path: 'baseProduct', populate: { path: 'variants', populate: { path: 'medias', } } },
      { path: 'variants', populate: { path: 'medias', } }
    ]).lean();
}
// @desc    fetch all active Catalogs
//@param {active}
const getProductByBaseProduct = async function (baseProductCode, catalog) {
  return ProductModel.find({ baseProduct: baseProductCode, catalog: catalog }).lean();
}

// @desc    fetch product by Id
//@param {code}
const getProductById = async function (id) {
  return ProductModel.findOne({ _id: id })
    .populate([
      { path: 'medias', model: 'Media', select: 'code priority main thumbnail type -_id', populate: { path: 'catalog', select: 'code -_id' } },
      { path: 'categories', model: 'Category', select: 'code title' },
      { path: 'catalog', select: 'code -_id', },
      { path: 'baseProduct', select: 'code ' }
    ]).lean();
}


module.exports = {
  getProductList, getProduct, getProducts, getProductByCode,
  getProductByBaseProduct, getProductById, getProductDTOByCode, getProductDTOByProductModel,
  populateProduct,getProductByBrandName
}