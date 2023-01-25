const mongoose = require('mongoose')

const ZoneDeliveryModeSchema = new mongoose.Schema({
  deliveryMode: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DeliveryMode',
    required:true,
  },
  zone: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Zone',
    required:true,
  },
  status: {
    type: Boolean,
    default: 'true',
   }
});
module.exports = mongoose.model('ZoneDeliveryMode', ZoneDeliveryModeSchema)
