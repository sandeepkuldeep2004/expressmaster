const mongoose = require('mongoose')

const WarehouseSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required:false,
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
    required:false,
  },
  status: {
    type: String,
    default: 'active',
    enum: ['active', 'inactive'],
  }
});
module.exports = mongoose.model('Warehouse', WarehouseSchema)
