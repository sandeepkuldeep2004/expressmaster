const ProductStockModel = require('../models/ProductStock')
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('properties/local.properties');



// @desc    fetch products stock 
//@param {active}
const getProductStock = async function(productCode){ 
  return await ProductStockModel.findOne({productCode:productCode}).lean();
}


//product Stock method
const getProductStockData = async function (product) {
  var enableStockCheck = properties.get("product.stock.check.enable");
  var productStock;
  if (enableStockCheck) {
    var productStock = await getProductStock(product.code);
    return productStock;
  }
}

const fetchProductStock = async function(product) {
  var productStock = await getProductStockData(product);
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
const getStockByWarehouseAndProductCode = async function(productCode,warehouseCode){ 
  return await ProductStockModel.findOne({productCode:productCode,warehouseCode:warehouseCode}).lean();
}


module.exports={
  getProductStock, getStockByWarehouseAndProductCode,fetchProductStock,getProductStockData
}