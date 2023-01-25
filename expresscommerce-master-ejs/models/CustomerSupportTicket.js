const mongoose = require('mongoose')

const CustomerSupportTicketSchema = new mongoose.Schema({
  headline: {
    type: String,
    required: true,
  },
  errorCode: {
    type: String, /*predefined error code*/
    required: true,
  },
  ticketResolutionSkillRequired: {
    type: String,
    required:false,
  },
  productSerialNum: {
    type: String,         /*machine serial number*/
    required: false,
  },
  productSKU: {
    type: String, /*product code*/
    required: true,
  },
  ticketType: {
    type: String, /*Installation,Maintenance,Emergency Breakup*/
    required: true,
  },
  description: {
    type: String,
    required:false,
  },
  purchaseDate: {
    type: Date,
    required:true,
  },
  expectedClosureDate: {
    type: Date,
    required:false,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required:false,
  },
  b2bcustomer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'B2BCustomer',
    required:false,
  },
  priority: {
    type: String,
    default: 'P4',
    enum: ['P1','P2','P3','P4'],
  },
  basesite: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BaseSite',
    required:false,
  },
  resolution: {
    type: String,
    required:false,
  },
  status: {
    type: String,
    default: 'new',
    enum: ['new','open','pending','close'],
  },
  creationdate: {
    type: Date,
    default: Date.now,
  },
  modificationdate: {
    type: Date,
  },
  crmTicketId: {
    type: String,
    required:false,
  }
});
module.exports = mongoose.model('CustomerSupportTicket', CustomerSupportTicketSchema)
