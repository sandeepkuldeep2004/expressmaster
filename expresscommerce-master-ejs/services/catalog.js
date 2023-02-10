const CatalogModel = require('../models/Catalog')

// @desc    fetch all active Catalogs
//@param {active}
const getCatalogListService = async function(param){ 
  return  CatalogModel.find({status:param}).sort({ creationdate: 'desc' }).lean();
}

// @desc    fetch all active Catalogs
//@param {active}
const getCatalogService = async (code)=>{ 
 // console.log(" fetching catalog:: ",code)
  var catalog=  await CatalogModel.findOne({code:code}).lean();
  //console.log(" fetching catalog res:: ",catalog)
  return catalog;
}

// @desc    fetch all active Catalogs
//@param {active}
const getCatalogByIdService = async function(id){ 
  return  await CatalogModel.findById(id).lean();
}

module.exports={
    getCatalogListService, getCatalogService, getCatalogByIdService
}