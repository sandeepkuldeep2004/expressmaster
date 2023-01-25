const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');

const LoyaltyActionSchema = new mongoose.Schema({
  actionId: {
    type: String,
    required: true,
    unique: true,
  },
  actionName: {
    type: String,
    required: true,
  },
  externalUrl: {
    type: String,
    required: false,
  },
  urlText: {
    type: String,
    required: false,
  },
  iconUrl: {
    type: String,
    required: true,
  },
  minOrderAmount: {
    type: Number,
    required: true,
    default: 0
  },
  amountShown: {
    type: Number,
    required: true,
    default: 0
  },
  validity: {
    type: Number,
    required: true,
    default: 14 //Days
  },
  activation: {
    type: Boolean,
    default: true,
  },
  memberMessage: {
    type: String,
    require: true,
  },
  nonMemberMessage: {
    type: String,
    require: true,
  },
  ctaText: { //Call to action
    type: String,
    required: false,
  },
  ctaUrl: { //Call to action
    type: String,
    required: false,
  },
  type: {
    type: String,
    default: 'Purchases',
    enum: ['Purchases', 'Promotions', 'Engagement', 'Events', 'Referral', 'JoinLoyalty']
  },
  benefit: {
    type: String,
    default: 'EARN',
    enum: ['EARN', 'REDEEM']
  },
  rewards: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LoyaltyActionReward',
    required: true,
  }],
  creationDate: {
    type: Date,
    default: Date.now,
  },
  modificationDate: {
    type: Date,
    default: Date.now,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
  },
});
LoyaltyActionSchema.plugin(uniqueValidator);

module.exports = mongoose.model('LoyaltyAction', LoyaltyActionSchema)
