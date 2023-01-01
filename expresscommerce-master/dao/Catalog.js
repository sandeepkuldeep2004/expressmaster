const CatalogModel = require("../models/Catalog");
const { getCatalog } = require("../lib/catalog");

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
};
