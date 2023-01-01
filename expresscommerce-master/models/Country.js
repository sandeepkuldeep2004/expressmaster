const mongoose = require('mongoose')

const CountrySchema = new mongoose.Schema({
  isocode: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required:false,
  },
  active: {
    type: Boolean,
    required:false,
  }
});
module.exports = mongoose.model('Country', CountrySchema)
