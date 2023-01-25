const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');

const TierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  tierType: {
    type: String,
    required: true,
    default: 'Points Based',
    enum: ['Points Based', 'Invitation Only', 'Spend Based']
  },
  iconUrl: {
    type: String,
    required: true,
  },
  requiredPoints: {
    type: Number,
    required: true,
    default: 0
  },
  requiredPurchase: {
    type: Number,
    required: true,
    default: 0
  },
  requiredSpend: {
    type: Number,
    required: true,
    default: 0
  },
  expiration: {
    type: Number,
    required: true,
    default: 0
  },
  benefits: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Benefit"
  }],
  creationDate: {
    type: Date,
    default: Date.now,
  },
  modificationDate: {
    type: Date,
    default: Date.now,
  },
  active: {
    type: Boolean,
    required: true,
    default: true
  },
  calculation: {
    type: Boolean,
    required: true,
    default: true
  },
});
TierSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Tier', TierSchema)
