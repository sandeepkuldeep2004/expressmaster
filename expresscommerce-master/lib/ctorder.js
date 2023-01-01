const { createRequestBuilder } = require('@commercetools/api-request-builder');
const { projectKey,getClient } = require('../config/ct_client');

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

module.exports={
  getOrders,
  getOrderById,
  getPagedOrderQueryResults

}