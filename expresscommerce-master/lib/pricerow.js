const ProductPriceModel = require('../models/ProductPrice')



// @desc    fetch products Price 
//@param {active}
const getProductPrice = async function(productCode,catalog){ 
  return await ProductPriceModel.findOne({productCode:productCode,catalog:catalog}).lean();
}

// @desc    fetch products Price based on code & catalog & currency
//@param {active}
const getProductPriceDetails = async function(productCode,catalog,currency){ 
  return await ProductPriceModel.findOne({productCode:productCode,catalog:catalog,currencyIsoCode:currency}).lean();
}


const fetchProductPrice =async function(product, catalog, currency, symbol) {
  var productPrice = await getProductPriceDetails(product.code, catalog, currency);
  var priceJson;
  if (productPrice) {
    priceJson = {
      price: {
        currencyIso: currency,
        formattedValue: symbol + productPrice.priceValue.toFixed(2),
        value: productPrice.priceValue.toFixed(2)
      }
    };
  }
  return priceJson;
}

module.exports={
  getProductPrice,getProductPriceDetails,fetchProductPrice
}