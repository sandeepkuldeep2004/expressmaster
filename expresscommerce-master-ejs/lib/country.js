const CountryModel = require('../models/Country')

// @desc    fetch all active Category
//@param {active}
const getCountryList = async function(){ 
  return  CountryModel.find({}).sort({ name: 'asc' }).lean();
}

// @desc    fetch Category by code
//@param {active}
const getCountryByIsocode = async function(isocode){ 
  return  CountryModel.findOne({isocode:isocode}).lean();
}

// @desc    fetch Category by Is
//@param {active}
const getCountryById = async function(id){ 
  return  CountryModel.findOne({_id:id}).lean();
}

module.exports={
    getCountryList, getCountryByIsocode, getCountryById
}