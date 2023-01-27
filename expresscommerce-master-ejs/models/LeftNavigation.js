const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');
const LeftNavigationSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  leftMenu: {
    type: String,
    required: false,
    trim: true,
  }
})
module.exports = mongoose.model('LeftNavigation', LeftNavigationSchema)
