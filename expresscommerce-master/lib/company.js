const CompanyModel = require('../models/Company')

// @desc    fetch all active Category
//@param {active}
const getCompanyList = async function(){ 
  return  CompanyModel.find({}).sort({ name: 'asc' }).lean();
}

// @desc    fetch Category by code
//@param {active}
const getCompanyByIsocode = async function(isocode){ 
  return  CompanyModel.findOne({isocode:isocode}).lean();
}

// @desc    fetch Category by Is
//@param {active}
const getCompanyById = async function(id){ 
  return  CompanyModel.findOne({_id:id}).lean();
}

module.exports={
  getCompanyList, getCompanyByIsocode,getCompanyById
}