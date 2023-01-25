const mongoose = require('mongoose')

const RazorPayOrderInfoSchema = new mongoose.Schema({

  paymentTransaction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PaymentTransaction',
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  amountPaid: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  amountDue: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  amount: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  entity: {
    type: String,
    required: true,
    default: 'order'
  },
  currency: {
    type: String,
    required: false,
  },
  receipt: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: true,
    default: "created",
  },
  versionID: {
    type: String,
    required: false,
  },
  notes: {
    type: String,
    required: false,
  },
  creationAt: {
    type: Date,
  },
  creationdate: {
    type: Date,
    default: Date.now,
  },
  payments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RazorPayPaymentInfo',
    required: false
  }]

});
module.exports = mongoose.model('RazorPayOrderInfo', RazorPayOrderInfoSchema)
