const CustomerSupportTicketSlaModel = require("../models/CustomerSupportTicketSLA");
const {getCustomerSupportTicketSlaByTicketType} = require("../lib/customerSupportTicketSla");

module.exports = {
  saveCustomerSupportTicketSla: async (data) => {
    Object.entries(data).forEach(async (element) => {
      const customerTicketSla = await getCustomerSupportTicketSlaByTicketType(element[1].ticketType);
      console.log("customerticketsla", customerTicketSla)
      if (customerTicketSla) {
        console.log(
          "CustomerTicketSla with same ticketType " + element[1].ticketType + " already exists"
        );
      } else {
        console.log("enetered_else")
        const customerSupportTicketSlaModel = new CustomerSupportTicketSlaModel({
          ticketType: element[1].ticketType,
          priority: element[1].priority,
          SLATime: element[1].SLATime,
          fromDate: element[1].fromDate,
          toDate: element[1].toDate,
          baseSite: element[1].baseSite
        });
        customerSupportTicketSlaModel.save(function (err) {
          if (err) {
            console.log(err);
          }
        });
      }
    });
  },
};
