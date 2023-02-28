const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { ensureAuth } = require("../../middleware/auth");
const UserGroupModel = require("../../models/UserGroup");
const {getUserGroupsBybaseSiteService} = require("../../services/UserGroup.js");
const {upload} = require("../../services/commons.js");

var csrf = require('csurf')

//var csrfProtection = csrf({ cookie: true })




router.post("/getselectbox", ensureAuth, async (req, res) => {
  console.log("inasdfasdf"+req.body.basesitereg);
const userGroupBaseSiteList= await getUserGroupsBybaseSiteService(req.body.basesitereg);
console.log("inasdfasdf"+userGroupBaseSiteList);

res.send(userGroupBaseSiteList);
});


router.post("/uploadFile",async (req, res)=> {

  console.log(req.body.mypic);
        
  // Error MiddleWare for multer file upload, so if any
  // error occurs, the image would not be uploaded!
  console.log("innnnnnnnnnn");

  upload(req,res,function(err) {
  
    if(err) {

        // ERROR occurred (here it can be occurred due
        // to uploading image of size greater than
        // 1MB or uploading different file type)
       // res.send(err)
      
    }
    else {

        // SUCCESS, image successfully uploaded
       // res.send("Success, Image uploaded!")
    }
  })

  res.render("datasync/view",{
    csrfToken: req.csrfToken(),
  });
 

  
})

module.exports = router;
