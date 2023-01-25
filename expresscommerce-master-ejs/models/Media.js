const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

const MediaSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique:true,
    dropDups: true
  },
  name: {
    type: String,
    required: false,
  },
  priority: {
    type: Number,
    required: false,
    default:1
  },
  thumbnail: {
    type: String,
    required: false,
  },
  main: {
    type: String,
    required: true,
  },
  type:{
    type:String,
    required: true,
    default:"image",
    enum:["image","video","text","application"],
  },
  mimeType:{
    type:String,
    required: false,
  },
  catalog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Catalog",
    required: true,
  },
});
MediaSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Media', MediaSchema);
