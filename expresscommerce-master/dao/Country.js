const CountryModel = require("../models/Country");
const {getCountryByIsocode} = require("../lib/country");

module.exports = {
  saveCountry: async (data) => {
    Object.entries(data).forEach(async (element) => {
      const country = await getCountryByIsocode(element[1].isocode);
      if (country) {
        console.log(
          "Country with same isocode " + element[1].isocode + " already exists"
        );
      } else {
        const countryModel = new CountryModel({
          isocode: element[1].isocode,
          name: element[1].name,
          
        });
        countryModel.save(function (err) {
          if (err) {
            console.log(err);
          }
        });
      }
    });
  },
};
