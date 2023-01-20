const DeliveryModeModel = require("../models/DeliveryMode");
const {getDeliveryModes} = require("../lib/deliverymode");

module.exports = {
  saveDeliveryModes: async (data) => {
    Object.entries(data).forEach(async (element) => {
      const deliveryModes = await getDeliveryModes();
      if (deliveryModes.length >0) {
        //console.log("delivery Modes already exists");
      } else {
        const deliveryModeModel = new DeliveryModeModel({
          code: element[1].code,
          name: element[1].name,
          description:element[1].description,
          status:element[1].status,
          deliveryCost:element[1].deliveryCost
        });
        deliveryModeModel.save(function (err) {
          if (err) {
            console.log(err);
          }
        });
      }
    });
  },
};
