const ModuleModel = require('../models/Module')

// @desc    fetch all active Category
//@param {active}
const getModuleList = async function(){ 
  return  await ModuleModel.find({}).sort({ position: 'asc' }).lean();
}

// @desc    fetch Category by code
//@param {active}
const getModuleByIsocode = async function(isocode){ 
  return  ModuleModel.findOne({isocode:isocode}).lean();
}

// @desc    fetch Category by Is
//@param {active}
const getModuleById = async function(id){ 
  return  ModuleModel.findOne({_id:id}).lean();
}

// @desc    fetch Category by Code
const getModuleByCode = async function(code){ 
  return  ModuleModel.findOne({code:code}).lean();
}

const getModuleListActive = async function(){ 
  return  await ModuleModel.find({active: { $ne: false }}).sort({ name: 'asc' }).lean();
}


module.exports={
  getModuleList, getModuleByIsocode,getModuleById,getModuleByCode,getModuleListActive
}