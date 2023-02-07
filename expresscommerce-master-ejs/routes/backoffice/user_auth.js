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
const {getAllAcessModuleServices} = require("../../services/UserGroup.js");

var leftnavigationlinkactive = "createnewuser";
// Login Page
router.get("/login",forwardAuthenticated, (req, res) =>
  res.render("login", { 
    layout: "logintemplate",
    csrfToken: req.csrfToken()
   })
);


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
