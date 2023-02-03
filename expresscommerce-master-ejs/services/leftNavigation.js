const NavigationModel = require('../models/LeftNavigation.js')

// @desc    fetch Category by code
//@param {active}
const getNavigationByCode = async function(code){ 
  return  NavigationModel.findOne({code:code}).lean();
}

module.exports={
  getNavigationByCode
}