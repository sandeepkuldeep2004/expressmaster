var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('properties/local.properties');

const Razorpay = require('razorpay')

const RAZORPAY_KEY_ID = properties.get("RAZORPAY_KEY_ID");
const RAZORPAY_SECRET = properties.get("RAZORPAY_SECRET");
var instance = new Razorpay({ key_id: RAZORPAY_KEY_ID, key_secret: RAZORPAY_SECRET })

const fetchRazorpayPaymentDetails = async function (paymentId) {

    let payment = instance.payments.fetch(paymentId, { "expand[]": "card" });
    return payment
}

const captureRazorpayPayment = async function (paymentId, amount) {

    let payment =
        instance.payments.capture(paymentId, {
            amount: 10000,
            currency: "INR"
        })
    return payment
}

module.exports = {
    fetchRazorpayPaymentDetails, captureRazorpayPayment
}
