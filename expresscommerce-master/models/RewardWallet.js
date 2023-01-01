const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');

const RewardWalletSchema = new mongoose.Schema({
 
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
    unique: true,
  },
  walletId: {
    type: String,
    required: true,
    unique: true,
  },
  tier: {
    type: String,
    default: 'BRONZE',
    enum: ['BRONZE', 'SILVER', 'GOLD']
  },
  walletStatus: {
    type: String,
    default: 'ACTIVE',
    enum: ['ACTIVE', 'DEACTIVE', 'TERMINATED']
  },
  preferredChannel: {
    type: String,
    default: 'WEB',
    enum: ['MOBILE', 'WEB', 'STORE']
  },
  productAffinity: [{
    type: String,
  }],
  lifecycleStatus: [{
    type: String,
  }],
  avgOrderValue: {
    type: Number,
    required: true,
    default: 0
  },
  earned: {
    type: Number,
    required: true,
    default: 0
  },
  availablePoints: {
    type: Number,
    required: true,
    default: 0
  },
  redeemed: {
    type: Number,
    required: true,
    default: 0
  },
  promised: {
    type: Number,
    required: true,
    default: 0
  },
  expired: {
    type: Number,
    required: true,
    default: 0
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  modificationDate: {
    type: Date,
    default: Date.now,
  },
  optIn: {
    type: Boolean,
    default: true,
  },
  optInDate: {
    type: Date,
    default: Date.now,
  },
  optOutDate: {
    type: Date,
  },
});
RewardWalletSchema.plugin(uniqueValidator);

module.exports = mongoose.model('RewardWallet', RewardWalletSchema)
