const WarehouseModel = require('../models/Warehouse')

// @desc    fetch all warehouse
//@param {active}
const getWarehouseList = async function(){ 

  return await WarehouseModel.find({}).lean();
}

// @desc    fetch Warehouse by code
//@param {active}
const getWarehouseByCode = async function(code){ 
  return  WarehouseModel.findOne({code:code}).lean();
}


module.exports={
  getWarehouseList, getWarehouseByCode
}