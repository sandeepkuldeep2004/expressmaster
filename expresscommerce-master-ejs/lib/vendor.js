const VendorModel = require('../models/Vendor')

// @desc    fetch all active Category
//@param {active}
const getVendorList = async function(){ 

  return await VendorModel.find({}).lean();
}

// @desc    fetch Category by code
//@param {active}
const getVendorByCode = async function(code){ 
  return  VendorModel.findOne({code:code}).lean();
}


module.exports={
  getVendorList, getVendorByCode
}