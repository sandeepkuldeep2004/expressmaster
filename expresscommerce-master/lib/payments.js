const { response } = require('express');
const PaymentTransactionModel = require('../models/PaymentTransaction')
const CartModel = require("../models/Cart");
const PaymentTransactionEntryModel = require('../models/PaymentTransactionEntry')
const RazorPayOrderInfoModel = require('../models/RazorPayOrderInfo')
const RazorPayPaymentInfoModel = require('../models/RazorPayPaymentInfo')

const { fetchRazorpayPaymentDetails, captureRazorpayPayment } = require('../razorpay/payment')
const { generateNumber } = require("../lib/numberseries");
// @desc    fetch PaymentTransaction by Id
//@param {_id}
const getPaymentTransactionById = async function (id) {
  return await PaymentTransactionModel.findById(id)
    .populate([
      { path: 'entries' }
    ]).lean();
}

// @desc    fetch PaymentTransactionEntry by Id
//@param {_id}
const getPaymentTransactionEntryById = async function (id) {
  return await PaymentTransactionEntryModel.findById(id)
    .populate([
      { path: 'paymentTransaction' }
    ])
    .lean();
}


// @desc    fetch PaymentTransaction by code
//@param {code}
const getPaymentTransactionByCode = async function (code) {
  return await PaymentTransactionModel.findOne({ code: code })
    .populate([
      { path: 'entries' }
    ])
    .lean();
}

// @desc    fetch PaymentTransactionEntry by code
//@param {code}
const getPaymentTransactionEntryByCode = async function (code) {
  return await PaymentTransactionEntryModel.findOne({ code: code })
    .populate([
      { path: 'paymentTransaction' }
    ])
    .lean();
}
// @desc    fetch PaymentTransaction by owner
//@param {ownerId}
const getPaymentTransactionByOwner = async function (order) {
  return await PaymentTransactionModel.find({ referenceOrder: order })
    .populate([
      { path: 'entries' }
    ])
    .lean();
}

// @desc    fetch PaymentTransactionEntry by PaymentTransaction
//@param {ownerId}
const getPaymentTransactionEntryByTransaction = async function (paymentTransaction) {
  return await PaymentTransactionEntryModel.find({ paymentTransaction: paymentTransaction })
    .populate([
      { path: 'paymentTransaction' }
    ])
    .lean();
}

const updatePaymentTransactionOrder = async function (id, order) {
  let payment = PaymentTransactionModel.findByIdAndUpdate(id,
    {
      $set: { owner: order, referenceOrder: order }
    },
  )
  return payment;
}

const savePaymentTransaction = async function (paymentRequest) {
  //console.log('savePaymentTransaction(paymentRequest) =>', paymentRequest);
  if (paymentRequest.paymentMode == 'RAZORPAY') {
    let razorpayResponse = await fetchRazorpayPaymentDetails(paymentRequest.razorpayPaymentID)
    //console.log('razorpay call response: ', razorpayResponse)
    //Get Generated Addgress Id
    let response = await createRazorpayPaymentTransaction(paymentRequest, razorpayResponse);
    //console.log('razorpay response: ', response)

    return response;
  } else if (paymentRequest.paymentMode == 'CASH') {
    let response = await createCashPaymentTransaction(paymentRequest);
    console.log('cash payment response: ', response)
    return response;
  } else {
    return { error: 'wrong payment Mode passed' }
  }
}
module.exports = {
  getPaymentTransactionById, getPaymentTransactionEntryById, getPaymentTransactionByCode,
  getPaymentTransactionEntryByCode, getPaymentTransactionByOwner, getPaymentTransactionEntryByTransaction,
  updatePaymentTransactionOrder, savePaymentTransaction
}

async function createRazorpayPaymentTransaction(paymentRequest, razorpayResponse) {
  try {

    if (!paymentRequest.cart.paymentTransaction) {
      // generate payment ID by number generator
      const paymentID = await generateNumber('paymentTransaction');

      // get status
      let paymentStatus = 'CREATED';
      if (razorpayResponse.status == 'captured') {
        paymentStatus = "PAID";
      } else
        if (razorpayResponse.status == 'refunded') {
          paymentStatus = "REFUNDED";
        } else
          if (razorpayResponse.status == 'failed') {
            paymentStatus = "FAILED";
          }
      //create new payment transaction
      let paymentTransactionModel = PaymentTransactionModel({
        owner: paymentRequest.cart,
        paymentMethod: paymentRequest.paymentMode,
        code: paymentID,
        isCashOnDelivery: false,
        isRazorpay: true,
        plannedAmount: paymentRequest.cart.totalPrice,
        currencyCode: 'INR',
        comment: 'This is payment towards Cart ID:' + paymentRequest.cart.purchaseOrderNumber,
        versionID: 1,
        status: paymentStatus,
      });
      console.log('paymentTransactionModel before', paymentTransactionModel)

      // save payment transaction 
      await paymentTransactionModel.save(function (err) {
        if (err) {
          return {
            error: err
          };
        }
      });

      // populate razorpay order and payment info in model
      let razorPayOrderInfoModel = await populateRazorPayInfo(paymentTransactionModel, razorpayResponse)

      paymentParams = {
        razorPayOrderInfo: razorPayOrderInfoModel,
      }
      // update razorpay order details in payment transaction
      await updatedPaymentTransaction(paymentTransactionModel, paymentParams);

      cartParams = {
        paymentTransaction: paymentTransactionModel,
      };
      // updated paymentDetails in cart
      await updatedCart(paymentRequest.cart, cartParams);

      return paymentTransactionModel;
    } else {
      return { error: 'payment transaction already exist...!!' }
    }
  } catch (error) {
    console.log('Exception occured while creating paymentTransactionModel and error is: ', error)
    return null;
  }
}


async function createCashPaymentTransaction(paymentRequest) {
  try {

    if (!paymentRequest.cart.paymentTransaction) {
      // generate payment ID by number generator
      const paymentID = await generateNumber('paymentTransaction');

      // get status
      let paymentStatus = 'CREATED';
      //create new payment transaction
      let paymentTransactionModel = PaymentTransactionModel({
        owner: paymentRequest.cart,
        paymentMethod: paymentRequest.paymentMode,
        code: paymentID,
        isCashOnDelivery: true,
        isRazorpay: false,
        plannedAmount: paymentRequest.cart.totalPrice,
        currencyCode: 'INR',
        comment: 'This is payment towards Cart ID:' + paymentRequest.cart.purchaseOrderNumber,
        versionID: 1,
        status: paymentStatus,
      });
      // save payment transaction 
      await paymentTransactionModel.save(function (err) {
        if (err) {
          return {
            error: err
          };
        }
      });

      cartParams = {
        paymentTransaction: paymentTransactionModel,
      };
      // updated deliveryAddress on cart
      let updatedCard = await updatedCart(paymentRequest.cart, cartParams);
      console.log(updatedCard);

      return paymentTransactionModel;
    }
  } catch (error) {
    console.log('Exception occured while creating paymentTransactionModel for CASH and error is: ', error)
    return null;
  }
}
//Update Address on current cart
async function updatedCart(cart, cartParams) {
  console.log('cart._id is:',cart._id)
  const updatedCart = await CartModel.findByIdAndUpdate(cart._id,
    { $set: cartParams },
    { new: true });
   console.log("updatedCart",updatedCart)
  return updatedCart;
}

//Update Address on current cart
async function updatedPaymentTransaction(paymentTransaction, params) {
  console.log('paymentTransaction._id is:',paymentTransaction._id)
  const updatedPaymentTransaction = await PaymentTransactionModel.findByIdAndUpdate(paymentTransaction._id,
    { $set: params },
    { new: true });
   console.log("updatedPaymentTransaction : ",updatedPaymentTransaction)
  return updatedPaymentTransaction;
}

async function populateRazorPayInfo(paymentTransactionModel, razorpayResponse) {
  try {

    let razorPayPaymentInfoModel = await populateRazorPayPaymentInfo(paymentTransactionModel, razorpayResponse);
    let razorPayOrderInfoModel = RazorPayOrderInfoModel({
      paymentTransaction: paymentTransactionModel,
      orderId: razorpayResponse.order_id,
      amountPaid: razorpayResponse.amount,
      amountDue: 0,
      amount: razorpayResponse.amount,
      currency: razorpayResponse.currency,
      status: razorpayResponse.status,
      payments: [razorPayPaymentInfoModel]
    })
    // save payment transaction 
    await razorPayOrderInfoModel.save(function (err) {
      if (err) {
        return {
          error: err
        };
      }
    });
    console.log('razorPayOrderInfoModel :', razorPayOrderInfoModel)
    return razorPayOrderInfoModel;
  } catch (error) {
    console.log('Exception occured while creating razorPayOrderInfoModel and error is: ', error)
    return null;
  }
}

async function populateRazorPayPaymentInfo(paymentTransactionModel, razorpayResponse) {
  try {

    let razorPayPaymentInfoModel = RazorPayPaymentInfoModel({
      paymentTransaction: paymentTransactionModel,
      paymentId: razorpayResponse.id,
      amount: razorpayResponse.amount,
      currency: razorpayResponse.currency,
      status: razorpayResponse.status,
      paymentOrderId: razorpayResponse.order_id,
      method: razorpayResponse.method,
      amountRefunded: razorpayResponse.amount_refunded,
      captured: razorpayResponse.captured,
      description: razorpayResponse.description,
      cardId: razorpayResponse.card_id,
      card: razorpayResponse.card,
      bank: razorpayResponse.bank,
      wallet: razorpayResponse.wallet,
      vpa: razorpayResponse.vpa,
      email: razorpayResponse.email,
      contact: razorpayResponse.contact,
      fee: razorpayResponse.fee,
      tax: razorpayResponse.tax,
      error_code: razorpayResponse.error_code,
      error_description: razorpayResponse.error_description,
      error_source: razorpayResponse.error_source,
      error_step: razorpayResponse.error_step,
      error_reason: razorpayResponse.error_reason,
      //createdAt:razorpayResponse.created_at
    })
    // save payment transaction 
    await razorPayPaymentInfoModel.save(function (err) {
      if (err) {
        return {
          error: err
        };
      }
    });
    console.log("razorPayPaymentInfoModel :", razorPayPaymentInfoModel)
    return razorPayPaymentInfoModel;
  } catch (error) {
    console.log('Exception occured while creating razorPayPaymentInfoModel and error is: ', error)
    return null;
  }
}
