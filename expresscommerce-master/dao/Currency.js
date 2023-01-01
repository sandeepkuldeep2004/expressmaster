const CurrencyModel = require("../models/Currency");
const {getCurrencyByIsoCode} = require("../lib/currency");

module.exports = {
  saveCurrency: async (data) => {
    Object.entries(data).forEach(async (element) => {
      const currency = await getCurrencyByIsoCode(element[1].isocode);
      if (currency) {
        console.log(
          "Currency with same isocode " + element[1].isocode + " already exists"
        );
      } else {
        const currencyModel = new CurrencyModel({
          isocode: element[1].isocode,
          name: element[1].name,
          conversion: element[1].conversion,
          digit: element[1].digit,
          symbol: element[1].symbol,
          fallbackcurrency: element[1].fallbackcurrency
        });
        currencyModel.save(function (err) {
          if (err) {
            console.log(err);
          }
        });
      }
    });
  },
};
