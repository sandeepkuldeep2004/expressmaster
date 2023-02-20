const CategoryModel = require("../models/Category");
const {
  fetchSuperCategories,
  fetchChildCategories,
} = require("../dao/Category");

// @desc    fetch all active Category
//@param {active}
const getCategoryList = async function (param) {
  return CategoryModel.find({ status: param })
    .sort({ creationdate: "desc" })
    .lean();
};

// @desc    fetch Category by code
//@param {active}
const getCategoryByCode = async function (code) {
  return CategoryModel.findOne({ code: code })
    .populate([
      {
        path: "categories",
        model: "Category",
        populate: { path: "categories", model: "Category" },
      },
      { path: "catalog" },
    ])
    .lean();
};

//Categories hirarachy recursive method
const getCategoriesByRoot = async function () {
  let rootCategory = await CategoryModel.findOne({
    code: 10,
  })
    .populate([
      {
        path: "categories",
        model: "Category",
        populate: {
          path: "categories",
          model: "Category",
          populate: { path: "categories", model: "Category" },
        },
      },
      { path: "catalog" },
    ])
    .lean()
    .sort({ rank: "asc" });
  return rootCategory;
};

// @desc    fetch Category by code
//@param {active}
const getCategoryByID = function (id) {
  return CategoryModel.findById(id).lean();
};
// @desc  fetch Category by code
//@param {code,catalog}
const fetchCategoryByCode = async function (code, catalog) {
  return CategoryModel.findOne({ code: code, catalog: catalog }).lean();
};

const fetchSuperCategoriesService = async function (code) {
  let rootCategory = await CategoryModel.findOne({
    code: code,
  })
    .populate([
      {
        path: "categories",
        model: "Category",
        match: {status:"active"},
        populate: {
          path: "categories",
          model: "Category",
          match: {status:"active"},
          populate: { path: "categories", model: "Category", match: {status:"active"} },
        },
      },
      { path: "catalog" },
    ])
    .lean()
    .sort({ rank: "asc" });
  return rootCategory;
};

const fetchAllCategoriesService = async function (code) {
  let rootCategory = await CategoryModel.findOne({
    code: code,
  })
    .populate([
      {
        path: "categories",
        model: "Category",
        populate: {
          path: "categories",
          model: "Category",
          populate: { path: "categories", model: "Category"},
        },
      },
      { path: "catalog", model: "Catalog" , select: '_id code name'},
    ])
    .lean()
    .sort({ rank: "asc" });
  return rootCategory;
};
const fetchCategoryByCodeOnly = async function (code) {
  return CategoryModel.findOne({ code: code}).lean();
};

const getCategoriesById2LevelService = async function () {
  let rootCategory = await CategoryModel.findOne({
    code: 10,
  })
    .populate([
      {
        path: "categories",
        model: "Category",
        populate: {
          path: "categories",
          model: "Category",
        },
      },
      { path: "catalog" },
    ])
    .lean()
    .sort({ rank: "asc" });
  return rootCategory;
};

module.exports = {
  getCategoryList,
  fetchCategoryByCode,
  getCategoryByCode,
  getCategoryByID,
  getCategoriesByRoot,
  fetchSuperCategoriesService,
  fetchAllCategoriesService,
  fetchCategoryByCodeOnly,
  getCategoriesById2LevelService  
};
