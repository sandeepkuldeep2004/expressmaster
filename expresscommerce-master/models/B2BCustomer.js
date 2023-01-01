const mongoose = require('mongoose')

const B2BCustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: false,
  },
  sessionLanguage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Language',
    required:false,
  },
  sessionCurrency: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Currency',
    required:false,
  },
  baseSite: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BaseSite',
    required:false,
  },
  defaultB2BUnit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'B2BUnit',
    required:false,
  },
  userGroup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserGroup',
    required:false,
  },
  defaultPaymentAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
    required:false,
  },
  defaultShipmentAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
    required:false,
  },
  defaultCart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart',
    required:false,
  },
  password: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  modificationDate: {
    type: Date,
    default: Date.now,
  }
});
module.exports = mongoose.model('B2BCustomer', B2BCustomerSchema)
