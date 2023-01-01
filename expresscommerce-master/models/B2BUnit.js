const mongoose = require('mongoose')

const B2BUnitSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  vatId: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  localizedName: [
    { 
      lang: String,
      value: String 
    }],
  salesOrg: {
    type: String,
    required:false,
  },
  distributionChannel: {
    type: String,
    required:false,
  },
  division: {
    type: String,
    required:false,
  },
  parentBusinessUnit:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "B2BUnit",
      required: false,
    },
  shippingAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
    required: false,
  },
  billingAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
    required: false,
  },
  contact: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contact",
    required: false,
  },
  creationdate: {
    type: Date,
    default: Date.now,
  },
  modificationdate: {
    type: Date,
  }
});
module.exports = mongoose.model('B2BUnit', B2BUnitSchema)
