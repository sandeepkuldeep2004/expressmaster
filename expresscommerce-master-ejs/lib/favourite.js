const FavouriteModel = require('../models/Favourite')

const { populateProduct } = require("./product");
// @desc    fetch Favourite by Id
//@param {active}
const getFavouriteById = async function (id) {
  return await FavouriteModel.findById(id).populate([
    { path: 'products' }
  ]).lean();
}
// @desc    fetch Favourite by Code
//@param {code}
const getFavouriteByCode = async function (code) {
  return await FavouriteModel.findOne({ code: code })
    .populate([
      { path: 'products' }
    ]).lean();
}

// @desc    fetch Favourite by Code and customer
//@param {code, customer}
const getFavouriteByCodeAndCustomer = async function (code, customer) {
  return await FavouriteModel.findOne({ code: code, customer: customer })
    .populate([
      { path: 'products' }
    ]).lean();
}


// @desc    fetch Favourite by Code and customer
//@param {code, customer}
const getFavouriteByNameAndCustomer = async function (name, customer) {
  return await FavouriteModel.findOne({ name: name, customer: customer })
    .populate([
      { path: 'products' }
    ]).lean();
}

// @desc    fetch Favourite list by  customer
//@param {customer}
const getFavouriteNamesByCustomer = async function (customer) {
  try {
    let wishlist = await FavouriteModel.find({ customer: customer })
      .lean();
    return await populateWishlistNames(wishlist);
  } catch (error) {

    return [];
  }
}
// @desc    fetch Favourite list by  customer
//@param {customer}
const getFavouriteByCustomer = async function (customer) {
  try {
    let wishlist = await FavouriteModel.find({ customer: customer })
      .populate([
        { path: 'products', populate:{path:'medias'} }
      ]).lean();
    return await populateWishlist(wishlist);
  } catch (error) {

    return [];
  }
}


async function populateWishlistNames(wishlist) {
  let wishlistDTO = [];
  for (wish of wishlist) {
    wishlistDTO.push(wish.name);
  }
  return wishlistDTO;
}

async function populateWishlist(wishlist) {
  let wishlistDTO = [];
  for (wish of wishlist) {
    let productDTOs = await populateProduct(wish.products);
    let wishDTO = {
      code: wish.code,
      name: wish.name,
      products: productDTOs
    };
    wishlistDTO.push(wishDTO);
  }
  return wishlistDTO;
}

// @desc    fetch Favourite list customer and product
//@param {customer, product}
const isProductAssocitedWithFavouriteList = async function (customer, product) {
  try {
    let wishlist = await FavouriteModel.find({ customer: customer, products: { $elemMatch: { _id: product } } }).lean();
    if (wishlist && wishlist.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Exception occured while checking product in wishlist :', error)
    return false;
  }
}


module.exports = {
  getFavouriteById, getFavouriteByCode, getFavouriteByCodeAndCustomer,
  getFavouriteByCustomer, isProductAssocitedWithFavouriteList, getFavouriteByNameAndCustomer,
  getFavouriteNamesByCustomer
}