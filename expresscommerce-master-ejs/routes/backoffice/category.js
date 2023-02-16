const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const colors = require("colors");
const { ensureAuth } = require("../../middleware/auth");
const CategoryModel = require("../../models/Category");
const CatalogModel = require("../../models/Catalog");
const { getCatalogList } = require("../../services/commons.js");
const { fetchCategoryByCode,fetchSuperCategoriesService,fetchAllCategoriesService } = require("../../services/category.js");
const { getCatalog } = require("../../services/catalog.js");

// @desc    Show add page
// @route   GET /category/add
router.get("/add", ensureAuth, async (req, res) => {
  const catalogList = await getCatalogList(true);
  res.render("category/add", {
    catalogList,
    csrfToken: req.csrfToken(),
  });
});

// @desc    Process add form
// @route   POST /stories
router.post(
  "/add",
  ensureAuth,
  [body("code").notEmpty(), body("title").notEmpty()],
  async (req, res) => {
    try {
      const result = validationResult(req);
      
      //One of more validation fails then return back to same page
      if (result.errors.length > 0) {
        const catalogList = await getCatalogList(true);
         res.render("category/add", {
          code: req.body.code,
          title: req.body.title,
          description: req.body.description,
          catalogList: catalogList,
          errorMessage: "One or more fields are missing.",
          csrfToken: req.csrfToken(),
        });
      } else {
        const { code, title, description, catalogCode } = req.body;
        const catalog = await getCatalog(catalogCode);
        if (!catalog) {
          console.log(
            colors.red("There is no catalog with code :" + catalogCode)
          );
          res.render("error/404");
        }
        const category = await fetchCategoryByCode(code, catalog);
        if (category) {
          const catalogList = await getCatalogList(true);
          console.log(colors.red("Category with same code already exists."));
          res.render("category/add", {
            code: req.body.code,
            title: req.body.title,
            description: req.body.description,
            catalogList: catalogList,
            errorMessage: "Category with same code already exists.",
            csrfToken: req.csrfToken(),
          });
        } else {
          CategoryModel.create({
            code: code,
            title: title,
            description: description,
            catalog: catalog,
          });
          res.redirect("/category/viewAll");
        }
      }
    } catch (err) {
      console.error(err);
      res.render("error/500");
    }
  }
);

// @desc    Show all stories
// @route   GET /stories
router.get("/viewall", ensureAuth, async (req, res) => {
  try {
    
      const categoriesList= await fetchAllCategoriesService(10);
      console.log(categoriesList);

    //const catalogList=await getCatalogList(true);
    res.render("category/list", {
      categoriesList,
      csrfToken: req.csrfToken(),
    });
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

// @desc    Show edit page
// @route   GET /category/:code
router.get("/:code", ensureAuth, async (req, res) => {
  try {
    const categoriesList = await CategoryModel.findOne({
      code: req.params.code,
    }).lean();

    if (!categoriesList) {
      return res.render("error/404");
    }

    res.render("category/edit", {
      categoriesList,
      csrfToken: req.csrfToken(),
    });
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
});

// @desc    Update catalog
// @route   PUT /category/:_id
router.put("/:id", ensureAuth, async (req, res) => {
  try {
    let category = await CategoryModel.findById(req.params.id).lean();
    console.log(category);
    if (!category) {
      return res.render("error/404");
    }

    category = await CategoryModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );

    res.redirect("/category/viewAll");
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
});

// @desc    Delete story
// @route   DELETE /category/remove/:code
router.delete("remove/:id", ensureAuth, async (req, res) => {
  try {
    console.log("delete query with param " + req.params.id);
    let category = await CategoryModel.findById({ _id: req.params.id }).lean();
    if (!category) {
      return res.render("error/404");
    }

    await CategoryModel.remove({ _id: req.params.id });
    res.redirect("/category/viewAll");
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
});

module.exports = router;
