const { ensureAuth } = require('../middleware/auth')
const CatalogModel = require('../models/Catalog')
const CategoryModel = require('../models/Category')
const CountryModel = require('../models/Country')

// @desc    fetch all active Catalogs
//@param {active}
const getCatalogList = async function(param){ 
  return  CatalogModel.find({}).sort({ creationdate: 'desc' }).lean();
}

// @desc    fetch all active Catalogs
//@param {active}
const getCategoryList = async function(param){ 
  return  CategoryModel.find({}).sort({ creationdate: 'desc' }).lean();
}


// @desc    fetch all active Catalogs
//@param {active}
const getCountryList = async function(param){ 
  return  CountryModel.find({}).sort({ name: 'asc' }).lean();
}

module.exports={
    getCatalogList, getCategoryList,getCountryList
}