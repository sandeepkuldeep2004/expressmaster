const mongoose = require('mongoose')

const CustomerSupportTicketSLASchema = new mongoose.Schema({
  ticketType: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    default: 'P4',
    enum: ['P1','P2','P3','P4'],
  },
  SLATime: {
    type: Number,  /*store value in hours*/
    required:true,
  },
  fromDate: {
    type: Date,
    default: Date.now,
  },
  toDate: {
    type: Date,
  },
  baseSite: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BaseSite',
    required: false,
  },

});
module.exports = mongoose.model('CustomerSupportTicketSLA', CustomerSupportTicketSLASchema)
