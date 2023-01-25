const FavouriteModel = require("../models/Favourite");

const { getProduct } = require("../lib/product");
const { getFavouriteByNameAndCustomer } = require("../lib/favourite");
const { generateNumber } = require("../lib/numberseries");
const { getBaseSiteByCode } = require("../lib/basesite");
module.exports = {
  saveProductInWishlist: async (baseSiteId, customer, productCode, name) => {
    console.log("Creating New Favourite Bucket for customer...!!!");
    let defaultWishList = await getFavouriteByNameAndCustomer(name, customer);
    const baseSiteModel = await getBaseSiteByCode(baseSiteId);
    let productModel = await getProduct(productCode, baseSiteModel.productCatalog);
    if (!productModel) {
      return { "errors": [{ "msg": "Wish list product " + productCode + " is not exist in database ", "param": "productCode", "location": "body" }] }
    }
    console.log("default WishList Found :", defaultWishList);
    if (defaultWishList) {
      // just add the product in wish list.
      let updatedWishlist = FavouriteModel.findOneAndUpdate(
        { name: name, customer: customer },
        {
          $addToSet: { products: productModel }
        },
        { new: true }
      );
      //   console.log('Successfully updated the Wishlist ', updatedWishlist);
      return updatedWishlist;
    } else {
      console.log("Creating new Favourite Model ... ")
      //  create new wishlist and add product.
      const favouriteId = await generateNumber('favourite');
      let favouriteModel = new FavouriteModel({
        code: favouriteId,
        name: name ? name : "First Wish List",
        customer: customer,
        products: [productModel],
        baseSite: baseSiteModel
      });
      let favourite = await favouriteModel.save();
      console.log('Successfully Create the Wishlist ', favourite);
      return favourite;
    }
  },
  removeProductFromWishlist: async (baseSiteId, customer, productCode, name) => {
    console.log("Removing product from Favourite Bucket for customer...!!!");
    let defaultWishList = await getFavouriteByNameAndCustomer(name, customer);
    const baseSiteModel = await getBaseSiteByCode(baseSiteId);
    let productModel = await getProduct(productCode, baseSiteModel.productCatalog);
    if (!productModel) {
      return { "errors": [{ "msg": "Wish list product " + productCode + " is not exist in database ", "param": "productCode", "location": "body" }] }
    }
    if (defaultWishList) {
      // removing product from wish list .
      let updatedWishlist = FavouriteModel.findOneAndUpdate(
        { name: name, customer: customer },
        {
          $pull: { products: productModel._id }
        },
        { new: true, safe: true }
      );
      console.log('Successfully removed product ', productCode, ' from the Wishlist ');
      return updatedWishlist;

    } else {
      console.log("No Wish list found for this customer !!! ")
      return null;
    }
  },
};
