const CustomerSupportTicketSlaModel = require('../models/CustomerSupportTicketSLA');


// @desc fetch CustomerTicketSla by ticket type.
//@param {active}
const getCustomerSupportTicketSlaByTicketType = async function (ticketType) {  
  return CustomerSupportTicketSlaModel.findOne({ ticketType: ticketType }).lean();
}

// @desc fetch TicketPriority by ticket type.
//@param {active}
const getTicketPriorityByTicketType = async function (ticketType) {
  return CustomerSupportTicketSlaModel.findOne({ ticketType: ticketType }).lean();
}


// @desc fetch SLATime by priority.
//@param {active}
const getSLATimeByPriority = async function (priority) {
    return CustomerSupportTicketSlaModel.findOne({ priority: priority }).lean();
  }

module.exports = 
{ getCustomerSupportTicketSlaByTicketType, getTicketPriorityByTicketType, getSLATimeByPriority }