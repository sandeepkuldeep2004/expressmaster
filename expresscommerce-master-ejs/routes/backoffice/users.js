const express = require("express");
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const {sendEmail,getEmailTemplate} = require("../../lib/utils");
// Load User model
const User = require("../../models/User");
const { forwardAuthenticated } = require("../../middleware/auth");
const mailer = require("../../lib/utils");
const { ensureAuth } = require("../../middleware/auth");
const {getBaseSiteListActive} = require("../../services/basesite.js");
const {getAllAcessModuleServices} = require("../../services/UserGroup.js");
const {getAllUserServices,getOneUserService} = require("../../services/users.js");


var leftnavigationlinkactive = "manageusers";

// Register Page
router.get("/register", ensureAuth, async (req, res) => {
  const basesiteList = await getBaseSiteListActive();
  res.render("user/register", {     
    csrfToken: req.csrfToken(),
    leftnavigationlinkactive: leftnavigationlinkactive,
    leftsubnavigationlinkactive:"addnewuser",
    basesiteList:basesiteList,
    })
});

// Register
router.post("/register",ensureAuth,[
  // username must be an email
  body('name').notEmpty(),
    // email
  body('email').isEmail().normalizeEmail(),
  // password must be at least 5 chars long
  body('password').isLength({ min: 5 }),  
  
], async (req, res) => {
  const basesiteList = await getBaseSiteListActive();

  const { name, email, password, password2,basesite, usergroup} = req.body;
  console.log(name + email + password + password2 +  basesite + usergroup);
  var issuperadmin=false;
    if(req.body.issuperadmin && req.body.issuperadmin=="on"){
      issuperadmin=true;

    }
   
  // Finds the validation errors in this request and wraps them in an object with handy functions
   const result = validationResult(req);
   console.log(result);
  let errors = [];
 
  if (result.errors.length > 0) {
    res.render("user/register", {
      errors,
      name,
      email,
      password,
      password2,
      issuperadmin, basesite, usergroup,
      csrfToken: req.csrfToken(),
      leftnavigationlinkactive: leftnavigationlinkactive,
      basesiteList:basesiteList,
      leftsubnavigationlinkactive:"addnewuser",

    });
  } else {
    const accessmoules = await getAllAcessModuleServices(usergroup);
    User.findOne({ email: email }).then((user) => {
      if (user) {
        //errors.push({ msg: "Email already exists" });
        res.render("user/register", {
          errors,
          name,
          email,
          password,
          password2,
          issuperadmin, basesite, usergroup,
          leftnavigationlinkactive: leftnavigationlinkactive,
          basesiteList:basesiteList,
          leftsubnavigationlinkactive:"addnewuser",

        });
      } else {

        const newUser = new User({
          name,
          email,
          password,
          issuperadmin, basesite, usergroup,accessmoules
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            //if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                var mailOptions = {
                  from: 'kumardh@deloitte.com',
                  to: email,
                  subject: 'Congratuation you have registred successfully',
                  template: 'registration_email_template',
                  context: {
                    name: newUser.name,
                    email:newUser.email
                  },
                  //html: fetchEmailTemplate('registration_email_template',user)
                }
                console.log(mailOptions);
                sendEmail(mailOptions);
                req.flash(
                  "success_msg",
                  "You are now registered and can log in"
                );
                res.redirect("/users/login");
              })
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
});
router.get("/viewAll", ensureAuth, async (req, res) => {
  try {
    const usergroupList = await getAllUserServices();
    res.render("user/list", {
      usergroupList,
      csrfToken: req.csrfToken(),
    leftsubnavigationlinkactive:"viewalluser",
    leftnavigationlinkactive:leftnavigationlinkactive,
    });
  } catch (err) {
    console.error(err);
    res.render(_500errorView);
  }
});

router.get("/:id", ensureAuth, async (req, res) => {
  const basesiteList = await getBaseSiteListActive();

  try {
    const userList=await getOneUserService(req.params.id);
    console.log("usergroup"+userList.baseSiteId);
    if (!userList) {
      return res.render(_404View);
    }

    res.render("user/edit", {
      userList:userList,
      basesiteList:basesiteList,
      csrfToken: req.csrfToken(),
      leftsubnavigationlinkactive:"viewalluser",
      leftnavigationlinkactive:leftnavigationlinkactive,
      
    });
  } catch (err) {
    console.error(err);
    return res.render(_500errorView);
  }
});

router.post("/:id", ensureAuth, async (req, res) => {
  try {
    console.log("innnnnnnnnn");
    let  userOneData = await getOneUserService(req.params.id);
    console.log(userOneData);
    if (!userOneData) {
      return res.render(_404View);
    }
    const accessmoulesData = await getAllAcessModuleServices(req.body.usergroup);
    console.log("accessmoules"+userOneData);

    var issuperadmin=false;
    if(req.body.issuperadmin && req.body.issuperadmin=="on"){
      issuperadmin=true;

    }

    usergroup = await User.findOneAndUpdate(
      { email: userOneData.email },
      {
        $set: {
          name: req.body.name,
          accessmoules:accessmoulesData,
          basesite:req.body.basesite,
          usergroup:req.body.usergroup,
          issuperadmin:issuperadmin,
          
        }
      }
    );
    return res.redirect("/user/viewAll?errorMessage=Sucessfully updated.");

  } catch (err) {
    console.error(err);
    return res.render(_500errorView);
  }
});

router.post("/remove/:id", ensureAuth, async (req, res) => {
  try {
    let user = await User.findById({
      _id: req.params.id,
    }).lean();
    if (!user) {
      return res.render(_404View);
    }

    await User.remove({ _id: req.params.id });
    res.redirect("/user/viewAll");
  } catch (err) {
    console.error(err);
    return res.render(_500errorView);
  }
});
module.exports = router;
