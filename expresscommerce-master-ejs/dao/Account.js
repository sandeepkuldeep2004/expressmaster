const B2BUnitModel = require("../models/B2BUnit");
const { getB2BUnitByCode } = require("../lib/b2bunit");

module.exports = {
  saveB2BUnit: async (data) => {
    Object.entries(data).forEach(async (element) => {
      const b2bUnit = await getB2BUnitByCode(element[1].code);
      if (!b2bUnit) {
        const b2bUnit = new B2BUnitModel({
          code: element[1].code,
          name: element[1].name,
          description: element[1].description,
        });
        b2bUnit.save(function (err) {
          if (err) {
            console.log(err);
          }
        });
      } else {
        console.log("B2BUnit with same code already exist");
      }
    });
  },
};
