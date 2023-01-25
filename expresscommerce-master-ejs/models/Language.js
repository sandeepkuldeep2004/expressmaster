const mongoose = require('mongoose')

const LanguageSchema = new mongoose.Schema({
  isocode: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  fallbacklanguage: {
    type: String,
    required:false,
  },
  status: {
    type: String,
    default: 'active',
    enum: ['active', 'inactive'],
  }
});
module.exports = mongoose.model('Language', LanguageSchema)
