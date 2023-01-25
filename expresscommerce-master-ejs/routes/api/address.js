const express = require("express");
const router = express.Router();
const mongoose = require('mongoose')
const { body, validationResult } = require('express-validator');

const { ensureCustomerAuth, checkBaseSite } = require("../../middleware/auth");
const { getCurrentBaseSiteByOAuthCode, getBaseSiteByCode } = require("../../lib/basesite");
const { getAddressesForCustomer, getAddressForCustomerByID, getAddressByUid, getAddressById, getCustomerById, getCustomerByUid } = require("../../lib/customer");

const { getRegionByIsoCode } = require("../../lib/region");
const { getCountryByIsocode } = require("../../lib/country");
const { generateNumber } = require("../../lib/numberseries");
const { getOrderByAddressId } = require('../../lib/orderHistory')
//const {generatePassword} = require('../../lib/utils')
const CustomerModel = require("../../models/Customer");
const AddressModel = require("../../models/Address");
const connectDB = require('../../config/db')

// @desc  Get customer's addresses
// @route   GET /{baseSiteId}/users/{userId}/addresses
router.get("/:baseSiteId/users/:userId/addresses", ensureCustomerAuth, async (req, res) => {
  try {

    const userId = req.params.userId;
    const baseSiteId = req.params.baseSiteId;
    if (baseSiteId && userId) {
      const customer = await getCustomerByUid(userId);
      const addresses = await getAddressesForCustomer(customer._id);
      console.log("Total addresses:::", addresses.length)
      res.status(200).json({
        TotalAddresses: addresses.length,
        CustomerAddresses: addresses
      });
    } else {
      return res.status(401).json("No Address found for customer");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err,
    });
  }
});

// @desc update the Address
// @route  put/{baseSiteId}/users/{userId}/addresses/{addressId}
router.put("/:baseSiteId/users/:userId/addresses/:addressId", ensureCustomerAuth,
  body('streetno').notEmpty().withMessage("Address Line1/Street no cannot be empty!!!"),
  body('streetname').notEmpty().withMessage("Street name cannot be empty!!!"),
  body('appartment').notEmpty().withMessage("Appartment cannot be empty!!!"),
  body('building').notEmpty().withMessage("Address Line2/Building cannot be empty!!!"),
  body('phone1').notEmpty().withMessage("Phone number cannot be empty!!!"),
  body('city').notEmpty().withMessage("Town/City cannot be empty!!!"),
  body('postalCode').notEmpty().withMessage("PostalCode cannot be empty!!!"),
  async (req, res) => {

    // Validate incoming input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    try {
      const addressId = req.params.addressId;
      const userId = req.params.userId;
      const baseSiteId = req.params.baseSiteId;
      const address = await getAddressById(addressId);
      //console.log("address ", address)
      address.streetno = req.body.streetno;
      address.streetname = req.body.streetname;
      address.appartment = req.body.appartment;
      address.building = req.body.building;
      address.phone1 = req.body.phone1;
      address.city = req.body.city;
      address.postalCode = req.body.postalCode;
      AddressModel.findOneAndUpdate({ "_id": addressId }, address, (err, obj) => {
        if (err) {
          res.status(404).json({
            error: err
          })
        } else {
          res.status(201).json(address);
        }
      })
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: err,
      });
    }
  });


// @desc fetch the Address
// @route  occ/v2/{baseSiteId}/users/{userId}/addresses/{addressId}
router.get("/:baseSiteId/users/:userId/addresses/:addressId", ensureCustomerAuth, checkBaseSite,
  async (req, res) => {

    try {
      const addressId = req.params.addressId;
      const userId = req.params.userId;
      const address = await getAddressById(addressId);
      console.log(address)
      if (null == address) {
        return res.status(404).json({
          error: 'Given address ID is not present in system.'
        })
      }
      const customer = await getCustomerByUid(userId);
      const existAddress = await getAddressForCustomerByID(addressId, customer);
      if (existAddress) {
        return res.status(200).json(
          existAddress
        );
      } else {
        return res.status(404).json({
          error: 'Given address ID is not belong to current customer. Failed to fetch address details.'
        })
      }

    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: err,
      });
    }
  });



// @desc remove the Address
// @route  occ/v2/{baseSiteId}/users/{userId}/addresses/{addressId}
router.delete("/:baseSiteId/users/:userId/addresses/:addressId", ensureCustomerAuth, checkBaseSite,
  async (req, res) => {

    try {
      const addressId = req.params.addressId;
      const userId = req.params.userId;
      const address = await getAddressById(addressId);
      console.log(address)
      if (null == address) {
        return res.status(404).json({
          error: 'Given address ID is not present in system or already deleted hence failed to delete address'
        })
      }
      const customer = await getCustomerByUid(userId);

      const existOrders = await getOrderByAddressId(address);
      console.log("existOrders with address :", existOrders)
      if (existOrders && existOrders.length > 0) {

        AddressModel.findByIdAndUpdate(addressId, { owner: null }, (err, obj) => {
          if (err) {
            return res.status(404).json({
              error: err
            })
          } else {
            return res.status(200).json(
              { message: ' Customer delinked from Address succssfully' });
          }
        })
        return;
      }
      const existAddress = await getAddressForCustomerByID(addressId, customer);
      if (existAddress) {

        AddressModel.findByIdAndDelete(addressId, (err, obj) => {
          if (err) {
            return res.status(404).json({
              error: err
            })
          } else {
            return res.status(200).json(
              { message: 'Customer address deleted succssfully' });
          }
        })
      } else {
        return res.status(404).json({
          error: 'Given address ID is not associated with current customer. Failed to delete address'
        })
      }

    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: err,
      });
    }
  });

// @desc create address for customer
// @route   POST /{baseSiteId}/users/{userId}/addresses
router.post("/:baseSiteId/users/:userId/addresses", ensureCustomerAuth,
  body('email').isEmail().normalizeEmail().withMessage("Please entered correct email id !!!"),
  body('streetno').notEmpty().withMessage("Address Line1/Street no cannot be empty!!!"),
  body('streetname').notEmpty().withMessage("Street name cannot be empty!!!"),
  body('appartment').notEmpty().withMessage("Appartment cannot be empty!!!"),
  body('building').notEmpty().withMessage("Address Line2/Building cannot be empty!!!"),
  body('phone1').notEmpty().withMessage("Phone number cannot be empty!!!"),
  body('city').notEmpty().withMessage("Town/City cannot be empty!!!"),
  body('postalCode').notEmpty().withMessage("PostalCode cannot be empty!!!"),
  async (req, res) => {

    // Validate incoming input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const userId = req.params.userId;
    const baseSiteId = req.params.baseSiteId;
    const country = await getCountryByIsocode(req.body.countryIsoCode);
    const region = await getRegionByIsoCode(req.body.regionIsoCode);
    const customer = await getCustomerByUid(userId);
    //Get Generated Address Id
    const addressId = await generateNumber('address');

    //for starting a new transaction
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      console.log('start all operations ::');
      if (customer) {
        const address = new AddressModel({
          uid: addressId,
          firstname: req.body.firstName,
          lastname: req.body.lastName,
          email: req.body.email,
          fax: req.body.fax,
          dateOfBirth: req.body.dateOfBirth,
          gender: req.body.gender,
          pobox: req.body.pobox,
          cellphone: req.body.cellphone,
          phone1: req.body.phone1,
          phone2: req.body.phone2,
          appartment: req.body.appartment,
          building: req.body.building,
          streetno: req.body.streetno,
          streetname: req.body.streetname,
          city: req.body.city,
          postalCode: req.body.postalCode,
          region: region,
          country: country,
          owner: customer,
        });

        address.save(function (err) {
          if (err) {
            res.status(500).json({
              error: err,
            });
          } else {
            customer.defaultShipmentAddress = address;
            customer.defaultPaymentAddress = address;
            CustomerModel.findOneAndUpdate({ "uid": userId }, customer, (err, customer) => {
              if (err) {
                res.status(404).json({
                  error: err,
                });
              } else {
                res.status(200).json(address);
              }

            });
          }
        })
      } else {
        res.status(500).json({
          error: "Error occurred while creating address Payload !!!"
        });

      }
      await session.commitTransaction();
      console.log('success : committing all operations');

    } catch (error) {
      console.log('error : rollback the operations');
      //for rollback the operations
      await session.abortTransaction();
      return res.status(404).json({
        error: error
      })
    }
    finally {
      session.endSession(); // End transaction
    }

  })

module.exports = router;