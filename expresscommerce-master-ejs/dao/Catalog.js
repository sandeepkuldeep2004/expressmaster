const CatalogModel = require("../models/Catalog");
module.exports = {
  saveCatalog: async (data) => {
    Object.entries(data).forEach(async (element) => {
      const catalog = await getCatalog(element[1].code);
      if (!catalog) {
        const catalogModel = new CatalogModel({
          code: element[1].code,
          name: element[1].name,
          description: element[1].description,
        });
        catalogModel.save(function (err) {
          if (err) {
            console.log(err);
          }
        });
      } else {
        console.log("catalog with same code already exist");
      }
    });
  },
  getCatalogList : async function(param){ 
    return  CatalogModel.find({status:param}).sort({ creationdate: 'desc' }).lean();
  },
  getCatalog : async (code)=>{ 
     var catalog=  await CatalogModel.findOne({code:code}).lean();
     return catalog;
   },
   getCatalogById : async function(id){ 
    return  await CatalogModel.findById(id).lean();
  }
  
};
