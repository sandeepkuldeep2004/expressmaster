const mongoose = require('mongoose')

const PaymentTransactionSchema = new mongoose.Schema({
  owner: {},
  referenceOrder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: false,
  },
  paymentMethod: {
    type: String,
    required: true,
    default: 'CASH',
    enum: ["CASH", "CREDIT_CARD", "DEBIT_CARD", "WALLET", "NET_BANKING", "RAZORPAY"],
  },
  code: {
    type: String,
    required: true,
  },
  entries: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PaymentTransactionEntry',
      required: false,
    }
  ],
  status: {
    type: String,
    required: true,
    default: "CREATED",
    enum: ["PAID", "PENDING", "FAILED", "REFUNDED", "CREATED"],
  },
  razorPayOrderInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RazorPayOrderInfo',
    required: false,
  },
  plannedAmount: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  isCashOnDelivery: {
    type: Boolean,
    required: true,
    default: false,
  },
  isRazorpay: {
    type: Boolean,
    required: true,
    default: false,
  },
  currencyCode: {
    type: String,
    required: false,
  },
  comment: {
    type: String,
    required: false,
  },
  versionID: {
    type: String,
    required: false,
  },
  creationdate: {
    type: Date,
    default: Date.now
  }

});
module.exports = mongoose.model('PaymentTransaction', PaymentTransactionSchema)
