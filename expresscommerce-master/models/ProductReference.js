const mongoose = require("mongoose");

const ProductReferenceSchema = new mongoose.Schema({
  sourceProduct:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  targetProduct:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  }, 
  referenceType: {
    type: String,
    default: "SIMILAR",
    enum: ["SIMILAR", "CROSSSELL","UPSALE","CONSISTS_OF","SERVICE","ACCESSORIES","MANDATORY","SPAREPART","OTHERS","DIFF_ORDERUNIT","FOLLOWUP","SELECT"],
  },
  quantity:{
    type:Number,
    default :1,
  },
  catalog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Catalog",
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  creationdate: {
    type: Date,
    default: Date.now,
  },
  modificationdate: {
    type: Date,
  },
});
module.exports = mongoose.model("ProductReference",ProductReferenceSchema);
