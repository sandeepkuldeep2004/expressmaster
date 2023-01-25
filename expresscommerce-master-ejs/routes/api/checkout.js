const mongoose = require('mongoose')
const express = require("express");
const router = express.Router();
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('properties/local.properties');
const { placeOrderToShipRocket } = require('../../ship-rocket/ship-rocket-order')

const { body, validationResult } = require('express-validator');
const AddressModel = require("../../models/Address");
const CartModel = require("../../models/Cart");
const OrderModel = require('../../models/Order');
const OrderEntryModel = require('../../models/OrderEntry');
const PaymentTransactionModel = require('../../models/PaymentTransaction');

const connectDB = require('../../config/db')

const { ensureTokenAuth, ensureCustomerAuth } = require("../../middleware/auth");
const { getProduct } = require("../../lib/product");
const { getProductStock } = require("../../lib/stocklevel");
const { getProductPrice } = require("../../lib/pricerow");
const { getBaseSiteByCode } = require("../../lib/basesite");
const { getCountryByIsocode, getCountryById } = require("../../lib/country");
const { getRegionByIsoCode, getRegionById } = require("../../lib/region");
const { getCustomerByEmail, getCustomers, getAddresses, getAddressesForCustomer, getAddressByUid, getAddressById, getCustomerById, getCustomerByUid } = require("../../lib/customer");
const { getCartById, getCartByOwner, getCartEntry, getCartEntryById, getCartByPurchaseOrderNumber } = require("../../lib/cart");
const { getOrderById, getOrderByPurchaseOrderNumber, getOrderEntryById } = require('../../lib/orderHistory');
const { getDeliveryModes, getDeliveryModeByCode } = require("../../lib/deliverymode");
const { generateNumber } = require("../../lib/numberseries");
const { getPaymentTransactionById, updatePaymentTransactionOrder } = require("../../lib/payments");
const each = require('async/each');


// @desc get deliveryAddresses for the customer
// @route   Get /{baseSiteId}/users/{userId}/carts/{cartId}/deliveryAddress
router.get("/:baseSiteId/users/:userId/carts/:cartId/deliveryAddress", ensureCustomerAuth, async (req, res) => {

    const baseSiteId = req.params.baseSiteId;
    const userId = req.params.userId;
    const cartId = req.params.cartId;
    const customer = await getCustomerByUid(userId);
    const baseSite = await getBaseSiteByCode(baseSiteId);
    if (cartId === null || baseSite === null || customer === null) {
        return res.status(500).json({
            error: "Invalid query string url !!!",
        });
    }

    //Get Current cart for the customer
    const cart = await getCartByPurchaseOrderNumber(cartId);
    if (null === cart) {
        return res.status(400).json({ "status": "failure", "message": "Cart not found", "purchaseOrderNumber": cartId });
    }

    //Get Address Book of the customer  
    const addresses = await getAddressesForCustomer(customer._id);
    console.log("Total addresses for the customer :::", addresses.length)

    try {
        //Get Details of Cart & Cart/Order Summary
        let cartEntriesList = [];
        const cartEntirs = cart.cartEntries;
        const catalog = baseSite.productCatalog;
        each(cartEntirs, async (entryObj) => {
            const entry = await getCartEntryById(entryObj);
            const product = await getProduct(entry.productCode, catalog)
            var productDetails = {
                name: product.title,
                description: product.description,
                type: product.productType,
            };

            entry.product = productDetails;

            cartEntriesList.push(entry);
        }, async function (err) {
            if (err) {
                console.log(err);
            } else {
                cart.cartEntries = cartEntriesList;
                return res.status(200).json({
                    AddressBook: addresses,
                    cardDetail: cart
                });
            }
        }); // End of Each loop

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err,
        });
    }
}); //end of method       


// @desc create deliveryAddress for checkout process
// @route   POST /:baseSiteId/users/:userId/carts/:cartId/address/delivery
router.post("/:baseSiteId/users/:userId/carts/:cartId/addresses/delivery", ensureCustomerAuth,
    body('email').isEmail().normalizeEmail().withMessage("Please entered correct email id !!!"),
    body('streetno').notEmpty().withMessage("Address Line1/Street no cannot be empty!!!"),
    body('streetname').notEmpty().withMessage("Street name cannot be empty!!!"),
    body('appartment').notEmpty().withMessage("Appartment cannot be empty!!!"),
    body('building').notEmpty().withMessage("Address Line2/Building cannot be empty!!!"),
    body('phone1').notEmpty().withMessage("Phone number cannot be empty!!!"),
    body('city').notEmpty().withMessage("Town/City cannot be empty!!!"),
    body('postalCode').notEmpty().withMessage("PostalCode cannot be empty!!!"),
    async (req, res) => {

        // Validate incoming input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        const baseSiteId = req.params.baseSiteId;
        const userId = req.params.userId;
        const cartId = req.params.cartId;

        const customer = await getCustomerByUid(userId);
        const baseSite = await getBaseSiteByCode(baseSiteId);
        if (cartId === null || baseSite === null || customer === null) {
            return res.status(500).json({
                error: "Invalid query string url !!!",
            });
        }

        //Get Current cart for the customer
        const cart = await getCartByPurchaseOrderNumber(cartId);
        if (null === cart) {
            return res.status(400).json({ "status": "failure", "message": "Cart not found", "purchaseOrderNumber": cartId });
        }

        const country = await getCountryByIsocode(req.body.countryIsoCode);
        const region = await getRegionByIsoCode(req.body.regionIsoCode);

        try {

            //get deliveryAddress which is updated on cart
            let address = null;
            if (cart.deliveryAddress) {
                const addressId = cart.deliveryAddress;
                const address = await getAddressById(addressId._id);
            }

            //Get Details of Cart & Cart/Order Summary
            let cartEntriesList = [];
            const cartEntirs = cart.cartEntries;
            const catalog = baseSite.productCatalog;
            each(cartEntirs, async (entryObj) => {
                const entry = await getCartEntryById(entryObj);
                const product = await getProduct(entry.productCode, catalog)
                var productDetails = {
                    name: product.title,
                    description: product.description,
                    type: product.productType,
                };

                entry.product = productDetails;

                cartEntriesList.push(entry);
            }, async function (err) {
                if (err) {
                    console.log(err);
                } else {
                    cart.cartEntries = cartEntriesList;

                    //Get Generated Address Id
                    const addressId = await generateNumber('address');

                    //update deliveryAddress on checkout step1
                    if (baseSite && customer && cart && country && region) {
                        if (!address) {
                            console.log("cart cardAdd :::")
                            const address = new AddressModel({
                                uid: addressId,
                                firstname: req.body.firstName,
                                lastname: req.body.lastName,
                                email: req.body.email,
                                phone1: req.body.phone1,
                                appartment: req.body.appartment,
                                building: req.body.building,
                                streetno: req.body.streetno,
                                streetname: req.body.streetname,
                                city: req.body.city,
                                postalCode: req.body.postalCode,
                                region: region,
                                country: country,
                                isShippingAddress: true,
                                owner: customer
                            });

                            //Save Address
                            address.save(function (err) {
                                if (err) {
                                    res.status(500).json({
                                        error: err,
                                    });
                                } else {
                                    deliveryAddressResponse(res, cart, address);
                                }
                            });
                        } else {
                            deliveryAddressResponse(res, cart, address);
                        } // End of Address Block
                    } else {
                        res.status(500).json({
                            error: "Invalid Payload to create deliveryAddress for cart",
                        });
                    }
                }
            }); // End of Each loop

        } catch (err) {
            console.error(err);
            res.status(500).json({
                error: err,
            });
        }
    }); //end of method

// @desc create select deliveryAddress for checkout process from address book
// @route   POST /:baseSiteId/users/:userId/carts/:cartId/deliveryAddress/select
router.post("/:baseSiteId/users/:userId/carts/:cartId/deliveryAddress/select", ensureCustomerAuth,
    body('uid').notEmpty().withMessage("Address Uid cannot be empty!!!"),
    async (req, res) => {

        // Validate incoming input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        const baseSiteId = req.params.baseSiteId;
        const userId = req.params.userId;
        const cartId = req.params.cartId;

        const customer = await getCustomerByUid(userId);
        const baseSite = await getBaseSiteByCode(baseSiteId);
        if (cartId === null || baseSite === null || customer === null) {
            return res.status(500).json({
                error: "Invalid query string url !!!",
            });
        }

        //Get Current cart for the customer
        const cart = await getCartByPurchaseOrderNumber(cartId);
        if (null === cart) {
            return res.status(400).json({ "status": "failure", "message": "Cart not found", "purchaseOrderNumber": cartId });
        }

        try {

            //get deliveryAddress which is updated on cart
            let address = null;
            if (cart.deliveryAddress) {
                const addressId = cart.deliveryAddress;
                const address = await getAddressById(addressId._id);
            }

            //Get Details of Cart & Cart/Order Summary
            let cartEntriesList = [];
            const cartEntirs = cart.cartEntries;
            const catalog = baseSite.productCatalog;
            each(cartEntirs, async (entryObj) => {
                const entry = await getCartEntryById(entryObj);
                const product = await getProduct(entry.productCode, catalog)
                var productDetails = {
                    name: product.title,
                    description: product.description,
                    type: product.productType,
                };

                entry.product = productDetails;

                cartEntriesList.push(entry);
            }, async function (err) {
                if (err) {
                    console.log(err);
                } else {
                    cart.cartEntries = cartEntriesList;

                    //Get Generated Address Id
                    const addressId = await generateNumber('address');

                    //update deliveryAddress on checkout step1
                    if (!address) {
                        address = await getAddressByUid(req.body.uid);
                        deliveryAddressResponse(res, cart, address);
                    } else {
                        deliveryAddressResponse(res, cart, address);
                    } // End of Address Block
                }
            }); // End of Each loop

        } catch (err) {
            console.error(err);
            res.status(500).json({
                error: err,
            });
        }
    }); //end of method


// @desc get all the delivery modes
// @route   Get /{baseSiteId}/users/{userId}/carts/{cartId}/delivery/modes
router.get("/:baseSiteId/users/:userId/carts/:cartId/delivery/modes", ensureCustomerAuth, async (req, res) => {

    const baseSiteId = req.params.baseSiteId;
    const userId = req.params.userId;
    const cartId = req.params.cartId;
    const customer = await getCustomerByUid(userId);
    const baseSite = await getBaseSiteByCode(baseSiteId);
    if (cartId === null || baseSite === null || customer === null) {
        return res.status(500).json({
            error: "Invalid query string url !!!",
        });
    }

    //Get Current cart for the customer
    const cart = await getCartByPurchaseOrderNumber(cartId);
    if (null === cart) {
        return res.status(400).json({ "status": "failure", "message": "Cart not found", "purchaseOrderNumber": cartId });
    }

    //console.log("Total Delivery Mode customer...", customer)
    //console.log("Total Delivery Mode baseSite...", baseSite)

    const deliveryModes = await getDeliveryModes();
    console.log("Total Delivery Mode ...", deliveryModes.length);

    try {

        const deliveryAddressId = cart.deliveryAddress;
        const deliveryAddress = await getAddressById(deliveryAddressId._id);

        //Get Details of Cart & Cart/Order Summary
        let cartEntriesList = [];
        const cartEntirs = cart.cartEntries;
        const catalog = baseSite.productCatalog;
        each(cartEntirs, async (entryObj) => {
            const entry = await getCartEntryById(entryObj);
            const product = await getProduct(entry.productCode, catalog)
            var productDetails = {
                name: product.title,
                description: product.description,
                type: product.productType,
            };

            entry.product = productDetails;

            cartEntriesList.push(entry);
        }, async function (err) {
            if (err) {
                console.log(err);
            } else {
                cart.cartEntries = cartEntriesList;
                return res.status(200).json({
                    DeliveryModes: deliveryModes,
                    DeliveryAddress: deliveryAddress,
                    CartDetails: cart
                });
            }
        }); // End of Each loop  
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err,
        });
    }
}); //end of method    


// @desc create deliveryMode for checkout process
// @route   POST /{baseSiteId}/users/{userId}/carts/{cartId}/deliverymode
router.post("/:baseSiteId/users/:userId/carts/:cartId/deliverymode", ensureCustomerAuth,
    body('deliveryMode').notEmpty().withMessage("Delivery Mode cannot be empty!!!"),
    async (req, res) => {

        // Validate incoming input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        const baseSiteId = req.params.baseSiteId;
        const userId = req.params.userId;
        const cartId = req.params.cartId;
        const customer = await getCustomerByUid(userId);
        const baseSite = await getBaseSiteByCode(baseSiteId);
        if (cartId === null || baseSite === null || customer === null) {
            return res.status(500).json({
                error: "Invalid query string url !!!",
            });
        }

        //Get Current cart for the customer
        const cart = await getCartByPurchaseOrderNumber(cartId);
        if (null === cart) {
            return res.status(400).json({ "status": "failure", "message": "Cart not found", "purchaseOrderNumber": cartId });
        }

        const deliveryModeCode = req.body.deliveryMode;
        try {
            //get delivery mode details
            const deliveryMode = await getDeliveryModeByCode(deliveryModeCode)
            console.log("deliveryMode Details:::", deliveryMode)
            if (customer && cart) {
                cart.deliveryMode = deliveryMode.name;
                cart.deliveryCost = deliveryMode.deliveryCost;
                CartModel.findOneAndUpdate({ "_id": cart._id }, cart, (err, obj) => {
                    if (err) {
                        res.status(404).json({
                            error: err
                        })
                    } else {
                        return res.status(201).json({
                            DeliveryMode: cart.deliveryMode,
                            cardDetail: cart
                        });
                    }
                })
            } else {
                return res.status(500).json({
                    error: "Invalid Payload to create deliveryMode",
                });
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                error: err,
            });
        }
    });


// @desc get all the payment details
// @route   Get /{baseSiteId}/users/{userId}/carts/{cartId}/payment/details
router.get("/:baseSiteId/users/:userId/carts/:cartId/payment/details", ensureCustomerAuth, async (req, res) => {

    const baseSiteId = req.params.baseSiteId;
    const userId = req.params.userId;
    const cartId = req.params.cartId;
    const customer = await getCustomerByUid(userId);
    const baseSite = await getBaseSiteByCode(baseSiteId);
    if (cartId === null || baseSite === null || customer === null) {
        return res.status(500).json({
            error: "Invalid query string url !!!",
        });
    }

    //Get Current cart for the customer
    const cart = await getCartByPurchaseOrderNumber(cartId);
    if (null === cart) {
        return res.status(400).json({ "status": "failure", "message": "Cart not found", "purchaseOrderNumber": cartId });
    }

    //console.log("Total Delivery Mode customer...", customer)
    //console.log("Total Delivery Mode baseSite...", baseSite)

    const deliveryAddressId = cart.deliveryAddress;
    const deliveryAddress = await getAddressById(deliveryAddressId._id);

    try {
        //Get Details of Cart & Cart/Order Summary
        let cartEntriesList = [];
        const cartEntirs = cart.cartEntries;
        const catalog = baseSite.productCatalog;
        each(cartEntirs, async (entryObj) => {
            const entry = await getCartEntryById(entryObj);
            const product = await getProduct(entry.productCode, catalog)
            var productDetails = {
                name: product.title,
                description: product.description,
                type: product.productType,
            };

            entry.product = productDetails;

            cartEntriesList.push(entry);
        }, async function (err) {
            if (err) {
                console.log(err);
            } else {
                cart.cartEntries = cartEntriesList;
                return res.status(200).json({
                    DeliveryAddress: deliveryAddress,
                    CartDetails: cart
                });
            }
        }); // End of Each loop  
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            error: err,
        });
    }
}); //end of method        

// @desc create paymentMethod and billingAddress for checkout process
// @route   POST /{baseSiteId}​/users​/{userId}​/carts​/{cartId}​/paymentdetails
router.post("/:baseSiteId/users/:userId/carts/:cartId/paymentdetails", ensureCustomerAuth,
    body('email').isEmail().normalizeEmail().withMessage("Please entered correct email id !!!"),
    body('streetno').notEmpty().withMessage("Address Line1/Street no cannot be empty!!!"),
    body('streetname').notEmpty().withMessage("Street name cannot be empty!!!"),
    body('appartment').notEmpty().withMessage("Appartment cannot be empty!!!"),
    body('building').notEmpty().withMessage("Address Line2/Building cannot be empty!!!"),
    body('phone1').notEmpty().withMessage("Phone number cannot be empty!!!"),
    body('city').notEmpty().withMessage("Town/City cannot be empty!!!"),
    body('postalCode').notEmpty().withMessage("PostalCode cannot be empty!!!"),
    async (req, res) => {

        // Validate incoming input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const baseSiteId = req.params.baseSiteId;
        const userId = req.params.userId;
        const cartId = req.params.cartId;
        const customer = await getCustomerByUid(userId);
        const baseSite = await getBaseSiteByCode(baseSiteId);
        if (cartId === null || baseSite === null || customer === null) {
            return res.status(500).json({
                error: "Invalid query string url !!!",
            });
        }

        //Get Current cart for the customer
        const cart = await getCartByPurchaseOrderNumber(cartId);
        if (null === cart) {
            return res.status(400).json({ "status": "failure", "message": "Cart not found", "purchaseOrderNumber": cartId });
        }

        const country = await getCountryByIsocode(req.body.countryIsoCode);
        const region = await getRegionByIsoCode(req.body.regionIsoCode);

        //Get Address Book of the customer  
        const addresses = await getAddressesForCustomer(customer._id);
        console.log("Total addresses for the customer :::", addresses.length)

        try {
            //get paymentAddress which is updated on cart
            let address = null;
            if (cart.paymentAddress) {
                const addressId = cart.paymentAddress;
                address = await getAddressById(addressId._id);
            }

            //Get Details of Cart & Cart/Order Summary
            let cartEntriesList = [];
            const cartEntirs = cart.cartEntries;
            const catalog = baseSite.productCatalog;
            each(cartEntirs, async (entryObj) => {
                const entry = await getCartEntryById(entryObj);
                const product = await getProduct(entry.productCode, catalog)
                var productDetails = {
                    name: product.title,
                    description: product.description,
                    type: product.productType,
                };

                entry.product = productDetails;

                cartEntriesList.push(entry);
            }, async function (err) {
                if (err) {
                    console.log(err);
                } else {
                    cart.cartEntries = cartEntriesList;

                    //Get Generated Address Id
                    const addressId = await generateNumber('address');

                    //update paymentAddress/billingAddress on checkout step1
                    if (baseSite && customer && cart && country && region) {
                        if (!address) {
                            console.log("cart cardAdd :::")
                            const address = new AddressModel({
                                uid: addressId,
                                firstname: req.body.firstName,
                                lastname: req.body.lastName,
                                email: req.body.email,
                                phone1: req.body.phone1,
                                appartment: req.body.appartment,
                                building: req.body.building,
                                streetno: req.body.streetno,
                                streetname: req.body.streetname,
                                city: req.body.city,
                                postalCode: req.body.postalCode,
                                region: region,
                                country: country,
                                isBillingAddress: true,
                                owner: customer
                            });

                            //Save Address
                            address.save(function (err) {
                                if (err) {
                                    res.status(500).json({
                                        error: err,
                                    });
                                } else {
                                    paymentAddressResponse(res, cart, address, addresses);
                                }
                            });
                        } else {
                            paymentAddressResponse(res, cart, address, addresses);
                        } // End of Address Block
                    } else {
                        res.status(500).json({
                            error: "Invalid Payload to create paymentAddress for cart",
                        });
                    }
                }
            }); // End of Each loop

        } catch (err) {
            console.error(err);
            res.status(500).json({
                error: err,
            });
        }
    }); //end of method


// @desc create paymentMethod and payment details for checkout process
// @route   POST /{baseSiteId}​/users​/{userId}​/carts​/{cartId}​/paymentdetails
router.post("/:baseSiteId/users/:userId/carts/:cartId/payment", ensureCustomerAuth,
    body('paymentMode').notEmpty().withMessage("Payment Method cannot be empty!!!"),
    async (req, res) => {

        // Validate incoming input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const baseSiteId = req.params.baseSiteId;
        const userId = req.params.userId;
        const cartId = req.params.cartId;
        const customer = await getCustomerByUid(userId);
        const baseSite = await getBaseSiteByCode(baseSiteId);
        if (cartId === null || baseSite === null || customer === null) {
            return res.status(500).json({
                error: "Invalid query string url !!!",
            });
        }

        try {
            //Get Current cart for the customer
            const cart = await getCartByPurchaseOrderNumber(cartId);
            if (null === cart) {
                return res.status(400).json({ "status": "failure", "message": "Cart not found", "purchaseOrderNumber": cartId });
            }
            let paymentMethod = req.body.paymentMode;
            let paymentTransaction = cart.paymentTransaction;
            if (paymentTransaction) {
                //update existing payment
                return res.status(200).json({ payment: paymentTransaction });

            } else {
                //Get Generated Address Id
                const paymentID = await generateNumber('paymentTransaction');

                //create new payment transaction
                let paymentTransactionModel = PaymentTransactionModel({
                    owner: cart,
                    paymentMethod: paymentMethod,
                    code: paymentID,
                    plannedAmount: cart.totalPrice,
                    currencyCode: 'INR',
                    comment: 'This is payment towards Cart ID:' + cart.purchaseOrderNumber,
                    versionID: 1,
                })

                paymentTransactionModel.save(function (err) {
                    if (err) {
                        return res.status(404).json({
                            error: err
                        })
                    }
                });

                cartParams = {
                    paymentTransaction: paymentTransactionModel,
                };

                // updated deliveryAddress on cart
                let updatedCard = updatedCart(cart, cartParams);
               // console.log(updatedCard)
                return res.status(200).json({ payment: paymentTransactionModel });
            }

        } catch (err) {
            console.error(err);
            res.status(500).json({
                error: err,
            });
        }
    }); //end of method


// @desc fetch paymentMethod and payment details for checkout process
// @route   GET /{baseSiteId}​/users​/{userId}​/carts​/{cartId}​/paymentdetails
router.get("/:baseSiteId/users/:userId/carts/:cartId/payment", ensureCustomerAuth,
    async (req, res) => {

        const baseSiteId = req.params.baseSiteId;
        const userId = req.params.userId;
        const cartId = req.params.cartId;
        const customer = await getCustomerByUid(userId);
        const baseSite = await getBaseSiteByCode(baseSiteId);
        if (cartId === null || baseSite === null || customer === null) {
            return res.status(500).json({
                error: "Invalid query string url !!!",
            });
        }

        try {
            //Get Current cart for the customer
            const cart = await getCartByPurchaseOrderNumber(cartId);
            if (null === cart) {
                return res.status(400).json({ "status": "failure", "message": "Cart not found", "purchaseOrderNumber": cartId });
            } else {
                return res.status(200).json({ payment: cart.paymentTransaction });
            }

        } catch (err) {
            console.error(err);
            res.status(500).json({
                error: err,
            });
        }
    }); //end of method


// @desc create summary or final review page for checkout process
// @route   Get /{baseSiteId}/users/{userId}/carts/{cartId}/summary
router.get("/:baseSiteId/users/:userId/carts/:cartId/summary", ensureCustomerAuth, async (req, res) => {

    const baseSiteId = req.params.baseSiteId;
    const userId = req.params.userId;
    const cartId = req.params.cartId;
    const customer = await getCustomerByUid(userId);
    const baseSite = await getBaseSiteByCode(baseSiteId);
    if (cartId === null || baseSite === null || customer === null) {
        return res.status(500).json({
            error: "Invalid query string url !!!",
        });
    }

    //Get Current cart for the customer
    const cart = await getCartByPurchaseOrderNumber(cartId);
    console.log(cart)
    if (null === cart) {
        return res.status(400).json({ "status": "failure", "message": "Cart not found", "purchaseOrderNumber": cartId });
    }

    try {
        //Get Details of Cart & Cart/Order Summary
        let cartEntriesList = [];
        const cartEntirs = cart.cartEntries;
        const catalog = baseSite.productCatalog;
        each(cartEntirs, async (entryObj) => {
            const entry = await getCartEntryById(entryObj);
            const product = await getProduct(entry.productCode, catalog)
            var productDetails = {
                name: product.title,
                description: product.description,
                type: product.productType,
            };

            entry.product = productDetails;

            cartEntriesList.push(entry);
        }, async function (err) {
            if (err) {
                console.log(err);
            } else {
                cart.cartEntries = cartEntriesList;

                //get paymentAddress and deliveryAddress from cart
                if (cart && cart.deliveryAddress) {
                    const paymentAddressId = cart.paymentAddress;
                    const deliveryAddressId = cart.deliveryAddress;
                    console.log("deliveryAddressId._id", deliveryAddressId._id);
                    const deliveryAddress = await getAddressById(deliveryAddressId._id);
                    res.status(200).json({
                        DeliveryAddress: deliveryAddress,
                        OrderSummary: cart
                    });
                } else {
                    res.status(500).json({
                        error: "Invalid Payload to get paymentAddress, DeliveryAddress and order summary for cart",
                    });
                }

            }
        }); // End of Each loop

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err,
        });
    }

}); //end of method


// @desc placeOrder for the customer and send order to the shiprocket
// @route   POST /{baseSiteId}/users/{userId}/placeorder
router.post("/:baseSiteId/users/:userId/placeorder", ensureCustomerAuth,
    body('termsCheck').notEmpty().withMessage("Please select term & condition !!!"),
    async (req, res) => {

        // Validate incoming input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const baseSiteId = req.params.baseSiteId;
        const userId = req.params.userId;
        const customer = await getCustomerByUid(userId);
        const baseSite = await getBaseSiteByCode(baseSiteId);
        if (baseSite === null || customer === null) {
            return res.status(500).json({
                error: "Wrong customer & website !!!",
            });
        }

        try {

            //Get Current cart for the customer
            var cart = await getCartByOwner(customer._id);
            if (null === cart) {
                return res.status(400).json({ "status": "failure", "message": "Cart not found" });
            } else {
                const cartEntirs = cart.cartEntries;
                const catalog = baseSite.productCatalog;
                each(cartEntirs, async (entryObj) => {
                    const entry = await getCartEntryById(entryObj);
                    const product = await getProduct(entry.productCode, catalog)

                    //check for product stock
                    const enableStockCheck = properties.get("product.stock.check.enable");
                    if (enableStockCheck) {
                        var productStock = await getProductStock(product.code);
                        if (productStock && 'forceInStock' !== productStock.inStockStatus && (productStock.availableQty <= entry.quantity)) {
                            return res.status(200).json({ "error": 400, "message": "Product is out of stock", "product code": product.code });
                        }
                    }
                }, async function (err) {
                    if (err) {
                        console.log(err);
                    }
                }); // End of Each loop for cartEntirs

                const orderDetail = await getOrderByPurchaseOrderNumber(cart.purchaseOrderNumber);
                if (!orderDetail) {

                    //Validate paymentAddress, deliveryAddress deliveryMode, and payment details
                    if (cart && cart.deliveryAddress && cart.deliveryMode) {
                        //for starting a new transaction
                        const session = await mongoose.startSession();
                        let order = null;
                        try {
                            session.startTransaction();
                            console.log('start all operations ::');
                            //Get Generated Order Id
                            const orderId = await generateNumber('order');
                            let paymentTransaction = await getPaymentTransactionById(cart.paymentTransaction)
                         //   console.log('paymentTransaction : ', paymentTransaction)
                            const newOrder = {
                                owner: customer,
                                id: orderId,
                                purchaseOrderNumber: cart.purchaseOrderNumber,
                                baseSite: cart.baseSite,
                                paymentType: cart.paymentType,
                                totalTaxValue: cart.totalTaxValue,
                                totalDiscountValue: cart.totalDiscountValue,
                                deliveryAddress: cart.deliveryAddress,
                                paymentTransaction: paymentTransaction,
                                paymentAddress: cart.paymentAddress,
                                deliveryMode: cart.deliveryMode,
                                totalPrice: cart.totalPrice,
                                currency: cart.currency,
                                deliveryCost: cart.deliveryCost,
                                isCalculated: true
                            }

                            //New Order is creating 
                            order = await OrderModel.create(newOrder);
                           // console.log('New Order is creating into DB :', order);
                            //update payment Transaction owner as order 
                            await updatePaymentTransactionOrder(paymentTransaction._id, order)

                            //create new Order Entries and update on new order
                            var orderEntriesList = await createOrderEntry(res, cart, order, catalog);
                            order.orderEntries = orderEntriesList;
                            order.save(function (err) {
                                if (err) {
                                    return res.status(404).json({
                                        error: err
                                    })
                                }
                            });

                            // Once order is created, the existing cart will get deleted
                            await CartModel.remove({ _id: cart._id });
                            console.log('The cart is deleted successfully !!! :', cart.purchaseOrderNumber);

                            //committing all operations
                            await session.commitTransaction();
                            console.log('success : committing all operations');

                        } catch (error) {
                            console.log('error : rollback the operations');
                            //for rollback the operations
                            await session.abortTransaction();
                            return res.status(404).json({
                                error: error
                            })
                        } finally {
                            session.endSession(); // End transaction
                        }

                        //Preparing request for ShipRocket and placing order to shiprocket
                        if (order) {
                            placeOrderToShipRocket(order, catalog, cart);
                        }
                        return res.status(200).json({
                            orderDetails: order,
                        });
                    } else {
                        return res.status(500).json({
                            error: "Please provide mandatory information like  paymentAddress, deliveryAddress deliveryMode, and payment details !!!",
                        });
                    }
                } else {
                    return res.status(500).json({
                        error: "Order is already created !!!",
                    });
                }
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                error: err,
            });
        }

    }); //end of method    

//Update Address on current cart
async function updatedCart(cart, cartParams) {
    const updatedCart = await CartModel.findByIdAndUpdate(cart._id, { $set: cartParams });
    // console.log("updatedCart",updatedCart)
    return updatedCart;
}

//Delivery Address response
async function deliveryAddressResponse(res, cart, address) {
    cart.deliveryAddress = address
    cartParams = {
        deliveryAddress: address,
    };

    // updated deliveryAddress on cart
    updatedCart(cart, cartParams);
    res.status(200).json({
        NewDeliveryAddress: address,
        cardDetail: cart
    });
}

//payment Address response
async function paymentAddressResponse(res, cart, address, addresses) {
    cart.paymentAddress = address
    cartParams = {
        paymentAddress: address,
    };

    // updated paymentAddress on cart
    updatedCart(cart, cartParams);

    //get deliveryAddress from cart
    const addressId = cart.deliveryAddress;
    const deliveryAddress = await getAddressById(addressId._id);
    res.status(200).json({
        PaymentAddress: address,
        DeliveryAddress: deliveryAddress,
        //AddressBook: addresses,
        cardDetail: cart
    });
}


//create new Order Entries
const createOrderEntry = async (res, cart, order, catalog) => {
    var orderEntriesList = [];
    const cartEntries = cart.cartEntries;
    for (const entryObj of cartEntries) {
        const entry = await getCartEntryById(entryObj);
        const product = await getProduct(entry.productCode, catalog)
        var productDetails = {
            title: product.title,
            code: product.code,
            description: product.description,
            type: product.productType,
            unit: product.unit,
            status: product.status
        };

        const newOrderEntry = {
            owner: order._id,
            entryNumber: entry.entryNumber,
            productCode: entry.productCode,
            quantity: entry.quantity,
            basePrice: entry.basePrice,
            unit: entry.unit,
            taxValues: entry.taxValues,
            discountValue: entry.discountValue,
            totalPrice: entry.totalPrice,
            //product : productDetails
        };

        //Save Order Entry  
        const orderEntry = await OrderEntryModel.create(newOrderEntry);
        if (orderEntry) {
            console.log("Order Entry Created successfully");
        }
        orderEntriesList.push(orderEntry);
    };
    return orderEntriesList;
};

module.exports = router;
