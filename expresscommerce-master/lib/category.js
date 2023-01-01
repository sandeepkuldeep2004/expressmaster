const CategoryModel = require('../models/Category')

// @desc    fetch all active Category
//@param {active}
const getCategoryList = async function(param){ 
  return  CategoryModel.find({status:param}).sort({ creationdate: 'desc' }).lean();
}

// @desc    fetch Category by code
//@param {active}
const getCategoryByCode = async function(code){ 
  return  CategoryModel.findOne({code:code})
  .populate(
    [{ path: 'categories', model: 'Category', populate: { path: 'categories', model: 'Category' } },
    {path:'catalog'}]
  ).lean();
}


//Categories hirarachy recursive method
const getCategoriesByRoot = async function (treeNode) {
  let rootCategory = await CategoryModel.findOne(
    {
      code: treeNode.code
    }).populate(
      [{ path: 'categories', model: 'Category', populate: { path: 'categories', model: 'Category', populate: { path: 'categories', model: 'Category' } } },
      { path: 'catalog' }]
    )
    .lean()
    .sort({ rank: 'asc' })
  return rootCategory;
}

// @desc    fetch Category by code
//@param {active}
const getCategoryByID =  function(id){ 
  return  CategoryModel.findById(id).lean();
}
// @desc  fetch Category by code
//@param {code,catalog}
const fetchCategoryByCode = async function(code,catalog){ 
  return  CategoryModel.findOne({code:code,catalog:catalog}).lean();
}



module.exports={
    getCategoryList,fetchCategoryByCode,getCategoryByCode,getCategoryByID,getCategoriesByRoot
}