const CustomerSupportTicketModel = require('../models/CustomerSupportTicket')

// @desc   ticket Creation Event Handler
//@param {customerSupportTicket}
const ticketCreationEventHandler = async function(customerSupportTicket){ 
  console.log("customer support Ticket event got fired");
//  console.log(customerSupportTicket);
  await allocateSLAAction(customerSupportTicket);
  await sendEmailAction(customerSupportTicket);
  
}

async function sendEmailAction(customerSupportTicket){
  console.log("Step 1:customer support email Triggered");
}

async function allocateSLAAction(customerSupportTicket){
  console.log("Step 2:customer support SLA applied");
}

module.exports={
  ticketCreationEventHandler
}