const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const colors = require("colors");

const { ensureAuth } = require("../../middleware/auth");
const CatalogModel = require("../../models/Catalog");
const { getCatalog, getCatalogList } = require("../../lib/catalog");

const viewAll = "/catalogs/viewAll";
const listView = "catalogs/list";
const editView = "catalogs/edit";
const addView = "catalogs/add";
const _404View = "error/404";
const _500errorView = "error/500";

// @desc    Show add page
// @route   GET /catalogs/add
router.get("/add", ensureAuth, (req, res) => {
  res.render(addView, {
    csrfToken: req.csrfToken(),
  });
});

// @desc    create new catalog
// @route   POST /add
router.post(
  "/add",
  ensureAuth,
  [body("code").notEmpty(), body("name").notEmpty()],
  async (req, res) => {
    try {
      const result = validationResult(req);
      if (result.errors.length > 0) {
        res.render(addView, {
          code: req.body.code,
          name: req.body.name,
          description: req.body.description,
          errorMessage: "One of more field(s) missing",
          csrfToken: req.csrfToken(),
        });
      } else {
        const catalog = await CatalogModel.findOne({
          code: req.body.code,
        }).lean();

        if (catalog) {
          console.log(colors.red("Catalog with same code already exists."));
          res.render(addView, {
            code: req.body.code,
            name: req.body.name,
            description: req.body.description,
            errorMessage: "Catalog with same code already exists.",
            csrfToken: req.csrfToken(),
          });
        } else {
          await CatalogModel.create(req.body);
          res.redirect(viewAll);
        }
      }
    } catch (err) {
      console.error(err);
      res.render(_500errorView);
    }
  }
);

// @desc    Show all stories
// @route   GET /stories
router.get("/viewall", ensureAuth, async (req, res) => {
  try {
    const catalogs = await CatalogModel.find({})
      .sort({ creationdate: "desc" })
      .lean();

    res.render(listView, {
      catalogs,
      csrfToken: req.csrfToken(),
    });
  } catch (err) {
    console.error(err);
    res.render(_500errorView);
  }
});

// @desc    Show edit page
// @route   GET /catalog/edit/:code
router.get("/:code", ensureAuth, async (req, res) => {
  try {
    const catalog = await CatalogModel.findOne({
      code: req.params.code,
    }).lean();

    if (!catalog) {
      return res.render(_404View);
    }

    res.render(editView, {
      catalog,
      csrfToken: req.csrfToken(),
    });
  } catch (err) {
    console.error(err);
    return res.render(_500errorView);
  }
});

// @desc    Update catalog
// @route   PUT /catalogs/:_id
router.put("/:id", ensureAuth, async (req, res) => {
  try {
    let catalog = await CatalogModel.findById(req.params.id).lean();
    console.log(catalog);
    if (!catalog) {
      return res.render(_404View);
    }

    catalog = await CatalogModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );

    res.redirect(viewAll);
  } catch (err) {
    console.error(err);
    return res.render(_500errorView);
  }
});

// @desc    Delete story
// @route   DELETE /catalogs/remove/:code
router.delete("remove/:id", ensureAuth, async (req, res) => {
  try {
    console.log("delete query with param " + req.params.id);
    let catalog = await CatalogModel.findById({ _id: req.params.id }).lean();
    if (!catalog) {
      return res.render(_404View);
    }

    await CatalogModel.remove({ _id: req.params.id });
    res.redirect(viewAll);
  } catch (err) {
    console.error(err);
    return res.render(_500errorView);
  }
});

module.exports = router;
