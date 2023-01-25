const mongoose = require('mongoose')

const QuoteSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required:true,
  },
  previousQuoteRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quote',
    required:false,
  },
  baseSite: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BaseSite',
    required:false,
  },
  baseStore: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StoreLocator',
    required:false,
  },
  name: {
    type: String,
    required:false,
  },
  quoteVersion: {
    type: Number,
    required:true,
  },
  purchaseOrderNumber: {
    type: String,
    required:false,
  },
  attachedPdfUri: {
    type: String,
    required:false,
  },
  appliedCouponCodes: {
    type: String,
    required:false,
  },
  paymentType: {
    type: String,
    required:false,
  },
  quoteEntries:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "QuoteEntry"
    }
  ],
  totalTaxValue: {
    type: Number,
    required:false,
  },
  totalDiscountValue: {
    type: Number,
    required:false,
  },
  deliveryCost: {
    type: Number,
    required:true,
  },
  currencyCode: {
    type: String,
    required:true,
  },
  totalPrice: {
    type: Number,
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
  quoteComment: {
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
  referenceQuote: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quote',
    required:false,
  },
  erpOrderId: {
    type: String,
    required:false,
  },
  status: {
    type: String,
    default: 'new',
    enum: ['new','open','pending','close'],
  }
});
module.exports = mongoose.model('Order', OrderSchema)
