const CustomerModel = require('../models/Customer');
const AddressModel = require("../models/Address");

// @desc fetch Currency by isocode
//@param {active}
const getCustomerByEmail = async function (email) {
  return CustomerModel.findOne({ email: email }).lean();
}

// @desc fetch all customers
const getCustomers = async () => {
  console.log("Searching all customers...")
  var customers = await CustomerModel.find().lean();
  console.log("Searching all customers", customers)
  return customers;
}

// @desc fetch all addresses
const getAddresses = async () => {
  console.log("Searching all addresses...")
  var addresses = await AddressModel.find().lean();
  console.log("Searching all addresses", addresses)
  return addresses;
}

// @desc fetch all addresses for current customer
const getAddressesForCustomer = async function (owner) {
  var addresses = await AddressModel.find({ owner: owner }).lean();
  //console.log("Searching all addresses for current customer...")
  return addresses;
}

// @desc fetch all addresses for current customer
const getAddressForCustomerByID = async function (id,owner) {
  var address = await AddressModel.findOne({ _id: id, owner: owner })
  .populate([
    {path:'region'},
    {path:'country'},
  ])
  .lean();
  //console.log("Searching all addresses for current customer...")
  return address;
}

// @desc get address detail by UId
const getAddressByUid = async function (uid) {
  const address = await AddressModel.findOne({ uid: uid }).lean();
  //console.log("get address detail by Id:::",address.uid);
  return address;
}

// @desc get address detail by Id
const getAddressById = async function (id) {
  const address = await AddressModel.findOne({ _id: id }).lean();
  // console.log("get address detail by Id:::",address._id);
  return address;
}
// @desc get customer detail by Id
const getCustomerById = async function (id) {
  const customer = CustomerModel.findOne({ _id: id }).lean();
  //console.log("get customer detail by Id:::",customer._id);
  return customer;
}

// @desc get customer detail by UId
const getCustomerByUid = async function (uid) {
  return CustomerModel.findOne({ uid: uid }).lean();
}

module.exports = {
  getCustomerByEmail, getCustomers, getAddresses, getAddressesForCustomer,
  getAddressById, getCustomerById, getCustomerByUid, getAddressByUid,
  getAddressForCustomerByID
}