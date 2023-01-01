const express = require("express");
const router = express.Router();
const CategoryModel = require("../../models/Category");
const { ensureTokenAuth } = require("../../middleware/auth");
const { getCategoryList, getCategoryByCode,getCategoriesByRoot } = require("../../lib/category");

//counter assign for Id field in json as per UI requirement 
var counter = 1000;

class CategoryTreeNode {
  constructor(code, title, id, rank, visible) {
    this.id = id;
    this.code = code;
    this.title = title;
    this.rank = rank;
    this.visible = visible;
    this.categories = [];
    this.sections = [];
    this.items = [];
  }
}
// @route   GET /category
router.get("/:baseSiteId/category", ensureTokenAuth, async (req, res) => {
  try {
    const categoryList = await getCategoryList("active");
    res.status(200).json(categoryList);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err,
    });
  }
});

// @desc   get all Category List Tree
// @route   GET /category
router.get("/:baseSiteId/categories", ensureTokenAuth, async (req, res) => {
  try {
    var categoryTree;
    const rootNode = new CategoryTreeNode('10', 'ROOT');
    categoryTree = await getCategoriesByRoot(rootNode);
    let categoryTree1 = await convertResponseAsPerUI(categoryTree);

    res.status(200).json(categoryTree1);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err,
    });
  }
});





// @desc   get all Category L
// @route   GET /catalogs
router.get("/:baseSiteId/category/:code", ensureTokenAuth, async (req, res) => {
  try {
    const category = await getCategoryByCode(req.params.code);
    if (!category)
      return res.status(404).json({
        error: "invalid code",
      });

    return res.status(200).json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err,
    });
  }
});

// @desc   update the category
// @route   patch category/code
router.patch("/:baseSiteId/category/:code", ensureTokenAuth, async (req, res) => {
  try {
    const category = await CategoryModel.updateOne(
      { code: req.params.code },
      { $set: { title: req.body.title } }
    );
    res.status(200).json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err,
    });
  }
});

//Categories hirarachy recursive method
const convertResponseAsPerUI = async function (categoryTree) {
  let superCats = [];
  for (var superCategories of categoryTree.categories) {
    let sections = []
    for (var sectionCategories of superCategories.categories) {
      let items = []
      for (var itemsCategories of sectionCategories.categories) {
        let item = {
          code: itemsCategories.code,
          title: itemsCategories.title,
          id: itemsCategories.id,
          rank: itemsCategories.rank,
          visible: itemsCategories.visible
        }
        items.push(item);
      }
      let section = {
        code: sectionCategories.code,
        title: sectionCategories.title,
        id: sectionCategories.id,
        rank: sectionCategories.rank,
        visible: sectionCategories.visible,
        items: items
      }
      sections.push(section);
    }
    let superCat = {
      code: superCategories.code,
      title: superCategories.title,
      id: superCategories.id,
      rank: superCategories.rank,
      visible: superCategories.visible,
      sections: sections
    }
    superCats.push(superCat)
  }
  let rootCategory = { categories: superCats }
  return rootCategory;
}

module.exports = router;
