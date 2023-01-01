const mongoose = require('mongoose')

const CurrencySchema = new mongoose.Schema({
  isocode: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  conversion: {
    type: Number,
    required: false,
  },
  digit: {
    type: Number,
    required: false,
  },
  symbol: {
    type: String,
    required: false,
  },
  fallbackcurrency: {
    type: String,
    required:false,
  },
  status: {
    type: String,
    default: 'active',
    enum: ['active', 'inactive'],
  }
});
module.exports = mongoose.model('Currency', CurrencySchema)
