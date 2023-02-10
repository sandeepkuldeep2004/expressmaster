const { createRequestBuilder } = require('@commercetools/api-request-builder');
const { projectKey,getClient } = require('../config/ct_client');

const getCustomerById = (id) => 
getClient().execute({
  uri: createRequestBuilder({projectKey}).customers.byId(id).build(),
  method: 'GET'
});


const getCustomers = () => 
getClient().execute({
  uri: createRequestBuilder({projectKey}).customers.build(),
  method: 'GET'
});

module.exports={
  getCustomers,
  getCustomerById
}