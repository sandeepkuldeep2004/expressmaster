const LanguageModel = require('../models/Language')

// @desc    fetch all active Category
//@param {active}
const getLanguageList = async function(){ 

  return await LanguageModel.find({}).lean();
}

// @desc    fetch Category by code
//@param {active}
const getLanguageByIsoCodeService = async function(isocode){ 
  return  LanguageModel.findOne({isocode:isocode}).lean();
}


module.exports={
  getLanguageList, getLanguageByIsoCodeService
}