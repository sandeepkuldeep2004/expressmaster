var cron = require('node-cron');
const { getProducts } = require("./product");
const { createProductInSolr } = require("./indexer");
const { placeOrder } = require('../ship-rocket/ship-rocket-order')
// ┌────────────── second (optional)
// │ ┌──────────── minute
// │ │ ┌────────── hour
// │ │ │ ┌──────── day of month
// │ │ │ │ ┌────── month
// │ │ │ │ │ ┌──── day of week
// │ │ │ │ │ │
// │ │ │ │ │ │
// * * * * * *

var cronJob = cron.schedule('* * * 10 *', async () => {
  console.log(" starting indexing job......");
  const products = await getProducts();
  for (product of products) {
    createProductInSolr(product);
  };
}, { scheduled: false });

// Integration with Ship Rocket API
var syncOrderWithShipRocket = cron.schedule('* * * 10 *', async () => {
  console.log(" sync orders with ship rocket");
  const authToken = await placeOrder();
  console.log('Received Order Details:: ', authToken)
}, { scheduled: false });

//syncOrderWithShipRocket.start()

module.exports = { cronJob, syncOrderWithShipRocket }