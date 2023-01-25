const ZoneModel = require('../models/Zone')


// @desc    fetch Zone by code
//@param {code}
const getZone = async function(code){ 
  return  ZoneModel.findOne({code:code}).lean();
}


module.exports={
     getZone
}