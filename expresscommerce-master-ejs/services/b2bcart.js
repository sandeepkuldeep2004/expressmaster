const B2BCartModel = require('../models/B2BCart')

// @desc    fetch cart by Id
//@param {active}
const getB2BCartById = async function(id){ 
  return  B2BCartModel.findById(id);
}

module.exports={
  getB2BCartById
}