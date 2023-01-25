const SubModuleModel = require('../models/SubModule')

// @desc    fetch all active Category
//@param {active}
const getSubModuleList = async function(){ 
  return  SubModuleModel.find({}).sort({ name: 'asc' }).lean();
}

// @desc    fetch Category by code
//@param {active}
const getSubModuleByIsocode = async function(isocode){ 
  return  SubModuleModel.findOne({isocode:isocode}).lean();
}

// @desc    fetch Category by Is
//@param {active}
const getSubModuleById = async function(id){ 
  return  SubModuleModel.findOne({_id:id}).lean();
}

// @desc    fetch Category by Code
const getSubModuleByCode = async function(code){ 
  return  SubModuleModel.findOne({code:code}).lean();
}

module.exports={
  getSubModuleList, getSubModuleByIsocode,getSubModuleById,getSubModuleByCode
}