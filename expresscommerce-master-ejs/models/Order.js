const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');
const OrderSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  baseSite: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BaseSite',
    required: false,
  },
  baseStore: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StoreLocator',
    required: false,
  },
  name: {
    type: String,
    required: false,
  },
  sessionId: {
    type: String,
    required: false,
  },
  id: {
    type: String,
    required: false,
  },
  MediaKeySession: {
    type: String,
    required: false,
  },
  purchaseOrderNumber: {
    type: String,
    required: false,
  },
  attachedPdfUri: {
    type: String,
    required: false,
  },
  appliedCouponCodes: {
    type: String,
    required: false,
  },
  paymentType: {
    type: String,
    required: false,
  },
  orderEntries: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderEntry"
    }
  ],
  paymentTransaction:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PaymentTransaction"
  },
  consignments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Consignment"
    }
  ],
  totalTaxValue: {
    type: mongoose.Schema.Types.Decimal128,
    required: false,
  },
  totalDiscountValue: {
    type: mongoose.Schema.Types.Decimal128,
    required: false,
  },
  deliveryCost: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  currency: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Currency",
    required: true,
  },
  totalPrice: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  isCalculated: {
    type: Boolean,
    default: false,
  },
  deliveryAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
    required: false,
  },
  paymentAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
    required: false,
  },
  deliveryPOS: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StoreLocator',
    required: false,
  },
  deliveryMode: {
    type: String,
    required: false,
  },
  expectedDeliveryDate: {
    type: Date,
    required: false,
  },
  deliveryComment: {
    type: String,
    required: false,
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
    required: false,
  },
  erpOrderId: {
    type: String,
    required: false,
  },
  omsOrderId: {
    type: String,
    required: false,
  },
  omsShipmentId: {
    type: String,
    required: false,
  },
  courierCompanyId: {
    type: String,
    required: false,
  },
  courierName: {
    type: String,
    required: false,
  },
  awbCode: {
    type: String,
    required: false,
  },
  omsStatus: {
    type: String,
    required: false,
  },

});
OrderSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Order', OrderSchema)
