const express = require("express");
const router = express.Router();

const { ensureCustomerAuth  } = require("../../middleware/auth");
const { getCustomerByEmail,getAddressesForCustomer, getCustomers, getCustomerByUid, getCustomerById } = require("../../lib/customer");
const { getOrders, getOrderById, getOrderByPurchaseOrderNumber} = require('../../lib/orderHistory');

// @desc   get all account information about the customer
// @route   GET /{baseSiteId}/users/{userId}
router.get("/:baseSiteId/users/:userId/myAccount", ensureCustomerAuth, async (req, res) => {
    try {
      const customerId = req.params.userId;
        if(customerId){
            console.log("current customer email on my account :::",customerId)
                
            //Get Customer Personal Details  
            const customer = await getCustomerByUid(customerId);

            //Get Address Book of the customer  
            const addresses = await getAddressesForCustomer(customer._id);
            console.log("Total addresses for the customer :::",addresses.length)

            // Get Order History of the customer
            const orders = await getOrders(customer._id);
            console.log("Total orders for the customer :::",orders.length)

            // Get Payment Details of the customer
            return res.status(200).json({
                Customer:customer,
                Addresses: addresses,
                Orders: orders.length > 0 ? orders : 'No Order found for the customer',
                PaymentDetails:'No Payment Details found for the customer'
            });
        } else{
            return res.status(200).json("Please login/register to get customer information !!!");
        } 
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: err,
      });
    }
  });
  
  module.exports = router;
  
