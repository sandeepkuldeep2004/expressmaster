const LanguageModel = require("../models/Language");
const { getLanguageByIsoCode} = require("../lib/language");

module.exports = {
  saveLanguage: async (data) => {
    Object.entries(data).forEach(async (element) => {
      const language = await getLanguageByIsoCode(element[1].isocode);
      if (language) {
        console.log(
          "Language with same isocode " + element[1].isocode + " already exists"
        );
      } else {
        const languageModel = new LanguageModel({
          isocode: element[1].isocode,
          name: element[1].name,
          fallbackLanguage: element[1].fallbackLanguage,
          
        });
        languageModel.save(function (err) {
          if (err) {
            console.log(err);
          }
        });
      }
    });
  },
};
