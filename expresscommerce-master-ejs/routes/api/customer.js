const express = require("express");
const mongoose = require('mongoose')
const bcrypt = require("bcryptjs");
const router = express.Router();
const { body, validationResult } = require('express-validator');

const { ensureTokenAuth, ensureCustomerAuth } = require("../../middleware/auth");
const { getCurrentBaseSiteByOAuthCode, getBaseSiteByCode } = require("../../lib/basesite");
const { getLanguageByIsoCode } = require("../../lib/language");
const { getCurrencyByIsoCode } = require("../../lib/currency");
const { getCustomerByEmail, getCustomers, getAddresses, getAddressesForCustomer, getAddressById, getCustomerById, getCustomerByUid } = require("../../lib/customer");

const { getRegionByIsoCode } = require("../../lib/region");
const { getCountryByIsocode } = require("../../lib/country");
const { getCartById } = require("../../lib/cart");
const { ticketCreationEventHandler } = require("../../lib/supportTicket")
const { getVoucherByCode } = require("../../lib/voucher");
const { forgotPasswordEmailHandler } = require("../../lib/passwordUtil");
const { getUserGroup } = require('../../lib/usergroup');
//const {generatePassword} = require('../../lib/utils')
const CustomerModel = require("../../models/Customer");
const AddressModel = require("../../models/Address");
const CartModel = require("../../models/Cart");
const CartEntryModel = require("../../models/CartEntry");
const CustomerSupportTicketModel = require("../../models/CustomerSupportTicket");
const VoucherModel = require('../../models/Voucher');

// @desc create a customer
// @route   POST /customers
router.post("/:baseSiteId/registration",
  body('name').notEmpty().withMessage("Please provide customer name !!!"),
  body('email').isEmail().normalizeEmail().withMessage("Please entered correct email id !!!"),
  // body('phone').notEmpty().withMessage("Phone number cannot be empty!!!"),
  // body('phone').isMobilePhone().withMessage("Phone number should be numeric value only!!!"),
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

    console.log(req.body);
    const baseSiteId = req.params.baseSiteId;
    console.log("Current baseSiteId::" + baseSiteId);
    const plainTextPassword = req.body.password;
    const baseSite = await getBaseSiteByCode(baseSiteId);
    const languageParam = req.body.lang || baseSite.defaultLanguage.isocode;
    const currencyParam = req.body.currency || baseSite.defaultCurrency.isocode;

    const currency = await getCurrencyByIsoCode(currencyParam);
    const language = await getLanguageByIsoCode(languageParam);

    //const hashPass=await generatePassword(req.body.password)
    const email = req.body.email;

    //for starting a new transaction
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      console.log('start all operations ::');
      let customer = await getCustomerByEmail(email);
      if (customer) {
        return res.status(400).json({ error: 'The Email id ' + email + ' is already registered, please try with different email id !!!' });
      } else {
        const usergroup = await getUserGroup('customerGroup');

        customer = new CustomerModel({
          email: req.body.email,
          uid: req.body.email,
          name: req.body.name,
          phone: req.body.phone,
          baseSite: baseSite,
          sessionLanguage: language,
          sessionCurrency: currency,
          userGroups: [usergroup]
        });
      }

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(plainTextPassword, salt, (err, hash) => {
          //console.log("hash value Inside :" + hash);
          customer.password = hash;
          customer.save(function (err) {
            if (err) {
              res.status(400).json({
                error: err,
              });
            } else {
              res.status(200).json({ data: customer });
            }
          });
        });
      });

      await session.commitTransaction();
      console.log('success : committing all operations');

    } catch (error) {
      console.log('error : rollback the operations');
      //for rollback the operations
      await session.abortTransaction();
      return res.status(400).json({
        error: error
      })
    }
    finally {
      session.endSession(); // End transaction
    }
  }); //end of method

// @desc   get all customers
// @route   GET //:baseSiteId/customers
router.get("/:baseSiteId/customers", ensureCustomerAuth, async (req, res) => {
  try {
    const customers = await getCustomers();
    console.log("Total customers:::", customers.length)
    res.status(200).json(customers);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err,
    });
  }
});

// @desc update the Customer
// @route  post/{baseSiteId}/users/{userId}
router.put("/:baseSiteId/users/:userId", ensureCustomerAuth, async (req, res) => {
  try {
    const customerId = req.params.userId;
    const customer = await getCustomerByUid(customerId);
    customer.name = req.body.name;
    //customer.email= req.body.email;
    customer.phone = req.body.phone;
    CustomerModel.findOneAndUpdate({ "uid": customerId }, customer, (err, obj) => {
      if (err) {
        res.status(404).json({
          error: err
        })
      } else {
        res.status(201).json(customer);
      }

    })
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err,
    });
  }
});


// @desc create a customer
// @route   POST /{baseSiteId}/users/{userId}/forgotPassword
router.post("/:baseSiteId/users/:userId/forgotPassword", ensureCustomerAuth, async (req, res) => {
  console.log(req.body);
  const userId = req.params.userId;
  const customer = await getCustomerByUid(userId);
  if (customer) {
    forgotPasswordEmailHandler(customer.email);
    res.status(200).json({
      msg: `a system generated password will be sent to your registerd email ${customer.email}`
    })
  }
  else {
    res.status(404).json({
      error: 'Invalid email id !!!'
    }
    )
  }

})

// @desc create cart for customer
// @route   POST /customers/emailid/cart
router.post("/:email/carts", ensureCustomerAuth, async (req, res) => {
  console.log(req.body);
  const oAuthClient = req.user;
  const emailParam = req.params.email;
  //const languageParam=req.body.lang || 'en_US';
  const currencyParam = req.body.currency || "USD";

  //const language=await getLanguageByIsoCode(languageParam);
  const currency = await getCurrencyByIsoCode(currencyParam);
  const baseSite = await getCurrentBaseSiteByOAuthCode(oAuthClient);
  const customer = await getCustomerByEmail(emailParam);

  if (baseSite && customer && currency) {
    const cart = new CartModel({
      baseSite: baseSite,
      owner: customer,
      currency: currency,
      name: req.body.name,
      purchaseOrderNumber: req.body.purchaseOrderNumber,
      paymentType: req.body.paymentType,
      deliveryMode: req.body.deliveryMode,
      expectedDeliveryDate: req.body.expectedDeliveryDate,
      deliveryComment: req.body.deliveryComment,
    });
    cart.save(function (err) {
      if (err) {
        res.status(500).json({
          error: err,
        });
      } else {
        customer.defaultCart = cart;
        console.log(customer);
        CustomerModel.findOneAndUpdate({ email: emailParam }, customer);
        res.status(200).json(cart);
      }
    });
  } else {
    res.status(500).json({
      error: "Invalid Payload to create cart",
    });
  }
});


// @desc create deliveryAddress for cart
// @route   POST /customers/emailid/defaultCart
router.post(
  "/:email/defaultCart",
  ensureCustomerAuth,
  async (req, res) => {
    const oAuthClient = req.user;
    const emailParam = req.params.email;
    //const languageParam=req.body.lang || 'en_US';
    const currencyParam = req.body.currency || "USD";

    //const language=await getLanguageByIsoCode(languageParam);
    const currency = await getCurrencyByIsoCode(currencyParam);
    const baseSite = await getCurrentBaseSiteByOAuthCode(oAuthClient);
    const customer = await getCustomerByEmail(emailParam);
    //console.log(customer);

    if (customer.defaultCart) {
      console.log("default cart is available :" + customer.defaultCart);
      const defaultCart = await CartModel.findById(customer.defaultCart);
      res.status(200).json(defaultCart);
    } else {
      const cart = new CartModel({
        baseSite: baseSite,
        owner: customer,
        currency: currency,
        name: req.body.name,
        purchaseOrderNumber: req.body.purchaseOrderNumber,
        paymentType: req.body.paymentType,
        deliveryMode: req.body.deliveryMode,
        expectedDeliveryDate: req.body.expectedDeliveryDate,
        deliveryComment: req.body.deliveryComment,
      });

      cart.save(async function (err) {
        if (err) {
          res.status(500).json({
            error: err
          })
        } else {
          console.log("Inside save cart :" + cart);
          customer.defaultCart = cart;
          await CustomerModel.findOneAndUpdate({ email: emailParam }, customer);
          res.status(200).json(cart);
        }
      })
    }
  });


// @desc create deliveryAddress for cart
// @route   POST /customers/emailid/carts/cartId/deliveryAddress
router.post(
  "/:email/carts/:cartId/deliveryAddress",
  ensureCustomerAuth,
  async (req, res) => {
    const oAuthClient = req.user;
    const emailParam = req.params.email;
    const cartIdParam = req.params.cartId;
    const baseSite = await getCurrentBaseSiteByOAuthCode(oAuthClient);
    const customer = await getCustomerByEmail(emailParam);
    const cart = await getCartById(cartIdParam);
    const country = await getCountryByIsocode(req.body.countryIsoCode);
    const region = await getRegionByIsoCode(req.body.regionIsoCode);

    if (baseSite && customer && cart && country && region) {
      const address = new AddressModel({
        appartment: req.body.appartment,
        building: req.body.building,
        streetno: req.body.streetno,
        streetname: req.body.streetname,
        city: req.body.city,
        postalCode: req.body.postalCode,
        region: region,
        country: country,
        owner: cart,
      });

      address.save(function (err) {
        if (err) {
          res.status(500).json({
            error: err,
          });
        } else {
          cart.deliveryAddress = address;
          cart.save(function (err) {
            if (err) {
              res.status(500).json({
                error: err,
              });
            } else {
              res.status(200).json(address);
            }
          });
        }
      });
    } else {
      res.status(500).json({
        error: "Invalid Payload to create deliveryAddress",
      });
    }
  }
); //end of method


// @desc redeem voucher
// @route   POST /voucher/redeem
router.post('/:email/carts/:cartId/redeemVoucher', ensureCustomerAuth, async (req, res) => {
  const emailParam = req.params.email;
  const cartIdParam = req.params.cartId;
  const baseSite = await getCurrentBaseSiteByOAuthCode(oAuthClient);
  const customer = await getCustomerByEmail(emailParam);
  const cart = await getCartById(cartIdParam);
  const voucherParam = req.body.voucherCode;
  const voucherModel = await getVoucherByCode(voucherParam);

  if (baseSite && customer && cart && voucherModel) {
    //Apply Voucher in Cart, Recalcualte Cart
    //Mark Voucher as Used
    res.status(200).json(voucherModel);
  }

})

// @desc create paymentAddress for cart
// @route   POST /customers/emailid/carts/cartId/paymentAddress
router.post(
  "/:email/carts/:cartId/paymentAddress",
  ensureCustomerAuth,
  async (req, res) => {
    const oAuthClient = req.user;
    const emailParam = req.params.email;
    const cartIdParam = req.params.cartId;
    const baseSite = await getCurrentBaseSiteByOAuthCode(oAuthClient);
    const customer = await getCustomerByEmail(emailParam);
    const cart = await getCartById(cartIdParam);
    const country = await getCountryByIsocode(req.body.countryIsoCode);
    const region = await getRegionByIsoCode(req.body.regionIsoCode);

    if (baseSite && customer && cart && country && region) {
      const address = new AddressModel({
        appartment: req.body.appartment,
        building: req.body.building,
        streetno: req.body.streetno,
        streetname: req.body.streetname,
        city: req.body.city,
        postalCode: req.body.postalCode,
        region: region,
        country: country,
        owner: cart,
      });

      address.save(function (err) {
        if (err) {
          res.status(500).json({
            error: err,
          });
        } else {
          cart.paymentAddress = address;
          cart.save(function (err) {
            if (err) {
              res.status(500).json({
                error: err,
              });
            } else {
              res.status(200).json(address);
            }
          });
        }
      });
    } else {
      res.status(500).json({
        error: "Invalid Payload to create paymentAddress",
      });
    }
  }
); //end of method



// @desc create deliveryAddress for cart
// @route   POST /customers/emailid/carts/cartId/deliveryAddress
router.post(
  "/:email/carts/:cartId/deliveryModes",
  ensureCustomerAuth,
  async (req, res) => {
    const oAuthClient = req.user;
    const emailParam = req.params.email;
    const cartIdParam = req.params.cartId;
    const deliveryModeParam = req.body.deliveryMode;
    //const baseSite = await getCurrentBaseSiteByOAuthCode(oAuthClient);
    const customer = await getCustomerByEmail(emailParam);
    const cart = await getCartById(cartIdParam);

    if (emailParam && cartIdParam) {
      cart.deliveryMode = deliveryModeParam;
      console.log(cart);
      CartModel.findOneAndUpdate({ "_id": cartIdParam }, cart, (err, obj) => {
        if (err) {
          res.status(404).json({
            error: err
          })
        } else {
          res.status(201).json(obj);
        }

      })
    }
    else {
      res.status(500).json({
        error: "Invalid Payload to create deliveryMode",
      });
    }
  }
); //end of method

// @desc create entry for cart
// @route   POST /customers/emailid/carts/cartId/cartEntry
router.post(
  "/:email/carts/:cartId/cartEntry",
  ensureCustomerAuth,
  async (req, res) => {
    const oAuthClient = req.user;
    const emailParam = req.params.email;
    const cartIdParam = req.params.cartId;

    //const baseSite = await getCurrentBaseSiteByOAuthCode(oAuthClient);
    const customer = await getCustomerByEmail(emailParam);
    const cart = await getCartById(cartIdParam);

    if (emailParam && cartIdParam) {

      let cartEntry = new CartEntryModel({
        owner: cart,
        entryNumber: req.body.entryNumber,
        productCode: req.body.productCode,
        quantity: req.body.quantity,
        basePrice: req.body.basePrice,
        unit: req.body.unit,
        taxValues: req.body.taxValues,
        discountValue: req.body.discountValue,
        totalPrice: req.body.totalPrice,
      });

      cartEntry.save(function (err) {
        if (err) {
          res.status(404).json({
            error: err
          })
        } else {
          //calculate cart value here
          res.status(200).json(cartEntry);
        }
      })

    }
    else {
      res.status(500).json({
        error: "Invalid Payload to create deliveryMode",
      });
    }
  }
); //end of method


// @desc create address for customer
// @route   POST /customers/supportTicket
router.post("/:email/supportTicket", ensureCustomerAuth, async (req, res) => {
  console.log(req.body);
  const oAuthClient = req.user;
  const emailParam = req.params.email;
  const customer = await getCustomerByEmail(emailParam);
  const baseSite = await getCurrentBaseSiteByOAuthCode(oAuthClient);
  //const country = await getCountryByIsocode(req.body.countryIsoCode);
  //const region = await getRegionByIsoCode(req.body.regionIsoCode);

  if (customer && baseSite) {
    const customerSupportTicket = new CustomerSupportTicketModel({
      headline: req.body.headline,
      errorCode: req.body.errorCode,
      productSerialNum: req.body.productSerialNum,
      productSKU: req.body.productSKU,
      ticketType: req.body.ticketType,
      description: req.body.description,
      purchaseDate: req.body.purchaseDate,
      priority: req.body.priority,
      resolution: req.body.resolution,
      status: req.body.status,
      crmTicketId: req.body.crmTicketId,
      customer: customer,
      basesite: baseSite,
    });

    customerSupportTicket.save(function (err) {
      if (err) {
        return res.status(500).json({
          error: err,
        });
      } else {
        ticketCreationEventHandler(customerSupportTicket);
        return res.status(200).json(customerSupportTicket);
      }
    });
  } else {
    res.status(500).json({
      error: "Invalid Payload"
    });

  }
})


module.exports = router;
