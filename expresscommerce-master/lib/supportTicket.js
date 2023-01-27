const CustomerSupportTicketModel = require('../models/CustomerSupportTicket')
const { getSLATimeByPriority } = require("./customerSupportTicketSla")
const { getCustomerByEmail } = require("./customer")

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
  const data = await getSLATimeByPriority(customerSupportTicket.priority);

  var datetime = new Date();

  console.log("Before",datetime)

  datetime.setHours(datetime.getHours() + data.SLATime);

  console.log("After",datetime)
  
  customerSupportTicket.expectedClosureDate=datetime;

  customerSupportTicket.save(function (err) {
      if (err) {
        return res.status(500).json({
          error: err,
        });
      } 
     });
   return;   
}


const getTicketsByCustomer = async function( customer ){

  return CustomerSupportTicketModel.find({ customer:customer }).lean()
}

module.exports={
  ticketCreationEventHandler, getTicketsByCustomer
}