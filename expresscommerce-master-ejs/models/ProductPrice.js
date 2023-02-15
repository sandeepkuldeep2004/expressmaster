const mongoose = require('mongoose')

const ProductPriceSchema = new mongoose.Schema({
  productCode: {
    type: String,
    required: true,
  },
  priceValue: {
    type: Number,
    default:0,
    required:false,
  },
  currencyIsoCode: {
    type: String,
    required:false,
  },
  priceGroup: {
    type: String,
    required:false,
  },
  userpriceGroup: {
    type: String,
    required:false,
  },
  channel: {
    type: String,
    required:false,
  },
  unit: {
    type: String,
    required:false,
  },
  unitFactor: {
    type: Number,
    default:1,
    required:true,
  },
  fromDate: {
    type: Date,
    required:false,
  },
  toDate: {
    type: Date,
    required:false,
  },
  creationdate: {
    type: Date,
    default: Date.now,
  },
  modificationdate: {
    type: Date,
  },
  catalog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Catalog',
    required:true,
  }
   
});
module.exports = mongoose.model('ProductPrice', ProductPriceSchema)
