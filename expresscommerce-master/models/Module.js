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
  url: {
    type: String,
    required:false,
  },
  cssclassname: {
    type: String,
    required:false,
  },
  position: {
    type: Number,
    required:false,
  },
  active: {
    type: Boolean,
    default:true,
    required:false,
  }
});
module.exports = mongoose.model('Module', ModuleSchema)
