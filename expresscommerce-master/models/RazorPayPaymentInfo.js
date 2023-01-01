const mongoose = require('mongoose')

const RazorPayPaymentInfoSchema = new mongoose.Schema({

  paymentTransaction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PaymentTransaction',
    required: true,
  },
  paymentId: {
    type: String,
    required: true,
  },
  entity: {
    type: String,
    required: true,
    default: 'payment'
  },
  amount: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  currency: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: true,
    default: "created",
  },
  paymentOrderId: {
    type: String,
    required: false,
  },
  invoiceId: {
    type: String,
    required: false,
  },
  international: {
    type: Boolean,
    required: false,
  },
  method: {
    type: String,
    required: false,
  },
  amountRefunded: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  refundStatus: {
    type: String,
    required: false,
  },
  captured: {
    type: Boolean,
    required: true,
    default: false
  },
  description: {
    type: String,
    required: true,
  },
  cardId: {
    type: String,
    required: true,
  },
  bank: {
    type: String,
    required: true,
  },
  wallet: {
    type: String,
    required: true,
  },
  vpa: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  fee: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  tax: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  errorCode: {
    type: String,
    required: false,
  },
  errorDescription: {
    type: String,
    required: false,
  },
  errorSource: {
    type: String,
    required: false,
  },
  errorStep: {
    type: String,
    required: false,
  },
  errorReason: {
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
  card: {}
});
module.exports = mongoose.model('RazorPayPaymentInfo', RazorPayPaymentInfoSchema)
