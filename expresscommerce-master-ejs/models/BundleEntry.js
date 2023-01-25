const mongoose = require('mongoose')

const BundleEntrySchema = new mongoose.Schema({
  productCode: {
    type: String,
    required:true,
  },
  quantity: {
    type: Number,
    required:true,
  },
  basePrice: {
    type: Number,
    required:false,
  },
  unit: {
    type: String,
    required:false,
  },
  totalPrice: {
    type: Number,
    required:false,
  },
  erpEntryId: {
    type: String,
    required:false,
  }
  
});
module.exports = mongoose.model('BundleEntry', BundleEntrySchema)
