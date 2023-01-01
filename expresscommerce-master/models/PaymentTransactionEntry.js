const mongoose = require('mongoose')

const PaymentTransactionEntrySchema = new mongoose.Schema({

  paymentTransaction:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PaymentTransaction',
    required:true,
  },
  code:{
    type: String,
    required: true,
  },
  transactionStatus: {
    type: String,
    required: true,
    default: "ACCEPTED",
    enum: ["ACCEPTED", "ERROR","REJECTED","REVIEW"],
  },
  type: {
    type: String,
    default: "CAPTURED",
    enum: ["AUTHORIZATION", "REVIEW_DECISION","CAPTURE","PARTIAL_CAPTURE","REFUND_FOLLOW_ON","REFUND_STANDALONE","CANCEL","CREATE_SUBSCRIPTION","UPDATE_SUBSCRIPTION","GET_SUBSCRIPTION_DATA","DELETE_SUBSCRIPTION"],
  },
  amount: {
    type: mongoose.Schema.Types.Decimal128,
    required:true,
  },
  versionID: {
    type: String,
    required:false,
  },
  currencyCode: {
    type: String,
    required:true,
  },
  comment: {
    type: String,
    required:false,
  },
  creationdate: {
    type: Date,
    default: Date.now,
  }
  
});
module.exports = mongoose.model('PaymentTransactionEntry', PaymentTransactionEntrySchema)
