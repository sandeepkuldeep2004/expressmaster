const CatalogModel = require('../models/Catalog')

// @desc    fetch all active Catalogs
//@param {active}
const getCatalogList = async function(param){ 
  return  CatalogModel.find({status:param}).sort({ creationdate: 'desc' }).lean();
}

// @desc    fetch all active Catalogs
//@param {active}
const getCatalog = async (code)=>{ 
 // console.log(" fetching catalog:: ",code)
  var catalog=  await CatalogModel.findOne({code:code}).lean();
  //console.log(" fetching catalog res:: ",catalog)
  return catalog;
}

// @desc    fetch all active Catalogs
//@param {active}
const getCatalogById = async function(id){ 
  return  await CatalogModel.findById(id).lean();
}

module.exports={
    getCatalogList, getCatalog, getCatalogById
}