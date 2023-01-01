const mongoose = require('mongoose')

const DeliveryModeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required:false,
  },
  description: {
    type: String,
    required:false,
  },
  status: {
    type: Boolean,
    default: 'true',
   },
   deliveryCost: {
    type: Number,
    default:0,
    required:false,
  }
});
module.exports = mongoose.model('DeliveryMode', DeliveryModeSchema)
