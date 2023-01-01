const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');

const BenefitSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  benefitId:{
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
    default: 'Custom benefit',
    enum: ['One-time voucher', 'Yearly voucher', 'Event reward','Exclusive access','Custom benefit']
  },
  iconUrl: {
    type: String,
    required: true,
  },
  potentialEarnPoints: {
    type: Number,
    required: true,
    default: 0
  },
  spend: {
    type: Number,
    required: true,
    default: 0
  },
  tiers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tier"
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
  }
});
BenefitSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Benefit', BenefitSchema)
