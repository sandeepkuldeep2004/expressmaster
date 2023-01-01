const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { body, validationResult } = require('express-validator');

const { ensureTokenAuth, ensureCustomerAuth,checkBaseSite } = require("../../middleware/auth");
const CustomerModel = require("../../models/Customer");
const session = require('express-session');
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

// Login to the customer
// @route   POST /{baseSiteId}/login
router.post("/:baseSiteId/login",checkBaseSite, 
body('email').isEmail().normalizeEmail().withMessage("Please entered correct email id !!!"),
body('password').isStrongPassword({
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1
}).withMessage("Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number !!!")
, async (req, res) => {

  // Validate incoming input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({
          errors: errors.array()
      });
  }

  const email = req.body.email;
  const plainTextPassword = req.body.password;
  try {
    const customer = await CustomerModel.findOne({ email: email });
    if (email && plainTextPassword && customer) {
      // Match password
      bcrypt.compare(plainTextPassword, customer.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
            const token = generateAccessToken(customer.email);
            req.session.token=token;
            req.session.save();
            console.log("New token created :::",token);
            return res.status(200).json({
              Id: customer._id,
              name: customer.name,
              email: customer.email,
              phone: customer.phone,
              creationDate:customer.creationDate,
              accessToken: token
            });
        } else {
          return res.status(404).json({ 
            error: "Invalid user name or password!!!",
          });
        }
      });
    } else {
      res.status(404).json({
        error: "Invalid user name or password ",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err,
    });
  }
});

// Logout the customer
// @route   POST /{baseSiteId}/logout
router.get("/:baseSiteId/logout",checkBaseSite,(req, res,next) => {
  req.logout((err) =>{
    if (err) { return next(err); }
    req.flash("success_msg", "You are logged out");
    req.session.destroy();
    return res.status(200).json("You are logged out successfully!!!");
  });
});

// change password for the customer
// @route   POST /{baseSiteId}/changePassword
router.post("/:baseSiteId/changePassword", ensureCustomerAuth,checkBaseSite, 
body('email').isEmail().normalizeEmail().withMessage("Please entered correct email id !!!"),
body('newpassword').isStrongPassword({
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1
}).withMessage("Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number !!!"),
async (req, res) => {

  // Validate incoming input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({
          errors: errors.array()
      });
  }

  const email = req.body.email;
  const oldPassword = req.body.oldpassword;
  const newPassword = req.body.newpassword;
  const customer = await CustomerModel.findOne({ email: email });
  if (email && oldPassword && newPassword) {

    //Throw Error message if the old password and new password are same.
     if(oldPassword == newPassword) {
      return res.status(404).json({
          error: "Old password and New password are same",
        });
     }

    // Match password
    if (email && oldPassword && customer) {
     bcrypt.compare(oldPassword, customer.password, (err, isMatch) => {
      if (err) throw err;
       if (isMatch) {
        //return res.status(200).json(customer)
         bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newPassword, salt, (err, hash) => {
            console.log("hash value Inside :" + hash);
            customer.password = hash;
            customer.modificationDate = Date.now;
            console.log(" customer.modificationDate  :" +  customer.modificationDate);
            CustomerModel.findOneAndUpdate(
              { email: email },
              customer,
              (err, updatedCustomer) => {
                res.status(200).json("Password has been updated successfully for " + email+ " !!!");
              }
            );
          });
        });
      } else {
        return res.status(404).json({
          error: "Invalid user name or password",
        });
      }
    });
   } else {
    res.status(404).json({
      error: "Invalid user name or password",
    });
   }
  } else {
    res.status(404).json({
      error: "Invalid user name or password",
    });
  }
});

function generateAccessToken(user) {
  //return jwt.sign({user:user}, SECRET_KEY, { expiresIn: "24h"});
  return jwt.sign(user, SECRET_KEY);
}

module.exports = router;
