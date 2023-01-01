const mongoose = require('mongoose')

const ConsignmentSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart',
    required:true,
  },
  consignmentEntries:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CartEntry"
    }
  ],
  paymentTransaction:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "PaymentTransaction"
    },
  totalTaxValue: {
    type: number,
    required:false,
  },
  totalDiscountValue: {
    type: number,
    required:false,
  },
  deliveryCost: {
    type: number,
    required:true,
  },
  currencyCode: {
    type: String,
    required:true,
  },
  totalPrice: {
    type: number,
    required:true,
  },
  isCalculated: {
    type: Boolean,
    default:false,
  },
  deliveryAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
    required:false,
  },
  paymentAddress: {
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
  referenceOrder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required:false,
  },
  erpConsignmentId: {
    type: String,
    required:false,
  }
  
});
module.exports = mongoose.model('Consignment', ConsignmentSchema)
