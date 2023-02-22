const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../../middleware/auth");

const mongoose=require('mongoose')

const { getOrders, getOrderById,getPagedOrderQueryResults } = require('../../lib/ctorder');
const { getCustomers, getCustomerById } = require('../../lib/ctuser');

const OrderModel=require('../../models/Order')
const CustomerModel=require('../../models/Customer')
var leftnavigationlinkactive = "orders";


// @desc    Show all orders
// @route   GET /orders
router.get("/orders/viewAll", async (req, res) => {
  try {
    const orders = await OrderModel.find({})
      .sort({ creationdate: "desc" })
      .lean();
console.log(orders)
    res.render("orders/list", {
      orders,
      csrfToken: req.csrfToken(),
      leftnavigationlinkactive
    });
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

// @desc    Show edit page
// @route   GET /orders/edit/:code
router.get("/order/:id", ensureAuth, async (req, res) => {
  try {
    const order = await OrderModel.findOne({
      id: req.params.id,
    }).lean();

    if (!order) {
      return res.render("error/404");
    }

    res.render("orders/edit", {
      order,
      csrfToken: req.csrfToken(),
      leftnavigationlinkactive,

    });
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
});

// @desc    Update Order
// @route   PUT /orders/:_id
router.put("/order/:id", ensureAuth, async (req, res) => {
  try {
    let order = await OrderModel.findById(req.params.id).lean();
    if (!order) {
      return res.render("error/404");
    }

    order = await OrderModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );

    res.redirect("/sync/orders/viewAll");
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
});

// @desc    Delete story
// @route   DELETE /orders/remove/:code
router.delete("/order/remove/:id", ensureAuth, async (req, res) => {
  try {
    console.log("delete query with param " + req.params.id);
    let order = await OrderModel.findById({ _id: req.params.id }).lean();
    if (!order) {
      return res.render("error/404");
    }

    await OrderModel.remove({ _id: req.params.id });
    res.redirect("/sync/orders/viewAll");
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
});

// ----------

const searchAndCreateOrderInMDB=async function(orderFetched){
  let order =await OrderModel.findOne({id:orderFetched.id})
  console.log(order)
  
  if (order) {
      console.log('order is already exist in DB :',order)
  } else {
    console.log("customer iD is",orderFetched.customerId)
    let ctCustomer= await getCustomerById(orderFetched.customerId)
    console.log("CT customer details",ctCustomer)
    const ct_customer=ctCustomer.body
    let customer =await CustomerModel.findOne({email:ct_customer.email,password: ct_customer.password})
if(customer){
  console.log('customer is already exist in DB :',customer)
}else{
  if(ct_customer){
  const newCustomer={
    id:ct_customer.id,
    key:ct_customer.key,
    name:ct_customer.firstName+" "+ct_customer.lastName,
    email:ct_customer.email,
    password: ct_customer.password,
  }
  
  customer= await CustomerModel.create(newCustomer)
        console.log('New customer is creating into  DB :',customer)
}else{
  console.log('Commerce customer is not exist !!!')
}
}
var MAX_UID = 1000000;
const orderNumber= (orderFetched.orderNumber)? orderFetched.orderNumber:(Math.random() * MAX_UID);
const deliveryCost=(orderFetched.shippingInfo && orderFetched.shippingInfo.price)?orderFetched.shippingInfo.price.centAmount:0;
const newOrder={
  owner:customer,
  id:orderFetched.id,
  key:orderFetched.key,
  purchaseOrderNumber:orderNumber,
  totalPrice: orderFetched.totalPrice.centAmount,
  currencyCode: orderFetched.totalPrice.currencyCode,
  deliveryCost:deliveryCost,
  isCalculated:true
}

      order= await OrderModel.create(newOrder)
      console.log('New Order is creating into  DB :',order)
  }
  console.log( order)
  return  order;
} 

//@desc Fetch Order by order id from CommerceTools
//@route GET /data/ct/order/<order_id>

router.get('/ct/order/:id', 
async (req, res) => {
  console.log(req.body);
var orderFetched = await getOrderById(req.params.id);
console.log( orderFetched)

try {
  let order = searchAndCreateOrderInMDB(orderFetched.body);
  res.redirect("/sync/orders/viewAll");
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }

});

//@desc Fetch all Orders from CommerceTools
//@route GET /data/ct/orders
router.get('/ct/orders', 
async (req, res) => {
  console.log(req.body);
//var orderFetched = await getOrders();
try {
var orderFetched = await getPagedOrderQueryResults();
//console.log(orderFetched)
orderFetched.body.results.forEach(element => {
//  console.log(element)
  //console.log(element.customerId)
  if(element.customerId){
    console.log(element)
  let order =  searchAndCreateOrderInMDB(element);
  }
  
});
res.redirect("/sync/orders/viewAll");
} catch (err) {
  console.error(err);
  return res.render("error/500");
}
});

module.exports = router;

