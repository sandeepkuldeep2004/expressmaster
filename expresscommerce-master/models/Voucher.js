const mongoose = require('mongoose')

const VoucherSchema = new mongoose.Schema({
  code: { /** This code should be generated or uploaded by marketing team**/
    type: String,
    required: true,
  },
  type: {
    type: String,
    default:'ONETIME',
    enum: ['GIFT_VOUCHER','ONETIME','MULTI_USE']
  },
  amount: {
    type: Number,
    required:true,
  },
  currency: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Currency",
    required: true,
  },
  discountPercentage: {
    type: Number,
    required:false,
  },
  baseSite:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "BaseSite",
    required: true,
  },
  startDate:{
    type: Date,
  },
  expireDate:{
    type: Date,
  },
  status: {
    type: Boolean,
    default: true,
  }
});
module.exports = mongoose.model('Voucher', VoucherSchema)
