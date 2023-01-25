const DeliveryModeModel =require('../models/DeliveryMode');

// @desc    gets deliveryModes 
//@param {code}
const getDeliveryModes = async function(){ 
    var deliveryModes= await DeliveryModeModel.find().lean();
  //  console.log("Delivery Mode count !!!",deliveryModes.length)
    return deliveryModes;
}

// @desc gets deliveryMode details
//@param {code}
  const getDeliveryModeByCode = async function(code){ 
    const deliveryMode = await DeliveryModeModel.findOne({code:code}).lean();
    return deliveryMode;
  }

module.exports={
    getDeliveryModes,getDeliveryModeByCode
}