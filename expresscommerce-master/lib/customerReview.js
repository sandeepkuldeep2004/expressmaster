const CustomerReviewModel = require('../models/CustomerReview')
const { getLanguageByIsoCode } = require("./language");

// @desc    fetch all review based on product code
//@param {active}
const getProductReviews = async function (product, language) {
  let defaultLanguage = language;
  if (!defaultLanguage) {
    defaultLanguage = await getLanguageByIsoCode("en_US");
  }

  return CustomerReviewModel.find({ product: product, language: defaultLanguage }).lean();
}


//product rating method
const getRatingData = async function (product, language) {
  var reviews = await getProductReviews(product, language);
  var totalRating = 0;
  var reviewAvgRating = 0;
  for (let i = 0; i < reviews.length; i++) {
    totalRating = totalRating + reviews[i].rating;
  }
  reviewAvgRating = totalRating / reviews.length;
  if (isNaN(reviewAvgRating)) reviewAvgRating = 0;

  return {
    rate: reviewAvgRating,
    total: reviews.length
  };
}

// @desc    fetch all review based on product code and customer id
//@param {active}
const getReviewsCustomerProductWise = async function (product, customer, language) {
  return CustomerReviewModel.find({ product: product, user: customer, language: language }).lean();
}


module.exports = {
  getProductReviews, getReviewsCustomerProductWise, getRatingData
}