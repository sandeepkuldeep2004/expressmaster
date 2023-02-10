const CurrencyModel = require('../models/Currency')

// @desc    fetch all Currency
//@param {active}
const getCurrencyList = async function(){ 

  return await CurrencyModel.find({}).lean();
}

// @desc    fetch Currency by isocode
//@param {active}
const getCurrencyByIsoCode = async function(isocode){ 
  return  CurrencyModel.findOne({isocode:isocode}).lean();
}

// @desc    fetch Currency by isocode
//@param {active}
const getCurrencyById = async function(id){ 
  return await  CurrencyModel.findById(id).lean();
}

module.exports={
  getCurrencyList, getCurrencyByIsoCode,getCurrencyById
}