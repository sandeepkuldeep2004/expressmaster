const mongoose = require('mongoose')

const RegionSchema = new mongoose.Schema({
  isocode: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required:false,
  },
  country: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country',
    required:false,
  },
  active: {
    type: Boolean,
    required:false,
  }
});
module.exports = mongoose.model('Region', RegionSchema)
