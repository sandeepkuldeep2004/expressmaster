// Read the properies file 
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('properties/local.properties');

const { getBaseSiteById, getBaseSiteByCode } = require("../../lib/basesite");
const { getVoucherByCode } = require("../../lib/voucher");

const express = require("express");
const router = express.Router();
const CartModel = require("../../models/Cart");
const CartEntryModel = require("../../models/CartEntry");
const CustomerModel = require("../../models/Customer");
const VoucherModel = require("../../models/Voucher");

const { ensureCustomerAuth, checkBaseSite } = require("../../middleware/auth");
const { getCartByPurchaseOrderNumber, getCartById, getCartByOwner, getCartEntry, getCartEntryById, getCartEntryByCartAndEntrynumber } = require("../../lib/cart");
const { getProduct } = require("../../lib/product");
const { getProductStock } = require("../../lib/stocklevel");
const { getProductPrice } = require("../../lib/pricerow");
const { getCustomerByEmail } = require("../../lib/customer");
const { getCurrencyById } = require("../../lib/currency");
const { generateNumber } = require("../../lib/numberseries");
// To generate the random number
//const randomize = require('randomatic');
const each = require('async/each');

//import eachSeries from 'async/eachSeries';

// @desc   get all Category List
// @route   GET /catalogs
router.get("/:baseSiteId/user/:userId/minicart", ensureCustomerAuth, async (req, res) => {
  try {
    const userIdParam = req.params.userId;
    const baseSiteIdParam = req.params.baseSiteId;

    const customer = await getCustomerByEmail(userIdParam);
    if (null === customer) {
      return res.status(400).json({ "error": 400, "status": "failure", "message": "Customer Not Found", "userId": userIdParam });
    }
    const baseSite = await getBaseSiteByCode(baseSiteIdParam);
    const catalog = baseSite.productCatalog;

    var cart = await getCartByOwner(customer._id);

    if (!cart) {
      return res.status(200).json({ "total_qty": "0", "order_total": "0.0" });
    }
    calculateCart(cart, catalog);

    let totalEntries = 0;
    const cartEntirs = cart.cartEntries;
    each(cartEntirs, async (entryObj) => {
      const entry = await getCartEntryById(entryObj);
      totalEntries = totalEntries + entry.quantity;
    }, async function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log({ "cartId": cart._id, "totalQty": totalEntries, "totalPrice": cart.totalPrice });
        res.status(200).json({ "Id": cart._id, "totalQty": totalEntries, "totalPrice": cart.totalPrice, "cartId": cart.purchaseOrderNumber });
      }
    });



  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

function calculateCart(cart, catalog) {
  let cartTotalPrice = 0.0;
  let discountValue = 0.0;

  const entries = cart.cartEntries;
  each(entries, async (entryObj) => {
    const entry = await getCartEntryById(entryObj);
    //getproduct realtime price
    const productPrice = await getProductPrice(entry.productCode, catalog);
    cartTotalPrice = (cartTotalPrice + (productPrice.priceValue * entry.quantity));
  }, async function (err) {
    if (err) {
      console.log(err);
    } else {

      //calculate Voucher's Discount
      const voucherModel = await getVoucherByCode(cart.appliedCouponCodes);
      if (voucherModel && isTodaysDateWithinTheRange(voucherModel.startDate, voucherModel.expireDate)) {
        if (voucherModel.amount > 0) {
          discountValue = (voucherModel.amount).toFixed(2);
        } else {
          discountValue = ((cartTotalPrice * voucherModel.discountPercentage) / 100).toFixed(2);
        }
      }
      cartParams = {
        totalPrice: cartTotalPrice.toFixed(2),
        totalDiscountValue: discountValue.toFixed(2),
      };
      console.log("cartParams :", cartParams);
      const e = await CartModel.findByIdAndUpdate(cart._id, { $set: cartParams });
      return e;
    }
  });

}

// @desc create entry for cart
// @route   POST /cart/emailid/addtocart
router.post(
  "/:baseSiteId/user/:userId/cart",
  ensureCustomerAuth,
  checkBaseSite,
  async (req, res) => {

    const userIdParam = req.params.userId;
    const baseSiteIdParam = req.params.baseSiteId;

    let basePrice;
    let unit;

    if (req.body.quantity <= 0 || !Number.isInteger(req.body.quantity)) {
      return res.status(400).json({ "status": "failure", "error": 400, "message": "Please enter the valid quantity (positive number only)" });
    }

    const customer = await getCustomerByEmail(userIdParam);
    if (null === customer) {
      return res.status(400).json({ "status": "failure", "error": 400, "message": "Customer Not Found", "userId": userIdParam });
    }

    const currency = await getCurrencyById(customer.sessionCurrency);
    if (null === currency) {
      return res.status(400).json({ "status": "failure", "error": 400, "message": "Currency Not Found" });
    }
    console.log("baseSiteIdParam", baseSiteIdParam);

    const baseSite = await getBaseSiteByCode(baseSiteIdParam);

    const catalog = baseSite.productCatalog;
    const product = await getProduct(req.body.productCode, catalog);

    if (product) {
      // Check the product Price
      // check the product real time price
      const productPrice = await getProductPrice(req.body.productCode, catalog);
      if (null === productPrice) {
        return res.status(400).json({ "status": "failure", "error": 400, "message": "Product Price not available", "product code": req.body.productCode });
      } else {
        basePrice = productPrice.priceValue.toFixed(2);
        unit = productPrice.unit;
        totalPrice = productPrice.priceValue.toFixed(2);
      }

      //check for product stock
      const enableStockCheck = properties.get("product.stock.check.enable");
      if (enableStockCheck) {
        var productStock = await getProductStock(req.body.productCode);
        if ((null === productStock) || ('forceInStock' !== productStock.inStockStatus && !(productStock.availableQty >= req.body.quantity))) {
          return res.status(400).json({ "status": "failure", "error": 400, "message": "Product is out of stock", "productCode": req.body.productCode });
        }
      }

    } else {
      return res.status(400).json({ "status": "failure", "error": 400, "message": "Product not found", "productCode": req.body.productCode });
    }

    var cart = await getCartByOwner(customer._id);
    var entryNotExist = true;

    if (cart) {

      const entry = await getCartEntry(cart._id, req.body.productCode);

      if (entry) {
        let entryId = entry._id;
        var oldQty = entry.quantity;
        console.log("entry Number " + entryId);
        entryParams = {
          quantity: oldQty + req.body.quantity,
          totalPrice: ((oldQty + req.body.quantity) * basePrice).toFixed(2),
          basePrice: basePrice
        };

        const e = await CartEntryModel.findByIdAndUpdate(entryId, { $set: entryParams });
        entryNotExist = false;
        calculateCart(cart, catalog);

        var successMessage = "Product added successfully :" + req.body.productCode;
        return res.status(200).json({
          status: "success",
          message: successMessage,
          cartId: cart.purchaseOrderNumber
        });
      }
    }

    if (cart && entryNotExist) {
      console.log(`cart found for the user`, customer.email);

      var cartEntriesList = cart.cartEntries
      let cartEntry = createCartEntry(req, res, cart, basePrice, unit);
      if (null === cartEntry) {
        return res.status(400).json({ "status": "failure", "error": 400, "message": "Unable to add product to the cart" });
      }
      if (cartEntriesList.length >= 0) {
        cartEntriesList.push(cartEntry);
      } else {
        cartEntriesList = [cartEntry];
      };

      cartParams = {
        cartEntries: cartEntriesList,
      };

      const savedCart = await CartModel.findByIdAndUpdate(cart._id, { $set: cartParams });
      if (savedCart) {
        console.log("Product added successfully");
        var successMessage = "Product added successfully :" + req.body.productCode;
        calculateCart(cart, catalog);
        return res.status(200).json({
          status: "success",
          message: successMessage,
          cartId: cart.purchaseOrderNumber
        });

      }
    }
    else {
      //var orderNumber = '100'+randomize('0', 8);
      const orderNumber = await generateNumber('cart');

      if (baseSite && customer && currency) {
        const cart = new CartModel({
          baseSite: baseSite,
          owner: customer._id,
          currency: currency,
          purchaseOrderNumber: orderNumber,
        });
        cart.save(function (err) {
          if (err) {
            res.status(500).json({
              error: err,
            });
          } else {

            //Create Cart Entry and associated with card.
            var cartEntry = createCartEntry(req, res, cart, basePrice, unit);
            if (null === cartEntry) {
              return res.status(400).json({ "status": "failure", "message": "Unable to Add Product to the cart" });
            }
            //update the cart, with Entry
            var cartEntriesList = [cartEntry];
            cart.cartEntries = cartEntriesList;
            cart.save(function (err) {
              if (err) {
                res.status(404).json({
                  error: err
                })
              } else {
                calculateCart(cart, catalog);
                console.log("Product Added Successfully");
              }
            });

            try {
              console.log("try block", cart);
              customer.defaultCart = cart._id;
              CustomerModel.findOneAndUpdate({ email: req.customer }, customer);


              return res.status(200).json({
                status: "success",
                message: "Product added successfully:" + cartEntry.productCode,
                cartId: cart.purchaseOrderNumber
              });

            } catch (e) {
              console.error(err);
              return res.status(200).json({ "status": "failure", "message": err });
            }
          }
        });

      } else {
        res.status(500).json({
          error: "Invalid Payload to create cart",
        });
      }
    }
  }
);

function createCartEntry(req, res, cart, basePrice, unit) {
  var newEntryNumber = 1;
  var cartEntries = cart.cartEntries;
  if (cartEntries) newEntryNumber = cartEntries.length + 1;

  let cartEntry = new CartEntryModel({
    owner: cart._id,
    entryNumber: newEntryNumber,
    productCode: req.body.productCode,
    quantity: req.body.quantity,
    basePrice: basePrice,
    unit: unit,
    taxValues: 0,
    discountValue: 0,
    totalPrice: (req.body.quantity * basePrice).toFixed(2),
  });
  //Save Order Entry  
  cartEntry.save(function (err) {
    if (err) {
      res.status(404).json({
        error: err
      });
    } else {
      console.log("Cart Entry Created successfully");
    }
  });
  return cartEntry;
}

router.get("/:baseSiteId/user/:userId/cart", ensureCustomerAuth, checkBaseSite, async (req, res) => {
  try {
    const userIdParam = req.params.userId;
    const baseSiteIdParam = req.params.baseSiteId;

    const customer = await getCustomerByEmail(userIdParam);
    if (null === customer) {
      return res.status(400).json({ "status": "failure", "error": 400, "message": "Customer Not Found", "userId": userIdParam });
    }

    const baseSite = await getBaseSiteByCode(baseSiteIdParam);

    const catalog = baseSite.productCatalog;

    var cart = await getCartByOwner(customer._id);
    if (!cart || (cart.cartEntries.length == 0)) {
      return res.status(400).json({ "status": "failure", "error": 400, "userId": req.customer, "message": "Cart Not found" });
    }

    let cartEntriesList = [];
    const cartEntirs = cart.cartEntries;
    each(cartEntirs, async (entryObj) => {
      const entry = await getCartEntryById(entryObj);
      const product = await getProduct(entry.productCode, catalog)
      var media;
      if (product.medias && product.medias.length >= 1) {
        media = product.medias.sort((a, b) => a.priority - b.priority).shift();
      //  console.log('Product -', product.code, ' Media is ==', media)
      }
      var productDetails = {
        code: product.code,
        name: product.title,
        description: product.description,
        type: product.productType,
        media: media
      };

      entry.product = productDetails;

      cartEntriesList.push(entry);
    }, async function (err) {
      if (err) {
        console.log(err);
      } else {
        cart.cartEntries = cartEntriesList.sort((a, b) => a.entryNumber - b.entryNumber);
        // console.log({"cartId":cart._id,"totalQty":totalEntries,"totalPrice":cart.totalPrice});
        res.status(200).json(cart);
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

router.put("/:baseSiteId/user/:userId/cart/:cartId/updateentry", ensureCustomerAuth, checkBaseSite, async (req, res) => {
  try {
    const userIdParam = req.params.userId;
    const cartIdParam = req.params.cartId;
    const baseSiteIdParam = req.params.baseSiteId;

    if (req.body.quantity <= 0) {
      return res.status(400).json({ "status": "failure", "error": 400, "message": "quantity can't be null" });
    }
    if (!Number.isInteger(req.body.quantity)) {
      return res.status(400).json({ "status": "failure", "error": 400, "message": "quantity can't be decimal number/String" });
    }
    const customer = await getCustomerByEmail(userIdParam);
    if (null === customer) {
      return res.status(400).json({ "status": "failure", "error": 400, "message": "Customer Not Found", "userId": userIdParam });
    }

    const newQuantity = req.body.quantity;
    const entryNumber = req.body.entryNumber;

    const baseSite = await getBaseSiteByCode(baseSiteIdParam);

    const catalog = baseSite.productCatalog;

    const cart = await getCartByPurchaseOrderNumber(cartIdParam);
    if (null === cart) {
      return res.status(400).json({ "status": "failure", "error": 400, "message": "Cart not found", "purchaseOrderNumber": cartIdParam });
    }
    const entry = await getCartEntryByCartAndEntrynumber(cart._id, entryNumber);
    if (null === entry) {
      res.status(400).json({
        "error": 400,
        "status": "failure",
        "message": "Entry not found",
        "cartId": cartIdParam,
        "entryNumber": entryNumber
      });
    }

    //Save Order Entry  
    entryParams = {
      quantity: newQuantity,
      totalPrice: (newQuantity * entry.basePrice).toFixed(2),
    };
    const savedEntry = await CartEntryModel.findByIdAndUpdate(entry._id, { $set: entryParams });
    calculateCart(cart, catalog);
    if (savedEntry) {
      return res.status(200).json({ "status": "success", "message": "Cart updated successfully" });
    } else {
      return res.status(400).json({ "status": "failure", "error": 400, "message": "Unable to update" });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});


router.delete("/:baseSiteId/user/:userId/cart/:cartId/deleteentry", ensureCustomerAuth, checkBaseSite, async (req, res) => {
  try {
    const userIdParam = req.params.userId;
    const cartIdParam = req.params.cartId;
    const baseSiteIdParam = req.params.baseSiteId;
    const entryNumber = req.body.entryNumber;

    if (entryNumber <= 0 || !Number.isInteger(entryNumber)) {
      return res.status(400).json({ "error": 400, "status": "failure", "message": "Please enter the valid entry number" });
    }

    const customer = await getCustomerByEmail(userIdParam);
    if (null === customer) {
      return res.status(200).json({ "error": 400, "status": "failure", "message": "Customer Not Found", "userId": userIdParam });
    }

    const cart = await getCartByPurchaseOrderNumber(cartIdParam);
    if (null === cart) {
      res.status(400).json({ "error": 400, "status": "failure", "message": "Cart not found", "purchaseOrderNumber": cartIdParam });
    }


    const baseSite = await getBaseSiteByCode(baseSiteIdParam);

    const catalog = baseSite.productCatalog;
    let entryToBeRemoved;
    const allCartEntries = cart.cartEntries;
    const remainingEntries = [];
    each(allCartEntries, async (entryObj) => {
      const entry = await getCartEntryById(entryObj);
      if (entry.entryNumber === entryNumber) {
        entryToBeRemoved = entry;
      } else {
        remainingEntries.push(entry);
      }
    }, async function (err) {
      if (err) {
        console.log(err);
      } else {

        if (!entryToBeRemoved) {
          return res.status(400).json({ "error": 400, "status": "failure", "message": "No Entry Found", "entryNumber": entryNumber })
        } else {
          await CartEntryModel.findByIdAndDelete(entryToBeRemoved._id);

          // Calculate the cart.
          let cartTotalPrice = 0.0;
          each(remainingEntries, async (entryObj) => {
            const cartEntry = await getCartEntryById(entryObj);
            //getproduct realtime price
            const productPrice = await getProductPrice(cartEntry.productCode, catalog);
            cartTotalPrice = (cartTotalPrice + (productPrice.priceValue * cartEntry.quantity));
          }, async function (err) {
            if (err) {
              console.log(err);
            } else {
              cartParams = {
                cartEntries: remainingEntries,
                totalPrice: cartTotalPrice.toFixed(2),
              };
              savedCart = await CartModel.findByIdAndUpdate(cart._id, { $set: cartParams });
            }
          });
          // calculate cart end

          normalizeEntires(remainingEntries);
        }
        console.log("Entry deleted successfully", entryToBeRemoved);
        res.status(200).json({ "status": "success", "message": "Entry deleted successfully", "removedEntry": entryToBeRemoved })
      }
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ "error": 400, "status": "failure", "message": "Unable to delete the entry" })
  }
});


function normalizeEntires(remainingEntries) {
  let index = 0;
  each(remainingEntries, async (element) => {
    index = index + 1;
    entryParams = {
      entryNumber: index,
    };
    console.log("entryParams", entryParams)
    await CartEntryModel.findByIdAndUpdate(element._id, { entryNumber: index });

    console.log("Index", index);
  });
}

//####################### Redeem Voucher Start ############################
// @desc redeem voucher
// @route   POST /voucher/redeem
router.post('/:baseSiteId/user/:userId/cart/:cartId/redeemVoucher', ensureCustomerAuth, checkBaseSite, async (req, res) => {
  try {
    const userIdParam = req.params.userId;
    const cartIdParam = req.params.cartId;
    const baseSiteIdParam = req.params.baseSiteId;

    if (null === req.body.voucherCode) {
      return res.status(400).json({ "error": 400, "status": "failure", "message": "Voucher Code cant be null" })
    }
    const customer = await getCustomerByEmail(userIdParam);
    if (null === customer) {
      return res.status(400).json({ "error": 400, "status": "failure", "message": "Customer Not Found", "userId": userIdParam });
    }

    var cart = await getCartByPurchaseOrderNumber(cartIdParam);
    if (null === cart) {
      return res.status(400).json({ "error": 400, "status": "failure", "message": "Cart Not Found", "userId": cartIdParam });
    }

    const customersBaseSite = await getBaseSiteByCode(baseSiteIdParam);
    const voucherParam = req.body.voucherCode;
    const voucherModel = await getVoucherByCode(voucherParam);
    console.log("voucherModel ", voucherModel);
    const voucherBaseSite = await getBaseSiteById(voucherModel.baseSite);
    if (voucherModel.status === false) {
      return res.status(400).json({ "error": 400, "status": "failure", "message": "Voucher already redeemed" })
    }
    if (!isTodaysDateWithinTheRange(voucherModel.startDate, voucherModel.expireDate)) {
      return res.status(400).json({ "error": 400, "status": "failure", "message": "Voucher is not active, Please connect with admin" })
    }
    if (isSitesAreEqual(voucherBaseSite, customersBaseSite)) {
      // Apply the voucher to the cart and update it
      //cart.appliedCouponCodes: voucherModel;
      await CartModel.findByIdAndUpdate(cart._id, { appliedCouponCodes: voucherModel.code });

      // updat the voucher as reddemed 
      const updatedVoucher = await VoucherModel.findByIdAndUpdate(voucherModel._id, { status: false });

      // Fetch the updated cart from db. 
      const updatedCart = await getCartByOwner(customer._id);
      calculateCart(updatedCart, customersBaseSite.productCatalog);

      return res.status(200).json({ "status": "success", "message": "Coupon applied successfully" })

    } else {
      return res.status(400).json({ "error": 400, "status": "failure", "message": "You are not authorized to redeem this voucher" })
    }


  } catch (err) {
    console.error(err);
    return res.status(400).json({ "error": 400, "status": "failure", "message": "Unable to Apply Voucher" })
  }
});

function isSitesAreEqual(site1, site2) {

  return site1.code === site2.code;

}

function isTodaysDateWithinTheRange(startDate, endDate) {
  const date = new Date();
  return (date > startDate && date < endDate) ? true : false;

}
//####################### Redeem Voucher End ##############################
//####################### Remove Voucher Start ############################
// @desc redeem voucher
// @route   POST /voucher/redeem
router.delete('/:baseSiteId/user/:userId/cart/:cartId/removevoucher', ensureCustomerAuth, checkBaseSite, async (req, res) => {
  try {
    const userIdParam = req.params.userId;
    const cartIdParam = req.params.cartId;
    const baseSiteIdParam = req.params.baseSiteId;

    if (null === req.body.voucherCode) {
      return res.status(400).json({ "error": 400, "status": "failure", "message": "Voucher Code cant be null" })
    }
    const customer = await getCustomerByEmail(userIdParam);
    if (null === customer) {
      return res.status(400).json({ "error": 400, "status": "failure", "message": "Customer Not Found", "userId": userIdParam });
    }

    const cart = await getCartByPurchaseOrderNumber(cartIdParam);
    if (null === cart) {
      return res.status(400).json({ "error": 400, "status": "failure", "message": "Cart Not Found", "userId": cartIdParam });
    }

    const customersBaseSite = await getBaseSiteByCode(baseSiteIdParam);
    const voucherParam = req.body.voucherCode;
    const voucherModel = await getVoucherByCode(voucherParam);
    const voucherBaseSite = await getBaseSiteById(voucherModel.baseSite);
    if (isSitesAreEqual(voucherBaseSite, customersBaseSite)) {
      // Apply the voucher to the cart and update it
      //cart.appliedCouponCodes: voucherModel;
      await CartModel.findByIdAndUpdate(cart._id, { appliedCouponCodes: "" });
      // updat the voucher as reddemed 
      await VoucherModel.findByIdAndUpdate(voucherModel._id, { status: true });

      // Fetch the updated cart from db. 
      const updatedCart = await CartModel.findById(cart._id);
      calculateCart(updatedCart, customersBaseSite.productCatalog);

      return res.status(200).json({ "status": "success", "message": "Coupon removed successfully", "cart": updatedCart })
    } else {
      return res.status(400).json({ "error": 400, "status": "failure", "message": "You are not authorized to remove this voucher" })
    }


  } catch (err) {
    console.error(err);
    res.status(400).json({ "error": 400, "status": "failure", "message": "Unable to remove Voucher" })
  }
});

function isSitesAreEqual(site1, site2) {

  return site1.code === site2.code;

}

function isTodaysDateWithinTheRange(startDate, endDate) {
  const date = new Date();
  return (date > startDate && date < endDate) ? true : false;

}
//####################### Redeem Voucher End ##############################
module.exports = router;
