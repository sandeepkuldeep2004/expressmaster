const mongoose = require('mongoose')
const express = require("express");
const router = express.Router();
const { getOrders, getOrderById, getOrderEntryById, getOrderByPurchaseOrderNumber } = require('../../lib/orderHistory');
const { ensureTokenAuth, ensureCustomerAuth } = require("../../middleware/auth");
const { getCustomerByEmail, getCustomerByUid } = require("../../lib/customer");
const { getBaseSiteByCode } = require("../../lib/basesite");
const { getProduct } = require("../../lib/product");
const OrderModel = require('../../models/Order');
const OrderEntryModel = require('../../models/OrderEntry');
const each = require('async/each');
const CartModel = require("../../models/Cart");
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('properties/local.properties');
const { placeOrderToShipRocket } = require('../../ship-rocket/ship-rocket-order')
const { body, validationResult } = require('express-validator');
const { getProductStock } = require("../../lib/stocklevel");
const { getCartByOwner, getCartEntryById } = require("../../lib/cart");
const { generateNumber } = require("../../lib/numberseries");
const { getPaymentTransactionById, updatePaymentTransactionOrder } = require("../../lib/payments");

const { savePaymentTransaction } = require("../../lib/payments")
const { accrualPointOnPurchase } = require('../../dao/RewardWallet')

// @desc  get all orders for the customer
// @route  GET /{baseSiteId}/users/{userId}/orders
router.get("/:baseSiteId/users/:userId/orders", ensureCustomerAuth, async (req, res) => {

  const customerId = req.params.userId;
  try {
    const customer = await getCustomerByUid(customerId);
    if (customer) {
      const orders = await getOrders(customer._id);
      console.log("Total orders:::", orders.length)
      if (!orders || orders == 0) {
        return res.status(401).json("No Order found!!!s");
      } else {
        return res.status(200).json(orders);
      }
    } else {
      return res.status(401).json("No Order found for customer!!!");
    }
  } catch (err) {
    console.error(err);
    return res.status(401).json("Error occurred while fetching order!!!");
  }
});

// @desc  display order detail by Id
// @route   GET /{baseSiteId}/orders/{code}
router.get("/:baseSiteId/orders/:code", async (req, res) => {
  try {

    const baseSiteId = req.params.baseSiteId;
    const baseSite = await getBaseSiteByCode(baseSiteId);
    const catalog = baseSite.productCatalog;
    const order = await getOrderById(req.params.code);
    console.log("order details::" + order);
    if (!order) {
      return res.status(401).json("Order Not found with id");
    } else {
      return res.status(200).json({
        orderDetails: order
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(401).json("Error occurred while fetching order :: 500");
  }
});


// @desc placeOrder for the customer and send order to the shiprocket
// @route   POST /{baseSiteId}/users/{userId}/placeorder
router.post("/:baseSiteId/users/:userId/placeorder1", ensureCustomerAuth,
  body('termsCheck').notEmpty().withMessage("Please select term & condition !!!"),
  body('paymentMode').notEmpty().withMessage("Payment Mode should have CASH/RAZORPAY"),

  async (req, res) => {

    // Validate incoming input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const baseSiteId = req.params.baseSiteId;
    const userId = req.params.userId;
    const customer = await getCustomerByUid(userId);
    const baseSite = await getBaseSiteByCode(baseSiteId);
    if (baseSite === null || customer === null) {
      return res.status(500).json({
        error: "Wrong customer & website !!!",
      });
    }

    try {

      //Get Current cart for the customer
      var cart = await getCartByOwner(customer._id);
      if (null === cart) {
        return res.status(400).json({ "status": "failure", "message": "Cart not found" });
      } else {
        const cartEntirs = cart.cartEntries;
        const catalog = baseSite.productCatalog;
        each(cartEntirs, async (entryObj) => {
          const entry = await getCartEntryById(entryObj);
          const product = await getProduct(entry.productCode, catalog)

          //check for product stock
          const enableStockCheck = properties.get("product.stock.check.enable");
          if (enableStockCheck) {
            var productStock = await getProductStock(product.code);
            if (productStock && 'forceInStock' !== productStock.inStockStatus && (productStock.availableQty <= entry.quantity)) {
              return res.status(200).json({ "error": 400, "message": "Product is out of stock", "product code": product.code });
            }
          }
        }, async function (err) {
          if (err) {
            console.log(err);
          }
        }); // End of Each loop for cartEntirs

        const orderDetail = await getOrderByPurchaseOrderNumber(cart.purchaseOrderNumber);
        if (!orderDetail) {

          //Validate paymentAddress, deliveryAddress deliveryMode, and payment details
          if (cart && cart.deliveryAddress && cart.deliveryMode) {
            //for starting a new transaction
            const session = await mongoose.startSession();
            let order = null;
            try {
              session.startTransaction();
              console.log('start all operations ::');
              //Get Generated Order Id

              let paymentResponse
              if (cart.paymentTransaction) {
                // payment transaction already exist...
                console.log('Payment details already exist with this card...!');
                paymentResponse = await getPaymentTransactionById(cart.paymentTransaction)
              } else {
                let paymentRequest;
                if (req.body.paymentMode == 'RAZORPAY' && (!req.body.paymentDetails || !req.body.paymentDetails.razorpayPaymentID)) {
                  return res.status(404).json({
                    error: 'razorpay PaymentID is must required'
                  })
                }
                if (req.body.paymentMode == 'RAZORPAY') {
                  paymentRequest = {
                    customer: customer,
                    cart: cart,
                    paymentMode: req.body.paymentMode,
                    razorpayPaymentID: req.body.paymentDetails.razorpayPaymentID,
                    razorpayOrderId: req.body.paymentDetails.razorpayOrderId,
                    razorpaySignature: req.body.paymentDetails.razorpaySignature,
                    isCanceledByUser: req.body.paymentDetails.isCanceledByUser,
                  }
                } else {
                  paymentRequest = {
                    customer: customer,
                    cart: cart,
                    paymentMode: req.body.paymentMode,
                  }
                }
                // creating new payment tranaction.
                paymentResponse = await savePaymentTransaction(paymentRequest)
              }
              // console.log('paymentTransaction : ', paymentResponse)
              if (paymentResponse) {
                const orderId = await generateNumber('order');
                const newOrder = {
                  owner: customer,
                  id: orderId,
                  purchaseOrderNumber: cart.purchaseOrderNumber,
                  baseSite: cart.baseSite,
                  paymentType: cart.paymentType,
                  totalTaxValue: cart.totalTaxValue,
                  totalDiscountValue: cart.totalDiscountValue,
                  deliveryAddress: cart.deliveryAddress,
                  paymentTransaction: paymentResponse,
                  paymentAddress: cart.paymentAddress,
                  deliveryMode: cart.deliveryMode,
                  totalPrice: cart.totalPrice,
                  currency: cart.currency,
                  deliveryCost: cart.deliveryCost,
                  isCalculated: true
                }

                //New Order is creating 
                order = await OrderModel.create(newOrder);
                //console.log('New Order is creating into DB :', order);

                //update payment Transaction owner as order 
                await updatePaymentTransactionOrder(paymentResponse._id, order)

                //create new Order Entries and update on new order
                var orderEntriesList = await createOrderEntry(res, cart, order, catalog);
                order.orderEntries = orderEntriesList;
                order.save(function (err) {
                  if (err) {
                    return res.status(404).json({
                      error: err
                    })
                  }
                });

                // Once order is created, the existing cart will get deleted
                await CartModel.remove({ _id: cart._id });
                console.log('The cart is deleted successfully !!! :', cart.purchaseOrderNumber);

                //committing all operations
                await session.commitTransaction();
                console.log('success : committing all operations');
              } else {
                return res.status(404).json({
                  error: 'Payment details has not created successfully'
                })
              }
            } catch (error) {
              console.error('error : while creating order::', error);

              console.log('error : rollback the operations');
              //for rollback the operations
              await session.abortTransaction();
              return res.status(404).json({
                error: error
              })
            } finally {
              session.endSession(); // End transaction
            }
          
            if (order) {
              console.log('Going for accrual the points....!!')
              accrualPointOnPurchase(customer, order);
            }

            //Preparing request for ShipRocket and placing order to shiprocket
            if (order) {
              placeOrderToShipRocket(order, catalog, cart);
            }
            
            return res.status(200).json({
              orderDetails: order,
            });
          } else {
            return res.status(500).json({
              error: "Please provide mandatory information like  paymentAddress, deliveryAddress deliveryMode, and payment details !!!",
            });
          }
        } else {
          return res.status(500).json({
            error: "Order is already created !!!",
          });
        }
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        error: err,
      });
    }

  }); //end of method    

//create new Order Entries
const createOrderEntry = async (res, cart, order, catalog) => {
  var orderEntriesList = [];
  const cartEntries = cart.cartEntries;
  // console.log("cartEntries found is :", cartEntries)
  for (const entryObj of cartEntries) {
    const entry = await getCartEntryById(entryObj);
    const product = await getProduct(entry.productCode, catalog)
    var productDetails = {
      title: product.title,
      code: product.code,
      description: product.description,
      type: product.productType,
      unit: product.unit,
      status: product.status
    };

    const newOrderEntry = {
      owner: order._id,
      entryNumber: entry.entryNumber,
      productCode: entry.productCode,
      quantity: entry.quantity,
      basePrice: entry.basePrice,
      unit: entry.unit,
      taxValues: entry.taxValues,
      discountValue: entry.discountValue,
      totalPrice: entry.totalPrice,
      //product : productDetails
    };

    //Save Order Entry  
    const orderEntry = await OrderEntryModel.create(newOrderEntry);
    if (orderEntry) {
      console.log("Order Entry Created successfully");
    }
    orderEntriesList.push(orderEntry);
  };
  //console.log("cartEntries populated is :", orderEntriesList)
  return orderEntriesList;
};

module.exports = router;