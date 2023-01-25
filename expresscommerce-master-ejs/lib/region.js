const RegionModel = require('../models/Region')


// @desc    fetch all active Category
//@param {active}
const getRegionListByCountry = async function(country){ 

  return await RegionModel.find({country:country}).sort({ name: 'asc' }).lean();
}

// @desc    fetch Category by code
//@param {active}
const getRegionByIsoCode = async function(isocode){ 
  return  RegionModel.findOne({isocode:isocode}).lean();
}

// @desc    fetch Category by Id
//@param {active}
const getRegionById = async function(id){ 
  return  RegionModel.findOne({_id:id}).lean();
}

module.exports={
  getRegionListByCountry, getRegionByIsoCode, getRegionById
}