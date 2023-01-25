const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
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
module.exports = mongoose.model('Contact', ContactSchema)
