const NumberSeriesModel = require("../models/NumberSeries");
const { getCurrentNumber, getNumberSeries } = require("../lib/numberseries");

module.exports = {
  saveNumberSeries: async (data) => {
    Object.entries(data).forEach(async (element) => {
      //      console.log("numberSeries Request::", element);
      const numberSeries = await getNumberSeries(element[1].key);
      let number = '' + element[1].startBy;
      number = number.padEnd(element[1].digits, '0').slice(0, -1) + '1';;
      if (!numberSeries) {

        const numberSeriesModel = new NumberSeriesModel({
          key: element[1].key,
          type: element[1].type,
          prefix: element[1].prefix,
          digits: element[1].digits,
          template: element[1].template,
          startBy: element[1].startBy,
          number: number,
        });
        numberSeriesModel.save(function (err) {
          if (err) {
            console.log(err);
          }
        });

      } else {
        console.log("numberSeriesModel with same key already exist");
      }
    });

  },
};
