const BaseSiteModel = require("../models/BaseSite");
const { getBaseSiteByCode } = require("../lib/basesite");
const { getCatalog } = require("../lib/catalog");
const {getCurrencyByIsoCode}=require("../lib/currency");
const {getLanguageByIsoCode}=require("../lib/language");
const {getCompanyByIsocode}=require("../lib/company");


module.exports = {
  saveBasesite: async (data) => {
    //console.log('Insert UserGroup started');
    Object.entries(data).forEach(async (element) => {
      const basesite = await getBaseSiteByCode(element[1].code);
      const productCatalog = await getCatalog(element[1].productCatalog);
      const contentCatalog = await getCatalog(element[1].contentCatalog);
      const language = await getLanguageByIsoCode(element[1].defaultLanguage);
      const currency = await getCurrencyByIsoCode(element[1].defaultCurrency);
      const company = await getCompanyByIsocode(element[1].company);
      if (basesite) {
        console.log(
          "basesite with same code " + element[1].code + " already exists, just updating the content"
        );
        BaseSiteModel.findOneAndUpdate(
          { code: element[1].code },
          {
            $set: {
              name: element[1].name,
              description: element[1].description,
              urls: element[1].urls,
              productCatalog: productCatalog,
              contentCatalog: contentCatalog,
              defaultCurrency:currency,
              defaultLanguage:language,
              company:company
            }
          },function (err) {
            if (err)
              console.log(err);
          })
      } else {
        const bseSiteModel = new BaseSiteModel({
          code: element[1].code,
          name: element[1].name,
          description: element[1].description,
          urls: element[1].urls,
          productCatalog: productCatalog,
          contentCatalog: contentCatalog,
          defaultCurrency:currency,
          defaultLanguage:language,
          company:company
        });
        bseSiteModel.save(function (err) {
          if (err) {
            console.log(err);
          }
          //  console.log('Insert UserGroup finished'); 
        });
      }
    });
  },
  getBaseSiteById : async function (id) {
    return await BaseSiteModel.findOne({ _id: id }).lean();
  },


};
