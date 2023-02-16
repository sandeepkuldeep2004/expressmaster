const RegionModel = require('../models/Region');
const {getCountryById} = require('../services/country');

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
const getRegionByIdServices = async function(id){ 
  return  RegionModel.findOne({_id:id}).lean();
}
// Get all Region with country name
const getAllRegionServices = async function(id){   
  const regionList = await RegionModel.find({}).sort({ name: "asc" }).lean();
  var regionListF = [];
  for (regionListIrr of regionList) {
    const country = await getCountryById(regionListIrr.country);
    let regionListObj = {
      _id: regionListIrr._id,
      isocode: regionListIrr.isocode,
      name: regionListIrr.name,
      country: country,
    };
    regionListF.push(regionListObj);
    
  }
  return regionListF;
}

module.exports={
  getRegionListByCountry, getRegionByIsoCode, getRegionByIdServices, getAllRegionServices
}