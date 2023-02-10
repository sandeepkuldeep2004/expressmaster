const B2BUnitModel = require('../models/B2BUnit')

// @desc   fetch B2BUnit by code
//@param {code}
const getB2BUnitByCode = async function(code){ 
  return  B2BUnitModel.findOne({code:code}).lean();
}

// @desc    fetch Currency by isocode
//@param {active}
const getB2BUnitList = async function(code){ 
  return  B2BUnitModel.find({}).lean();
}

module.exports={
  getB2BUnitByCode,getB2BUnitList
}