const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

const BrandSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  logo: {
    type: String,
    required: true,
    
  },
  bannerImage:[{type:String}]
});
BrandSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Brand", BrandSchema);
