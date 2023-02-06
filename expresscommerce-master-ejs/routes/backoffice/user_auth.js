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
const {getBaseSiteList,getBaseSiteListActive,getBaseSiteById} = require("../../services/basesite.js");
var leftnavigationlinkactive = "createnewuser";
// Login Page
router.get("/login",forwardAuthenticated, (req, res) =>
  res.render("login", { 
    layout: "logintemplate",
    csrfToken: req.csrfToken()
   })
);
// Register Page
router.get("/register", ensureAuth, async (req, res) => {
  const basesiteList = await getBaseSiteListActive();
  res.render("user/register", {     
    csrfToken: req.csrfToken(),
    leftnavigationlinkactive: leftnavigationlinkactive,
    basesiteList:basesiteList,
    })
});

// Register
router.post("/register",[
  // username must be an email
  body('name').notEmpty(),
    // email
  body('email').isEmail().normalizeEmail(),
  // password must be at least 5 chars long
  body('password').isLength({ min: 5 }),
  body('basesite').notEmpty(),
  body('issuperadmin').notEmpty(),
], (req, res) => {
  
  const { name, email, password, password2 } = req.body;
  console.log(name + email + password + password2);
   
  // Finds the validation errors in this request and wraps them in an object with handy functions
   const result = validationResult(req);
   console.log(result);
  let errors = [];
 /*
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please enter all fields" });
  }

  if (password != password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  if (password.length < 4) {
    errors.push({ msg: "Password must be at least 6 characters" });
  }*/

  if (result.errors.length > 0) {
    res.render("user/register", {
      errors,
      name,
      email,
      password,
      password2,
      csrfToken: req.csrfToken()
    });
  } else {
    User.findOne({ email: email }).then((user) => {
      if (user) {
        //errors.push({ msg: "Email already exists" });
        res.render("user/register", {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        const newUser = new User({
          name,
          email,
          password,
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

// Login
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

// Logout
router.get("/logout", (req, res,next) => {
  //req.logout();
  req.logout((err) =>{
    if (err) { return next(err); }
    req.flash("success_msg", "You are logged out");
    res.redirect('/users/login');
  });
});

module.exports = router;
