const mongoose = require('mongoose')

const ModuleSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required:true,
  },
  cssclassname: {
    type: String,
    required:true,
  },
  position: {
    type: Number,
    required:true,
  },
  active: {
    type: Boolean,
    default:true,
    required:false,
  }
});
module.exports = mongoose.model('Module', CompanySchema)
