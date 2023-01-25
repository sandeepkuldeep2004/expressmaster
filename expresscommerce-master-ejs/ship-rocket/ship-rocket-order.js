var axios = require('axios');
const { auth, shipRocketUrl } = require('./ship-rocket-auth')
const { getCountryById } = require("../lib/country");
const { getRegionById } = require("../lib/region");
const { getOrderEntryById } = require('../lib/orderHistory');
const { getProduct } = require("../lib/product");
const { getAddressById } = require("../lib/customer");
const OrderModel = require('../models/Order');
var data = JSON.stringify({
    "order_id": "TXN224-544",
    "order_date": "2022-08-09 15:00",
    "pickup_location": "Primary",
    "channel_id": "",
    "comment": "Reseller: M/s Goku",
    "billing_customer_name": "Naruto",
    "billing_last_name": "Uzumaki",
    "billing_address": "Tower B, 7th Floor, Building 10, DLF Cyber City, DLF Phase 2, Sector 24",
    "billing_address_2": "Near Hokage House",
    "billing_city": "Gurugram",
    "billing_pincode": "122022",
    "billing_state": "Haryana",
    "billing_country": "India",
    "billing_email": "shivrajchoudhary2506@gmail.com",
    "billing_phone": "9999215676",
    "shipping_is_billing": true,
    "shipping_customer_name": "",
    "shipping_last_name": "",
    "shipping_address": "",
    "shipping_address_2": "",
    "shipping_city": "",
    "shipping_pincode": "",
    "shipping_country": "",
    "shipping_state": "",
    "shipping_email": "",
    "shipping_phone": "",
    "order_items": [
        {
            "name": "Kunai",
            "sku": "chakra123",
            "units": 10,
            "selling_price": "900",
            "discount": "",
            "tax": "",
            "hsn": 441122
        }
    ],
    "payment_method": "Prepaid",
    "shipping_charges": 0,
    "giftwrap_charges": 0,
    "transaction_charges": 0,
    "total_discount": 0,
    "sub_total": 9000,
    "length": 10,
    "breadth": 15,
    "height": 20,
    "weight": 2.5
});


const placeOrder = async () => {
    var authToken = await auth()
    // console.log('authToken', authToken);
    var config = {
        method: 'post',
        url: shipRocketUrl + '/v1/external/orders/create/adhoc',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken.token
        },
        data: data
    };
    //console.log("Order request:: ", config);

    var response = await axios(config);
    //console.log(JSON.stringify(response.data));
    return response.data
}

//Sending Xpress Commerce order to the Ship Rocket
const shipRocketPlaceOrder = async (request) => {
    var authToken = await auth()
    //console.log('authToken',authToken);
    var config = {
        method: 'post',
        url: shipRocketUrl + '/v1/external/orders/create/adhoc',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken.token
        },
        data: request
    };
    // console.log("Order request:: ", config);

    try {
        var response = await axios(config);
        // console.log(JSON.stringify(response.data));
        return response.data
    } catch (err) {
        console.log("Error occurred while getting response::", err.response);
    }
}


//Preparing shipRocket request for Order
async function shipRocketRequest(order, deliveryAddress, paymentAddress, catalog) {
    var orderEntriesList = await collectionEntries(order, catalog);
    const country = await getCountryById(deliveryAddress.country);
    const state = await getRegionById(deliveryAddress.region);
    //console.log("country",country)
    // console.log("state",state)
    var data = JSON.stringify({
        "order_id": order.id,
        "order_date": new Date(),
        "pickup_location": "Primary",
        "channel_id": "Desktop",
        "comment": "Reseller: Xpress Commerce",
        "billing_customer_name": paymentAddress.firstname,
        "billing_last_name": paymentAddress.lastname,
        "billing_address": paymentAddress.streetno,
        "billing_address_2": paymentAddress.streetname,
        "billing_city": paymentAddress.city,
        "billing_pincode": paymentAddress.postalCode,
        "billing_state": state ? state.name : 'Rajasthan',
        "billing_country": country ? country.name : 'India',
        "billing_email": paymentAddress.email,
        "billing_phone": paymentAddress.phone1,
        "shipping_is_billing": true,
        "shipping_customer_name": deliveryAddress.firstname,
        "shipping_last_name": deliveryAddress.lastname,
        "shipping_address": deliveryAddress.streetno,
        "shipping_address_2": deliveryAddress.streetname,
        "shipping_city": deliveryAddress.city,
        "shipping_pincode": deliveryAddress.postalCode,
        "shipping_country": country ? country.name : 'India',
        "shipping_state": state ? state.name : 'Rajasthan',
        "shipping_email": deliveryAddress.email,
        "shipping_phone": deliveryAddress.phone1,
        "order_items": orderEntriesList,
        "payment_method": "Visa Card",
        "shipping_charges": order.deliveryCost.toString(),
        "giftwrap_charges": 0,
        "transaction_charges": 0,
        "total_discount": order.totalDiscountValue.toString(),
        "sub_total": order.totalPrice.toString(),
        "length": 10,
        "breadth": 15,
        "height": 20,
        "weight": 2.5

    });

    return data;
}

//Preparing shipRocket request for OrderEntries
const collectionEntries = async (order, catalog) => {
    var orderEntriesList = [];
    const orderEntries = order.orderEntries;
    for (const entryObj of orderEntries) {
        const entry = await getOrderEntryById(entryObj);
        const product = await getProduct(entry.productCode, catalog)
        var productDetails = {
            name: product.title,
            sku: product.code,
            description: product.description,
            selling_price: entry.basePrice.toString(),
            //  hsn: product.code,
            units: entry.quantity,
            tax: entry.taxValues.toString(),
            total: entry.totalPrice.toString()
        };

        orderEntriesList.push(productDetails);
    };
    return orderEntriesList;
};

//call ShipRocket API to place Xpress commerce Order 
const placeOrderToShipRocket = async (order, catalog, cart) => {
    // const paymentAddressId = cart.paymentAddress;
    const deliveryAddressId = cart.deliveryAddress;
    const paymentAddressId = cart.deliveryAddress;
    try {
        const deliveryAddress = await getAddressById(deliveryAddressId._id);
        // const paymentAddress = await getAddressById(paymentAddressId._id);

        //Preparing request for shiprocket
        const request = await shipRocketRequest(order, deliveryAddress, deliveryAddress, catalog);
        // console.log('Ship Rocket Request ::', request);

        //sending order to shiprocket

        const shipRocketOrderRes = await shipRocketPlaceOrder(request);
        // console.log('Received ShipRocket Order Details Response:: ', shipRocketOrderRes);

        if (shipRocketOrderRes) {
            // Update ShipRocket Order Response to the order model

            OrderModel.findByIdAndUpdate(order._id,
                {
                    $set: {
                        omsOrderId: shipRocketOrderRes.order_id,
                        omsShipmentId: shipRocketOrderRes.shipment_id,
                        courierCompanyId: shipRocketOrderRes.courier_company_id,
                        courierName: shipRocketOrderRes.courier_name,
                        awbCode: shipRocketOrderRes.awb_code,
                        omsStatus: shipRocketOrderRes.status,
                    }
                },
                (err, obj) => {
                    if (err) {
                        console.error("Error received while updating order with ship rocket details ::", err)
                    } else {
                        console.log("Order details updated with ship rocket details successfully")
                    }
                })
        } else {
            console.error("Error received while send order to shiprocket")
        }
    } catch (err) {
        console.error("Error cought while send order to shiprocket::", err)
    }
}

module.exports = { placeOrder, shipRocketPlaceOrder, placeOrderToShipRocket }