const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();



const { ensureTokenAuth } = require("../../middleware/auth");
const { getCurrentBaseSiteByOAuthCode } = require("../../lib/basesite");
const { getLanguageByIsoCode } = require("../../lib/language");
const { getCurrencyByIsoCode } = require("../../lib/currency");
const { getB2BCustomerByEmail } = require("../../lib/b2bcustomer");

const { getB2BUnitList,getB2BUnitByCode } = require("../../lib/b2bunit");
const { getUserGroup } = require("../../lib/usergroup");
const { getRegionByIsoCode } = require("../../lib/region");
const { getCountryByIsocode } = require("../../lib/country");
const { getB2BCartById } = require("../../lib/b2bcart");
const {ticketCreationEventHandler} = require("../../lib/supportTicket")
const {customerRegistrationEventHandler} = require("../../lib/b2bcustomer")

//const {generatePassword} = require('../../lib/utils')
const B2BUnitModel = require("../../models/B2BUnit");
const B2BCustomerModel = require("../../models/B2BCustomer");
const CustomerModel = require("../../models/Customer");
const AddressModel = require("../../models/Address");
const B2BCartModel = require("../../models/B2BCart");
const B2BCartEntryModel = require("../../models/B2BCartEntry");
const CustomerSupportTicketModel = require("../../models/CustomerSupportTicket");


router.get("/", ensureTokenAuth, async (req, res) => {
    const b2bUnitList=await getB2BUnitList();
    res.status(200).json(b2bUnitList);
})

router.get("/:code", ensureTokenAuth, async (req, res) => {

  const b2bUnit=await getB2BUnitByCode(req.params.code);
  res.status(200).json(b2bUnit);
})


// @desc create a b2bCustomer
// @route   POST /accounts/:code/B2BCustomer
router.post("/:code/B2BCustomer", ensureTokenAuth, async (req, res) => {
  console.log(req.body);
  const oAuthClient = req.user;
  const languageParam = req.body.lang || "en_US";
  const currencyParam = req.body.currency || "USD";
  const plainTextPassword = req.body.password;
  const language = await getLanguageByIsoCode(languageParam);
  const currency = await getCurrencyByIsoCode(currencyParam);
  const baseSite = await getCurrentBaseSiteByOAuthCode(oAuthClient);
  const b2bUnit=await getB2BUnitByCode(req.params.code);
  const userGroup=await getUserGroup('customerGroup');
  
  //const hashPass=await generatePassword(req.body.password)
  const existingB2BCustomer=await getB2BCustomerByEmail(req.body.email);
  if(existingB2BCustomer){
    return res.status(500).json({
      "error":"Customer with same email already registered"
    })
  }
  const b2bcustomer = new B2BCustomerModel({
    email: req.body.email,
    baseSite: baseSite,
    sessionLanguage: language,
    sessionCurrency: currency,
    defaultB2BUnit:b2bUnit,
    userGroup:userGroup

  });

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(plainTextPassword, salt, (err, hash) => {
      console.log("hash value Inside :" + hash);
      b2bcustomer.password = hash;
      b2bcustomer.save(function (err) {
        if (err) {
          res.status(500).json({
            error: err,
          });
        } else {
          customerRegistrationEventHandler(b2bcustomer);
          res.status(200).json(b2bcustomer);
        }
      });
    });
  });
}); //end of method



// @desc create address for customer
// @route   POST /accounts/:code/B2BCustomer/:emailid/Address
router.post("/:code/B2BCustomer/:email/Address", ensureTokenAuth, async (req, res) => {
  console.log(req.body);
  const oAuthClient = req.user;
  const emailParam = req.params.email;
  const b2bcustomer = await getB2BCustomerByEmail(emailParam);
  const country = await getCountryByIsocode(req.body.countryIsoCode);
  const region = await getRegionByIsoCode(req.body.regionIsoCode);
  const b2bUnit=await getB2BUnitByCode(req.params.code);

  if (b2bcustomer && b2bUnit) {
    const address = new AddressModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      fax: req.body.fax,
      dateOfBirth:req.body.dateOfBirth,
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
      //owner: customer,
      
    });

    address.save(function(err) {
      if (err) {
        res.status(500).json({
          error: err,
        });
      }else{
        b2bcustomer.defaultShipmentAddress=address;
        b2bcustomer.defaultPaymentAddress=address;
        B2BCustomerModel.findOneAndUpdate({"email":emailParam},b2bcustomer,(err,customer)=>{
          if(err){
            res.status(404).json({
              error: err,
            });
          }else{
            res.status(200).json(address);
          }
          
        });
      }
    })
  }else{
    res.status(500).json({
      error: "Invalid Payload"
    });

  }
})

/*
// @desc create cart for customer
// @route   POST /customers/emailid/cart
router.post("/:email/carts", ensureTokenAuth, async (req, res) => {
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
        customer.defaultCart=cart;
        console.log(customer);
        CustomerModel.findOneAndUpdate({email:emailParam},customer);
        res.status(200).json(cart);
      }
    });
  } else {
    res.status(500).json({
      error: "Invalid Payload to create cart",
    });
  }
});
*/

// @desc create default cart for B2B Customer
// @route   POST /accounts/:code/B2BCustomer/:emailid/defaultCart
router.post(
  "/:code/B2BCustomer/:email/defaultCart",
  ensureTokenAuth,
  async (req, res) => {

  const oAuthClient = req.user;
  const emailParam = req.params.email;
  const baseSite = await getCurrentBaseSiteByOAuthCode(oAuthClient);
  const b2bcustomer = await getB2BCustomerByEmail(emailParam);
  const b2bUnit=await getB2BUnitByCode(req.params.code);
  const currencyParam = req.body.currency || "USD";
  //const language=await getLanguageByIsoCode(languageParam);
  const currency = await getCurrencyByIsoCode(currencyParam);
  

  //console.log(b2bcustomer);

    if(b2bUnit && b2bcustomer.defaultCart){
      console.log("default cart is available :" + b2bcustomer.defaultCart);
      const defaultCart=await CartModel.findById(b2bcustomer.defaultCart);
      res.status(200).json(defaultCart);
    }else{
       const b2bcart = new B2BCartModel({
        baseSite: baseSite,
        owner: b2bcustomer,
        currency: currency,
        name: req.body.name,
        purchaseOrderNumber: req.body.purchaseOrderNumber,
        paymentType: req.body.paymentType,
        deliveryMode: req.body.deliveryMode,
        expectedDeliveryDate: req.body.expectedDeliveryDate,
        deliveryComment: req.body.deliveryComment,
        defaultB2BUnit: b2bUnit
      });

      b2bcart.save(async function (err){
        if(err){
          res.status(500).json({
            error:err
          })
        }else{
          console.log("Inside save cart :" + b2bcart);
          b2bcustomer.defaultCart=b2bcart;
          await B2BCustomerModel.findOneAndUpdate({email:emailParam},b2bcustomer);
          res.status(200).json(b2bcart);
        }
      })
    }
  });


// @desc create deliveryAddress for cart
// @route   POST /:code/B2BCustomer/:email/carts/cartId/deliveryAddress
router.post(
  "/:code/B2BCustomer/:email/carts/:cartId/deliveryAddress",
  ensureTokenAuth,
  async (req, res) => {
    const oAuthClient = req.user;
    const emailParam = req.params.email;
    const cartIdParam = req.params.cartId;
    const baseSite = await getCurrentBaseSiteByOAuthCode(oAuthClient);
    const b2bcustomer = await getB2BCustomerByEmail(emailParam);
    const b2bUnit=await getB2BUnitByCode(req.params.code);  
    //Since CartId is unique so same API should work here
    const b2bcart = await getCartById(cartIdParam); 
    const country = await getCountryByIsocode(req.body.countryIsoCode);
    const region = await getRegionByIsoCode(req.body.regionIsoCode);

    if (b2bUnit && baseSite && b2bcustomer && b2bcart && country && region) {
      const address = new AddressModel({
        appartment: req.body.appartment,
        building: req.body.building,
        streetno: req.body.streetno,
        streetname: req.body.streetname,
        city: req.body.city,
        postalCode: req.body.postalCode,
        region: region,
        country: country,
        owner: b2bcart,
      });

      address.save(function (err) {
        if (err) {
          res.status(500).json({
            error: err,
          });
        } else {
          b2bcart.deliveryAddress = address;
          b2bcart.save(function (err) {
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

// @desc create deliveryAddress for cart
// @route   POST /accounts/:code/B2BCustomer/:email/carts/cartId/paymentAddress
router.post(
  "/:code/B2BCustomer/:email/carts/:cartId/paymentAddress",
  ensureTokenAuth,
  async (req, res) => {
    const oAuthClient = req.user;
    const emailParam = req.params.email;
    const cartIdParam = req.params.cartId;
    const baseSite = await getCurrentBaseSiteByOAuthCode(oAuthClient);
    const b2bcustomer = await getB2BCustomerByEmail(emailParam);
    const b2bUnit=await getB2BUnitByCode(req.params.code);  
    //Since CartId is unique so same API should work here
    const b2bcart = await getCartById(cartIdParam); 
    const country = await getCountryByIsocode(req.body.countryIsoCode);
    const region = await getRegionByIsoCode(req.body.regionIsoCode);

    if (b2bUnit && baseSite && b2bcustomer && b2bcart && country && region) {
      const address = new AddressModel({
        appartment: req.body.appartment,
        building: req.body.building,
        streetno: req.body.streetno,
        streetname: req.body.streetname,
        city: req.body.city,
        postalCode: req.body.postalCode,
        region: region,
        country: country,
        owner: b2bcart,
      });

      address.save(function (err) {
        if (err) {
          res.status(500).json({
            error: err,
          });
        } else {
          b2bcart.paymentAddress = address;
          b2bcart.save(function (err) {
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


// @desc create entry for cart
// @route   POST /customers/emailid/carts/cartId/cartEntry
router.post(
  "/:code/B2BCustomer/:email/carts/:cartId/cartEntry",
  ensureTokenAuth,
  async (req, res) => {
    const oAuthClient = req.user;
    const emailParam = req.params.email;
    const cartIdParam = req.params.cartId;
    const b2bcustomer = await getB2BCustomerByEmail(emailParam);
    const b2bUnit=await getB2BUnitByCode(req.params.code);  
    const b2bcart = await getB2BCartById(cartIdParam);
    
    if (b2bcustomer && b2bUnit && emailParam && b2bcart ) {

         let b2bCartEntry=new B2BCartEntryModel({
          owner:b2bcart,
          entryNumber: req.body.entryNumber,
          productCode: req.body.productCode,
          quantity: req.body.quantity,
          basePrice: req.body.basePrice,
          unit:req.body.unit,
          taxValues: req.body.taxValues,
          discountValue: req.body.discountValue,
          totalPrice:req.body.totalPrice,
          });
          
          b2bCartEntry.save(function (err){
              if(err){
                res.status(404).json({
                  error:err
                })
              }else{
                //calculate cart value here
                res.status(200).json(b2bCartEntry);
              }
          })
       
      }
      else {
      res.status(500).json({
        error: "Invalid Payload to create cart entry",
      });
    }
  }
); //end of method


// @desc create support ticket for b2b customer
// @route   POST /accounts/:code/B2BCustomer/:email/supportTicket
router.post("/:code/B2BCustomer/:email/supportTicket", ensureTokenAuth, async (req, res) => {
  console.log(req.body);
  const oAuthClient = req.user;
  const emailParam = req.params.email;
  const b2bcustomer = await getB2BCustomerByEmail(emailParam);
  const b2bUnit=await getB2BUnitByCode(req.params.code);  
  const baseSite = await getCurrentBaseSiteByOAuthCode(oAuthClient);
  
  if (b2bcustomer && baseSite) {
    const customerSupportTicket = new CustomerSupportTicketModel({
      headline: req.body.headline,
      errorCode: req.body.errorCode,
      productSerialNum: req.body.productSerialNum,
      productSKU: req.body.productSKU,
      ticketType:req.body.ticketType,
      description: req.body.description,
      purchaseDate: req.body.purchaseDate,
      priority:req.body.priority,
      resolution:req.body.resolution,
      status:req.body.status,
      crmTicketId:req.body.crmTicketId,
      b2bcustomer: b2bcustomer,
      basesite: baseSite,
    });

    customerSupportTicket.save(function(err) {
      if (err) {
        return res.status(500).json({
          error: err,
        });
      }else{
            ticketCreationEventHandler(customerSupportTicket);
            return res.status(200).json(customerSupportTicket);
          }
      });
  }else{
    res.status(500).json({
      error: "Invalid Payload"
    });

  }
})

module.exports = router;
