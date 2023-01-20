const mongoose = require('mongoose')

const SubModuleSchema = new mongoose.Schema({
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
  landingUrl: {
    type: String,
    required:true,
  },
  position: {
    type: Number,
    required:true,
  },
  module: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Module",
    required: false,
  },
  active: {
    type: Boolean,
    default:true,
    required:false,
  }
});
module.exports = mongoose.model('Submodule', SubModuleSchema)
