const languageAPI = require('./language');
const authTokenAPI = require('./auth');
const productAPI = require('./product');
const currencyAPI = require('./currency');
const countryAPI = require('./country');
const catalogAPI = require('./catalogs');
const customersAPI = require('././customers');
const orderAPI = require('./orders');
const cartAPI = require('././cart');
const checkoutAPI = require('././checkout');
const categoryAPI = require('././category');
const favouriteAPI = require('././favourite');

module.exports = {
    paths: {
        ...authTokenAPI,
        ...productAPI,
        ...languageAPI,
        ...currencyAPI,
        ...countryAPI,
        ...catalogAPI,
        ...customersAPI,
        ...favouriteAPI,
        ...orderAPI,
        ...cartAPI,
        ...checkoutAPI,
        ...categoryAPI,
    },
};