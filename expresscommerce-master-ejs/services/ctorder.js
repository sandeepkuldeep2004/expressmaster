const { createRequestBuilder } = require('@commercetools/api-request-builder');
const { projectKey,getClient } = require('../config/ct_client');
const OrderModel = require('../models/Order');
const OrderEntryModel = require('../models/OrderEntry')

const simulatePagination = async (perPage, where) => getClient().execute({
  uri: createRequestBuilder({projectKey}).orders.parse({ 
      perPage: perPage,
})  
  .build(),
  method: 'GET'
});



var perPage = 500, lastPage = false, products =  null, lastId = null, where = null;

const getPagedOrderQueryResults = async _ => {
    
        where = `customerId is defined`;
        orders = await simulatePagination(perPage,where)
       return orders;
}
  
const getOrderById = (id) => 
  getClient().execute({
    uri: createRequestBuilder({projectKey}).orders.byId(id).build(),
    method: 'GET'
});


const getOrders = () => 
  getClient().execute({
    uri: createRequestBuilder({projectKey}).orders.build(),
    method: 'GET'
});


// @desc get order detail by purchaseOrderNumber
const getOrderViewById = async function (id) {
  let order = await OrderModel.findById(id).populate([
       
    { path: 'currency',model:'Currency', select: 'isocode name symbol', },
    { path: 'deliveryAddress',model:'Address', },
    { path: 'orderEntries',model:'OrderEntry',},
    { path: 'owner',model:'Customer' },
    { path: 'paymentTransaction',model:'PaymentTransaction' },
  ]).lean();
  // console.log("get order detail by Id", order)
  if (order) {
    return order;
  } else {
    return null;
  }
}

module.exports={
  getOrders,
  getOrderById,
  getPagedOrderQueryResults,
  getOrderViewById,

}