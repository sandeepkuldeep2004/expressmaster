const mongoose = require('mongoose')

const ProspectSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required:false,
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
    required: false,
  },
  active: {
    type: Boolean,
    default:true,
    required:false,
  }
});
module.exports = mongoose.model('Prospect', ProspectSchema)
