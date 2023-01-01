const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');
const AddressSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: false,
  },
  firstname: {
    type: String,
    required: false,
    trim: false,
  },
  lastname: {
    type: String,
    required: false,
    trim: false,
  },
  email: {
    type: String,
    required: false,
  },
  fax: {
    type: String,
    required: false,
  },
  dateofbirth: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    required: false,
  },
  streetno: {
    type: String,
    required: true,
  },
  streetname: {
    type: String,
    required: true,
  },
  pobox: {
    type: String,
    required: false,
  },
  appartment: {
    type: String,
    required: false,
  },
  building: {
    type: String,
    required: false,
  },
  cellphone: {
    type: String,
    required: false,
  },
  phone1: {
    type: String,
    required: false,
  },
  phone2: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  region: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Region',
  },
  country: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country',
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  creationdate: {
    type: Date,
    default: Date.now,
  },
  modificationdate: {
    type: Date,
  },
  isShippingAddress: {
    type: Boolean,
    default:false,
  },
  isBillingAddress: {
    type: Boolean,
    default:false,
  }
})
AddressSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Address', AddressSchema)
