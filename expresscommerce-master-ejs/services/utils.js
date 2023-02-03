const mailer =require('nodemailer');
const hbs=require('nodemailer-express-handlebars')
const handlebars=require('express-handlebars')
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const xoauth2=require("xoauth2");

/**
 * var mailOptions = {
  from: 'youremail@gmail.com',
  to: 'myfriend@yahoo.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};
 * 
 **/
viewEngine = handlebars.create({
  partialsDir: 'partials/',
  defaultLayout: false
});

sut = hbs({
    viewEngine: viewEngine,
    viewPath: path.resolve(__dirname, '../views')
});
//transport.use('compile', sut);

module.exports={
    sendEmail: async (mailOptions)=>{
try {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await mailer.createTestAccount();
  console.log("Test account***:",testAccount);
    
  let transport = mailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });
  
        console.log("Email is getting triggered", mailOptions);
        let info = await transport.sendMail(mailOptions);
       console.log("Email Send Response:: ",info);
var responseUrl=mailer.getTestMessageUrl(info)
         // Preview only available when sending through an Ethereal account
          console.log("!!!!!!!!Preview URL: %s", responseUrl);
          // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
return responseUrl;

} catch (error) {
 console.error('There is some error occured while sending mails',error) 
}
    },
    
// this method is used to send mail via Gmail integration.
 sendEmail1: async (mailOptions)=> {

    // thats the key part, without all these it didn't work for me
    let transporter = mailer.createTransport({
      service: 'gmail',
      auth: {
        xoauth2: xoauth2.createXOAuth2Generator({
          user:'shivrajchoudhary25@gmail.com',
          clientId:'216891608475-fpq1k351s9rptn704khsalvbegv5j145.apps.googleusercontent.com',
          clientSecret:'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',
          refreshToken:'1//04ephgYLVv669CgYIARAAGAQSNwF-L9IreXdxoLVzACr8C_LEEqsKD71hKYgS2dZTP5tw5wszn6J_qQiZ7Nu8RjYBMjOTlPyHnWc'
        })
      }
    });
  
  console.log("mail options in sendMail1():",mailOptions);

  console.log("Trandporter details",transporter)
  // send mail with defined transport object
  let info =  await transporter.sendMail(mailOptions,(err,info)=>{
    if(err){
console.error(err);
    }else{
      console.info(info);
    }
  });
 },
     getEmailTemplate : (templateName,result) => {
      //const config = getConfig();
  
      //const template = fs.readFileSync(path.join(__dirname, '../public/email_template.html'), 'utf8');
      const template = fs.readFileSync(path.join(__dirname, '../public/'+ templateName+'.html'), 'utf8');
      $ = cheerio.load(template);
      //$('#brand').text(config.cartTitle);
      /*$('#paymentResult').text(result.message);
      if(result.paymentApproved === true){
          $('#paymentResult').addClass('text-success');
      }else{
          $('#paymentResult').addClass('text-danger');
      }*/
      //$('#paymentMessage').text('Thanks for shopping with us. We hope you will shop with us again soon.');
      //$('#paymentDetails').html(result.paymentDetails);
      return $.html();
  },
 

}