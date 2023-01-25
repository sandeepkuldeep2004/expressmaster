var generator = require('generate-password');
var {sendEmail,sendEmail1,getEmailTemplate} = require('./utils');

function generatePassword(){
    var password = generator.generate({
        length: 8,
        numbers: true,
        symbols: true,
        lowercase:true,
        uppercase:true
    });
console.log(password);        
return password;
}


module.exports={
  
 forgotPasswordEmailHandler: async (email)=>{
     
    var mailOptions = {
        from: 'shivrajchoudhary25@gmail.com',
        to: email,
        subject: 'forgot One time passord email',
        text: "Hello world?", // plain text body
        template: 'forgot_password_email_template',
        context: {
            email:email,
            password:generatePassword()
        },
       // html:"<h1>Hi User,Your Forget password request received for Email: {{email}} and newly Temp generated password is: {{password}} , Please visit our site to reset password</h1>"
        html: getEmailTemplate('forgot_password_email_template',email)
      }      
      //call via Fake ethereal server
      var responseUrl =  sendEmail(mailOptions)
      //Call Via Gmail
      //var responseUrl = await sendEmail1(mailOptions)
       console.log("Response captured:",responseUrl)
     
return responseUrl;
 }
}