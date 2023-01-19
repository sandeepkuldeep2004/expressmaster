const mongoose = require('mongoose')

const CompanySchema = new mongoose.Schema({
  isocode: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required:true,
  },
  logo: {
    type: String,
    required:false,
  },
  description: {
    type: String,
    required:true,
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
module.exports = mongoose.model('Company', CompanySchema)
