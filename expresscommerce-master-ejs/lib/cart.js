const CartModel = require('../models/Cart')
const CartEntryModel = require('../models/CartEntry')

// @desc    fetch cart by Id
//@param {active}
const getCartById = async function (id) {
  return await CartModel.findById(id);
}

const getCartByPurchaseOrderNumber = async function (purchaseOrderNumber) {
  return await CartModel.findOne({ purchaseOrderNumber: purchaseOrderNumber })
    .populate([
      { path: 'paymentTransaction' }
    ]).lean();
}

const getCartByOwner = async function (ownerId) {
  return await CartModel.findOne({ owner: ownerId }).lean();
}


//@param {active}
const getCartEntry = async function (cartId, productCode) {
  return await CartEntryModel.findOne({ owner: cartId, productCode: productCode }).lean();
}

const getCartEntryById = async function (Id) {
  return await CartEntryModel.findById(Id).lean();
}

const getCartEntryByCartAndEntrynumber = async function (cartId, entryNumber) {
  return await CartEntryModel.findOne({ owner: cartId, entryNumber: entryNumber }).lean();
}
module.exports = {
  getCartById, getCartByOwner, getCartEntry, getCartEntryById, getCartEntryByCartAndEntrynumber, getCartByPurchaseOrderNumber
}