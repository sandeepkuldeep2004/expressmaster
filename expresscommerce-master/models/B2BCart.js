const mongoose = require('mongoose')

const B2BCartSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'B2BCustomer',    
    required:true,
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
  defaultB2BUnit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'B2BUnit',
    required:false,
  },
  name: {
    type: String,
    required:false,
  },
  sessionId: {
    type: String,
    required:false,
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
  cartEntries:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CartEntry"
    }
  ],
  paymentTransactions:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PaymentTransactionEntry"
    }
  ],
  consignments:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Consignment"
    }
  ],
  totalTaxValue: {
    type: Number,
    default:0,
    required:false,
  },
  totalDiscountValue: {
    type: Number,
    default:0,
    required:false,
  },
  deliveryCost: {
    type: Number,
    default:0,
    required:false,
  },
  currency: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Currency",
    required: true,
  },
  totalPrice: {
    type: Number,
    default:0,
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
  referenceQuote: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quote',
    required:false,
  },
  erpOrderId: {
    type: String,
    required:false,
  }
  
});
module.exports = mongoose.model('B2BCart', B2BCartSchema)
