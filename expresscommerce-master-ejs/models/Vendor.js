const mongoose = require('mongoose')

const VendorSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required:false,
  },
  status: {
    type: Boolean,
    default: 'true',
   }
});
module.exports = mongoose.model('Vendor', VendorSchema)
