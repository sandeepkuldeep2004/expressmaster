const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');

const LoyaltyActionRewardSchema = new mongoose.Schema({
  actionId: {
    type: String,
    required: true,
  },
  actionRewardId: {
    type: String,
    required: true,
    unique: true,
  },
  customerTier: {
    type: String,
    default: 'BRONZE',
    enum: ['BRONZE', 'SILVER', 'GOLD','JOIN_REWARD']
  },
  multiplePoints: {
    type: Number,
    required: false,
  },
  bonusPoints: {
    type: Number,
    required: false,
  },
  vouchers: {
    type: String,
    required: false,
  },
  exclusiveAccess: {
    type: String,
    required: false,
  },
  statusUpgrade: {
    type: String,
    required: false,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
});
LoyaltyActionRewardSchema.plugin(uniqueValidator);

module.exports = mongoose.model('LoyaltyActionReward', LoyaltyActionRewardSchema)
