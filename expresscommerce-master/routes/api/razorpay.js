const express = require('express')
const router = express.Router()
const { ensureTokenAuth, checkBaseSite } = require('../../middleware/auth')
const { getCustomerByUid } = require("../../lib/customer");
const { savePaymentTransaction } = require("../../lib/payments")
const { body, validationResult } = require('express-validator');

const { getCartByPurchaseOrderNumber } = require("../../lib/cart");

// @desc   save product into customer's wish list
// @route   GET /occ/v2/{baseSiteId}/customers/{customerId}/favourites
router.post('/:baseSiteId/razorpay/payment',
  ensureTokenAuth,
  checkBaseSite,
  body('paymentMode').notEmpty().withMessage("Payment Mode should have CASH/RAZORPAY"),
  body('cartId').notEmpty().withMessage("Cart ID must required"),
  body('razorpayOrderId').notEmpty().withMessage("Razorpay order id must required"),
  body('razorpayPaymentID').notEmpty().withMessage("Razorpay payment id must required"),
  async (req, res) => {
    /* Body 
        {
          "paymentMode":"RAZORPAY"
          "orderIdFromOrderAPI": "order_KI3Q9APe3R6r96",
          "cartId": "TXN100000277511",
          "customerID": "FA3000058000",
          "razorpayPaymentID": "pay_KI3RBhYbMbPA29",
          "razorpayOrderId": "order_KI3Q9APe3R6r96",
          "razorpaySignature": "cb270a7e90e9584bba00974dd12a67c4dd7e9ff0479f98e156b7da4eafcd2a66",
          "isCanceledByUser": false,
      }
      */
    // Validate incoming input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }
    let paymentResponse;
    try {
      const customerId = req.body.customerID;
      const cartId = req.body.cartId;
      const baseSiteId = req.params.baseSiteId;
      const customer = await getCustomerByUid(customerId);

      const cart = await getCartByPurchaseOrderNumber(cartId);
      if (null === cart) {
        return res.status(400).json({ "status": "failure", "error": 400, "message": "Cart not found", "purchaseOrderNumber": cartId });
      }

      let paymentRequest = {
        customer: customer,
        cart: cart,
        paymentMode:req.body.paymentMode,
        razorpayPaymentID: req.body.razorpayPaymentID,
        razorpayOrderId: req.body.razorpayOrderId,
        razorpaySignature: req.body.razorpaySignature,
        isCanceledByUser: req.body.isCanceledByUser,
      }

      if (cart.paymentTransaction) {
        // payment transaction already exist...
        return res.status(400).json({error:'Payment details already exist with this card...!'});
      } else {
        // creating new payment tranaction.
        paymentResponse = await savePaymentTransaction(paymentRequest)
      }

      return res.status(200).json(paymentResponse);

    } catch (err) {
      console.error(err)
      return res.status(500).json({
        error: err
      })
    }
  })

module.exports = router