const { select } = require('async');
const OrderModel = require('../models/Order');
const OrderEntryModel = require('../models/OrderEntry')
const { getProductByCode, getProductDTOByCode } = require('./product')
// @desc fetch current customer all the orders
const getOrders = async function (owner) {
  const orders = await OrderModel.find({ owner: owner })
    .populate([
      { path: 'owner' },
      { path: 'paymentTransaction' },
      { path: 'orderEntries', },
      { path: 'currency', select: 'symbol isocode -_id' },
      { path: 'deliveryAddress', },
      { path: 'paymentAddress', },
    ])
    .sort({ creationdate: "desc" })
    .lean();
  let orderList = []
  for (order of orders) {
    //let orderData = populateOrder(order)
    let orderData = await populateOrder(order);
    orderList.push(orderData)
  }
  // console.log("Searching all the orders for the customer",orders)
  return orderList;
}

// @desc get order detail by purchaseOrderNumber
const getOrderById = async function (id) {
  const order = await OrderModel.findOne({ id: id })
    .populate([
      { path: 'owner' },
      { path: 'paymentTransaction', populate: { path: 'razorPayOrderInfo', populate: { path: 'payments' } }, },
      { path: 'orderEntries', },
      { path: 'currency', select: 'symbol isocode -_id' },
      { path: 'deliveryAddress', },
      { path: 'paymentAddress', },
    ])
    .lean();
  // console.log("get order detail by Id", order)
  if (order) {
    return populateOrder(order);
  } else {
    return null;
  }
}

// @desc get order detail by id
const getOrderByPurchaseOrderNumber = async function (purchaseOrderNumber) {
  const order = OrderModel.findOne({ purchaseOrderNumber: purchaseOrderNumber }).lean();
  //  console.log("get order detail by Id", order)
  return order;
}

// @desc get order detail by id
const getOrderByAddressId = async function (addressId) {
  const orders = OrderModel.find({ deliveryAddress: addressId }).lean();
  //  console.log("get order detail by Id", order)
  return orders;
}

// @desc get order entry by Id
const getOrderEntryById = async function (id) {
  const entries = await OrderEntryModel.findOne({ _id: id }).lean();
  //console.log("get order detail by Id",orderEntries._id);
  return entries;
}

module.exports = {
  getOrders, getOrderById, getOrderEntryById, getOrderByPurchaseOrderNumber, getOrderByAddressId
}

async function populateOrder(order) {
  let entries = [];
  for (entry of order.orderEntries) {
    //console.log('Order entry Model::', entry)
    let product = await getProductDTOByCode(entry.productCode)
    let orderEntryData = {
      entryNumber: entry.entryNumber,
      productCode: entry.productCode,
      quantity: entry.quantity,
      product: product,
      basePrice: entry.basePrice.toString(),
      taxValues: entry.taxValues.toString(),
      discountValue: entry.discountValue.toString(),
      totalPrice: entry.totalPrice.toString()
    };
    //console.log('Order entry Data::', orderEntryData)

    entries.push(orderEntryData);
  }
  //console.log('Order entry Datas::', entries)
  let paymentDetails = populatePaymentDetails(order);

  let orderData = {
    email: order.owner.email,
    id: order.id,
    cartId: order.purchaseOrderNumber,
    deliveryMode: order.deliveryMode,
    omsOrderId: order.omsOrderId,
    omsShipmentId: order.omsShipmentId,
    omsStatus: order.omsStatus,
    awbCode: order.awbCode,
    deliveryAddress: order.deliveryAddress,
    totalPrice: order.totalPrice.toString(),
    currency: order.currency,
    deliveryCost: order.deliveryCost.toString(),
    totalDiscountValue: order.totalDiscountValue.toString(),
    totalTaxValue: order.totalTaxValue.toString(),
    paymentMethod: order.paymentTransaction ? order.paymentTransaction.paymentMethod : '',
    paymentDetails: paymentDetails,
    paymentAddress: order.paymentAddress,
    entries: entries,
    creationdate: order.creationdate
  };
  return orderData;
}
function populatePaymentDetails(order) {
  let paymentDetails;
  if (order.paymentTransaction) {
    let razorpayDetails;
    if (order.paymentTransaction.isRazorpay && order.paymentTransaction.razorPayOrderInfo) {
      let razorpayOrderModel = order.paymentTransaction.razorPayOrderInfo;
      let razorpayPaymentDetailsModel;
      let razorpayPaymentDTO;
      if (razorpayOrderModel.payments && razorpayOrderModel.payments.length > 0) {
        razorpayPaymentDetailsModel = razorpayOrderModel.payments.shift()
        razorpayPaymentDTO = {
          paymentId: razorpayPaymentDetailsModel.paymentId,
          method: razorpayPaymentDetailsModel.method,
          captured: razorpayPaymentDetailsModel.captured,
        }
      }
      razorpayDetails = {
        orderId: razorpayOrderModel.orderId,
        amountPaid: razorpayOrderModel.amountPaid.toString(),
        amountDue: razorpayOrderModel.amountDue.toString(),
        status: razorpayOrderModel.status,
        payments: razorpayPaymentDTO,
      };
    }
    paymentDetails = {
      paymentMethod: order.paymentTransaction.paymentMethod,
      paymentId: order.paymentTransaction.code,
      status: order.paymentTransaction.status,
      plannedAmount: order.paymentTransaction.plannedAmount.toString(),
      isCashOnDelivery: order.paymentTransaction.isCashOnDelivery,
      isRazorpay: order.paymentTransaction.isRazorpay,
      creationdate: order.paymentTransaction.creationdate,
      razorpayDetails: razorpayDetails,
    };
  }
  return paymentDetails;
}

