const BrandModel = require('../models/Brand')

// @desc    fetch brand by Id
//@param {id}
const getBrandById = async function (id) {
  return BrandModel.findOne({ _id: id }).lean();
}

// @desc    fetch brand by name
//@param {name}
const getBrandByName = async function (name) {
  return BrandModel.findOne({ name: name }).lean();
}

// @desc    fetch all brands 
//@param {}
const getBrands = async function () {
  return BrandModel.find().lean();
}

// @desc    fetch all brands 
//@param {}
const getAllBrandData = async function () {
  let brands =await BrandModel.find().lean();
  return populateBradData(brands);
}

// @desc    fetch images by brand 
//@param {}
const getImagesByBrand = async function (name) {
  let brands = await BrandModel.find({ name: name}).lean();
  console.log(brands)
  
  return populateBrandImage(brands);
}


function populateBradData(brands) {
  let brandsJson = []
  for (brand of brands) {
    brandsJson.push({ name: brand.name, logo: brand.logo })
  }
  return brandsJson;
}

function populateBrandImage(brands) {
  let brandsJson = []
  for (brand of brands) {
    brandsJson.push({ name: brand.name, brandImages: brand.bannerImage })
  }
  return brandsJson;
}
module.exports = {
  getBrandById, getBrandByName, getBrands, getAllBrandData, getImagesByBrand
}