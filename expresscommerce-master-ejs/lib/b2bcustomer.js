const B2BCustomerModel = require('../models/B2BCustomer')
const{sendEmail}= require('../lib/utils')
// @desc    fetch Currency by isocode
//@param {active}
const getB2BCustomerByEmail = async function(email){ 
  return  B2BCustomerModel.findOne({email:email}).lean();
}

// @desc   customer Registration Event Handler
//@param {b2bCustomer}
const customerRegistrationEventHandler = async function(b2bCustomer){ 

  console.log("b2bcustomer registration event got fired");
  await sendEmailAction(b2bCustomer);
  await approveB2BCustomerRegistrationAction(b2bCustomer)
  
}

async function sendEmailAction(b2bCustomer){
  console.log("Step 1:send registration email to B2B customer");
   //const emailBody= getEmailTemplate('b2bCustomerRegistration',b2bCustomer);
   var mailOptions = {
    from: 'sandeepkuldeep2004@gmail.com',
    to: b2bCustomer.email,
    subject: 'B2B Customer Registration',
    template: 'b2b_registration_email_template',
    context: {
      name: b2bCustomer.name,
      language:b2bCustomer.sessionLanguage,
      currency:b2bCustomer.sessionCurrency,
      defaultB2BUnit:b2bCustomer.defaultB2BUnit,
      baseSite:b2bCustomer.baseSite,
      email:b2bCustomer.email
    },
  }
  sendEmail(mailOptions);
}

async function approveB2BCustomerRegistrationAction(b2bCustomer){
  console.log("Step 2:send b2bcustomer registration for approval");
}

module.exports={
  getB2BCustomerByEmail,customerRegistrationEventHandler
}