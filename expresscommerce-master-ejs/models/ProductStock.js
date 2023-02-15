const mongoose = require('mongoose')

const ProductStockSchema = new mongoose.Schema({
  productCode: {
    type: String,
    required: true,
  },
  warehouseCode: {
    type: String,
    required:false,
  },
  availableQty: {
    type: Number,
    default:0,
    required:false,
  },
  inStockStatus: {
    type: String,
    default:'notSpecified',
    enum:['notSpecified','forceInStock','outOfStock'],
    required:false,
  },
  maxPreOrder: {
    type: Number,
    default:1,
    required:false,
  },
  maxStockLevelHistoryCount: {
    type: Number,
    default:1,
    required:false,
  },
  overSelling: {
    type: Number,
    default:0,
    required:false,
  },
  preOrder: {
    type: Number,
    default:0,
    required:false,
  },
  reserved: {
    type: Number,
    default:0,
    required:false,
  },
  creationdate: {
    type: Date,
    default: Date.now,
  },
  modificationdate: {
    type: Date,
  },
  catalog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Catalog',
    required:true,
  }
});
module.exports = mongoose.model('ProductStock', ProductStockSchema)
