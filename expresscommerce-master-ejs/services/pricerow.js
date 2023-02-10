const ProductPriceModel = require('../models/ProductPrice')
const {getProductPrice,getProductPriceDetails,fetchProductPrice} = require('../dao/ProductPrice')




// @desc    fetch products Price 
//@param {active}
const getProductPriceService = async function(productCode,catalog){ 
  return await getProductPrice(productCode,catalog);
}

// @desc    fetch products Price based on code & catalog & currency
//@param {active}
const getProductPriceDetailsService = async function(productCode,catalog,currency){ 
  return await getProductPriceDetails(productCode,catalog,currency);
}


const fetchProductPriceService =async function(product, catalog, currency, symbol) {
  var productPrice = await fetchProductPrice(product, catalog, currency);
  var priceJson;
  if (productPrice) {
    priceJson = {
      price: {        currencyIso: currency,
        formattedValue: symbol + productPrice.priceValue.toFixed(2),
        value: productPrice.priceValue.toFixed(2)
      }
    };
  }
  return priceJson;
}

module.exports={
  getProductPriceService,fetchProductPriceService,fetchProductPriceService,getProductPriceDetailsService
}