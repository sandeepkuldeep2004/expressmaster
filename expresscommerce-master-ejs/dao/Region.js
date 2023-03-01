const RegionModel = require("../models/Region");
const {getRegionByIsoCode} = require("../lib/region");
const {getCountryByIsocode} = require("../lib/country");

module.exports = {
  saveRegion: async (data) => {
    Object.entries(data).forEach(async (element) => {
      const region = await getRegionByIsoCode(element[1].isocode);
      if (region) {
        console.log("region with same code " + element[1].isocode + " already exists");
      } else {
        const country = await getCountryByIsocode(element[1].country);
        const regionModel = new RegionModel({
          isocode: element[1].isocode,
          name: element[1].name,
          country:country,
          
        });
        regionModel.save(function (err) {
          if (err) {
            console.log(err);
          }
        });
      }
    });
  },
};
