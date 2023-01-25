const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const colors = require("colors");
const { ensureAuth } = require("../../middleware/auth");
const BaseSiteModel = require("../../models/BaseSite");
const CatalogModel = require("../../models/Catalog");
const { getCatalogList } = require("../../lib/commons.js");
const { getBaseSiteByCode } = require("../../lib/basesite.js");
const { getCatalog } = require("../../lib/catalog.js");

// @desc    Show add page
// @route   GET /basesite/add
router.get("/add", ensureAuth, async (req, res) => {
  const contentCatalogList = await getCatalogList(true);
  const productCatalogList = await getCatalogList(true);
  return res.render("basesite/add", {
    contentCatalogList,
    productCatalogList,
    csrfToken: req.csrfToken(),
  });
});

// @desc    Process add form
// @route   POST /stories
router.post(
  "/add",
  ensureAuth,
  [
    body("code").notEmpty(),
    body("name").notEmpty(),
    body("url").notEmpty(),
    body("productCatalog").notEmpty(),
    body("contentCatalog").notEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      //One of more validation fails then return back to same page
      const {
        code,
        name,
        description,
        url,
        productCatalog,
        contentCatalog,
        status
      } = req.body;
      
      if (!errors.isEmpty()) {
          console.log('validation fail: '+errors);
        return res.render("basesite/add", {
          code: code,
          name: name,
          description: description,
          $push: { url: url },
          errorMessage: "One ore more fields are missing",
          csrfToken: req.csrfToken(),
        });
      } 
        const _productCatalog = await getCatalog(productCatalog);
        const _contentCatalog = await getCatalog(contentCatalog);
        const basesite = await getBaseSiteByCode(code);
        if (basesite) {
          console.log(colors.red("Base Site with same code already exists."));
          return res.render("basesite/add", {
            code: code,
            name: name,
            description: description,
            $push: { url: url },
            errorMessage: "Base Site with same code already exists.",
            csrfToken: req.csrfToken(),
          });
        } else {
          BaseSiteModel.create({
            code: code,
            name: name,
            description: description,
            $push: url,
            productCatalog: _productCatalog,
            contentCatalog: _contentCatalog,
          });
          return res.redirect("/basesite/viewAll");
        }
      
    } catch (err) {
      console.error(err);
      return res.render("error/500");
    }
  }
);

// @desc    Show all stories
// @route   GET /stories
router.get("/viewall", ensureAuth, async (req, res) => {
  try {
    const basesiteList = await BaseSiteModel.find({})
      .sort({ creationdate: "desc" })
      .lean();
    //const catalogList=await getCatalogList(true);
    return res.render("basesite/list", {
      basesiteList,
      csrfToken: req.csrfToken(),
    });
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
});

// @desc    Show edit page
// @route   GET /basesite/:code
router.get("/:code", ensureAuth, async (req, res) => {
  try {
    const basesite = await BaseSiteModel.findOne({
      code: req.params.code,
    }).lean();

    if (!basesite) {
      return res.render("error/404");
    }

    return res.render("basesite/edit", {
      basesite,
      csrfToken: req.csrfToken(),
    });
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
});

// @desc    Update catalog
// @route   PUT /basesite/:_id
router.patch("/:id", ensureAuth, async (req, res) => {
  try {
    let basesite = await BaseSiteModel.findById(req.params.id).lean();
    console.log(basesite);
    if (!basesite) {
      return res.render("error/404");
    }

    basesite = await BaseSiteModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );

    return res.redirect("/basesite/viewAll");
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
});

// @desc    Delete story
// @route   DELETE /basesite/remove/:code
router.delete("remove/:id", ensureAuth, async (req, res) => {
  try {
    console.log("delete query with param " + req.params.id);
    let basesite = await BaseSiteModel.findById({ _id: req.params.id }).lean();
    if (!basesite) {
      return res.render("error/404");
    }

    await BaseSiteModel.remove({ _id: req.params.id });
    return res.redirect("/basesite/viewAll");
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
});

module.exports = router;
