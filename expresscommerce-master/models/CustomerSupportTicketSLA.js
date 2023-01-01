const mongoose = require('mongoose')

const CustomerSupportTicketSchema = new mongoose.Schema({
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
    type: Number,  /*store value in minutes*/
    required:true,
  },
  fromDate: {
    type: Date,
    default: Date.now,
  },
  toDate: {
    type: Date,
  }
});
module.exports = mongoose.model('CustomerSupportTicket', CustomerSupportTicketSchema)
