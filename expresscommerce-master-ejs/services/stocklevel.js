const ProductStockModel = require('../models/ProductStock')
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('properties/local.properties');
const {getProductStock,getStockByWarehouseAndProductCode} = require('../dao/ProductStock')




// @desc    fetch products stock 
//@param {active}
const getProductStockService = async function(productCode){ 
  return await getProductStock(productCode);
}


//product Stock method
const getProductStockDataService = async function (product) {
  var enableStockCheck = properties.get("product.stock.check.enable");
  var productStock;
  if (enableStockCheck) {
    var productStock = await getProductStock(product.code);
    return productStock;
  }
}

const fetchProductStockService = async function(product) {
  var productStock = await getProductStockDataService(product);
  var stockJson;
  if (productStock) {
    stockJson = {
      stock: {
        stockLevel: productStock.availableQty,
        stockLevelStatus: productStock.inStockStatus
      }
    };
  }
  return stockJson;
}

// @desc    fetch products stock by warehouse and catelog
//@param {active}
const getStockByWarehouseAndProductCodeService = async function(productCode,warehouseCode){ 
  return await getStockByWarehouseAndProductCode(productCode,warehouseCode);
}


module.exports={
  getProductStockService, getStockByWarehouseAndProductCodeService,fetchProductStockService,getProductStockDataService
}