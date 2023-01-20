const ZoneModel = require("../models/Zone");
const {getZone} = require("../lib/zone");

module.exports = {
  saveZone: async (data) => {
    Object.entries(data).forEach(async (element) => {
      const zone = await getZone(element[1].code);
      if (zone) {
        //console.log("zone with same code " + element[1].code + " already exists");
      } else {
        const zoneModel = new ZoneModel({
          code: element[1].code,
          name: element[1].name,
          countries:element[1].countries
        });
        zoneModel.save(function (err) {
          if (err) {
            console.log(err);
          }
        });
      }
    });
  },
};
