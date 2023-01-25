const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');

const NumberSeriesSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique:true,
  },
  number: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
    default:'numeric'
  },
  template: {
    type: String,
    required: false,
  },
  prefix: {
    type: String,
    required: false,
  },
  digits: {
    type: Number,
    required: false,
    default:10
  },
  startBy: {
    type: Number,
    required: true,
    default:0,
  },
})
NumberSeriesSchema.plugin(uniqueValidator);
module.exports = mongoose.model('NumberSeries', NumberSeriesSchema)
