const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');

const CustomerActivitySchema = new mongoose.Schema({
  orderRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
  },
  actionRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LoyaltyAction',
    required: true,
  },
  walletId: {
    type: String,
    required: true,
  },
  activityId: {
    type: String,
    required: true,
    unique: true,
  },
  actionType: {
    type: String,
    required: true,
    enum:['POINTS_EARN','POINTS_REDEEM']
  },
  event: {
    type: String,
    required: true,
    enum:['ADD_TO_CARD','PLACE_ORDER','REFER_TO_FRIEND','FRIEND_USE_REFERRAL','NEW_JOINING',"REVIEW_PRODUCT"]
  },
  status: {
    type: String,
    default: 'COMPLETED',
    enum: ['COMPLETED', 'CANCELLED', 'PENDING_CONFIRMATION','APPROVED']
  },
  channel: {
    type: String,
    default: 'WEB',
    enum: ['WEB', 'MOBILE', 'STORE']
  },
  earnPoints: {
    type: Number,
    required: false,
    default: 0
  },
  redeemPoints: {
    type: Number,
    required: false,
    default: 0
  },
  reservedPoints: {
    type: Number,
    required: false,
    default: 0
  },
  openingPoints: {
    type: Number,
    required: false,
    default: 0
  },
  closingPoints: {
    type: Number,
    required: false,
    default: 0
  },
  pointValue: {
    type: Number,
    required: false,
    default: 0
  },
  type: {
    type: String,
    required: false,
    default: 'PURCHASE',
    enum: ['PURCHASE', 'ENROLMENT', 'REFFERED', 'REDEEMED']
  },
  expiredOn: {
    type: Date,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  modificationDate: {
    type: Date,
    default: Date.now,
  },
  customerLatitude: {
    type: String,
    require:false,
  },
  customerLongitude: {
    type: String,
    require:false,
  },
  customerIPAddress: {
    type: String,
    require:false,
  }
});
CustomerActivitySchema.plugin(uniqueValidator);

module.exports = mongoose.model('CustomerActivity', CustomerActivitySchema)
