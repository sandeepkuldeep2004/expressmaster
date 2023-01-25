const mongoose = require('mongoose')

const CartEntrySchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart',
    required:true,
  },
  entryNumber: {
    type: Number,
    required: true,
  },
  productCode: {
    type: String,
    required:true,
  },
  quantity: {
    type: Number,
    required:true,
  },
  basePrice: {
    type: mongoose.Schema.Types.Decimal128,
    required:true,
  },
  unit: {
    type: String,
    required:true,
  },
  taxValues: {
    type: Number,
    required:false,
  },
  discountValue: {
    type: mongoose.Schema.Types.Decimal128,
    required:false,
  },
  totalPrice: {
    type: mongoose.Schema.Types.Decimal128,
    required:true,
  },
  giveAway: {
    type: Boolean,
    default: false,
   },
  deliveryAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
    required:false,
  },
  deliveryPOS: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StoreLocator',
    required:false,
  },
  deliveryMode: {
    type: String,
    required:false,
  },
  expectedDeliveryDate: {
    type: Date,
    required:false,
  },
  deliveryComment: {
    type: String,
    required:false,
  },
  creationdate: {
    type: Date,
    default: Date.now,
  },
  modificationdate: {
    type: Date,
  },
  erpEntryId: {
    type: String,
    required:false,
  }
  
});
module.exports = mongoose.model('CartEntry', CartEntrySchema)
