const mongoose = require('mongoose')

const CampaignSchema = new mongoose.Schema({
  code: { /** This code should be generated or uploaded by marketing team**/
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: false,
  },
  emailTemplate: {
    type: String,
    required:true,
  },
  targetAudiance:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Prospect"
  }],
  startDate:{
    type: Date,
  },
  expiryDate:{
    type: Date,
  },
  cronExpression: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
});
module.exports = mongoose.model('Campaign', CampaignSchema)
