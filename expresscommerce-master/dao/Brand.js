const BrandModel = require("../models/Brand");
const { getBrandByName } = require("../lib/brand");
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('properties/local.properties');

module.exports = {
  saveBrand: async (data) => {
    Object.entries(data).forEach(async (element) => {
      console.log("Creating Brands with name- " + element[1].name);

      const brand = await getBrandByName(element[1].name);

      const hostname = properties.get("MEDIA_HOST_URL");
      if (brand) {
        console.log("Update Existing Brand with name:: ", element[1].name)
        await BrandModel.findOneAndUpdate(
          { name: element[1].name },
          {
            $set: {
              code: element[1].code,
              name: element[1].name,
              logo: hostname + element[1].logo,
            }
          },
          { new: true }
        ).lean();
      } else {
        console.log("creating new brand..... ", element[1].name)
        const brandJson = {
          code: element[1].code,
          name: element[1].name,
          logo: hostname + element[1].logo,
        }
        const brandModel = new BrandModel(brandJson);
        await brandModel.save();
      }
    });
  },
};
