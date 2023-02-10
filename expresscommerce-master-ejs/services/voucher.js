const VoucherModel = require('../models/Voucher')

// @desc    fetch vocuher by code
//@param {active}
const getVoucherByCode = async function(code){ 
  return  await VoucherModel.findOne({code:code}).lean();
}

module.exports={
  getVoucherByCode
}