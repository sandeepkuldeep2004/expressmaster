const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { ensureAuth } = require("../../middleware/auth");
const B2BUnitModel = require("../../models/B2BUnit");
const { getCountryList } = require("../../lib/commons.js");

const viewAll = "/b2bunit/viewAll";

const listView = "b2bunit/list";
const editView = "b2bunit/edit";
const addView = "b2bunit/add";
const _404View = "error/404";
const _500errorView = "error/500";

var leftnavigationlinkactive = "manageb2b";

// @desc    Show add page
// @route   GET /country/add
router.get("/add", ensureAuth, async (req, res) => {
  const country = await getCountryList(true);
  res.render(addView, {
    country,
    csrfToken: req.csrfToken(),
    leftnavigationlinkactive: leftnavigationlinkactive,
    leftsubnavigationlinkactive: "country",
  });
});

// @desc    Process add form
// @route   POST /stories
router.post(
  "/add",
  ensureAuth,
  [body("isocode").notEmpty(), body("name").notEmpty()],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.render(addView, {
          isocode: req.body.isocode,
          name: req.body.name,
          errorMessage: "One or more value for mandatory field(s) missing",
          csrfToken: req.csrfToken(),
          leftnavigationlinkactive: leftnavigationlinkactive,
          leftsubnavigationlinkactive: "country",
        });
      }
      // check if country with same isocode already exist
      const country = await CountryModel.findOne({ isocode: req.body.isocode });
      if (country) {
        return res.render(addView, {
          isocode: req.body.isocode,
          name: req.body.name,
          errorMessage: "Country with same code already exists",
          csrfToken: req.csrfToken(),
          leftnavigationlinkactive: leftnavigationlinkactive,
          leftsubnavigationlinkactive: "country",
        });
      } else {
        await CountryModel.create(req.body);
        res.redirect(viewAll);
      }
    } catch (err) {
      console.error(err);
      res.render(_500errorView);
    }
  }
);

// @desc    Show all stories
// @route   GET /stories
router.get("/viewAll", ensureAuth, async (req, res) => {
  try {
    const B2BUnitList = await B2BUnitModel.find({})
      .sort({ creationdate: "desc" })
      .lean();
    //const catalogList=await getCatalogList(true);
    res.render(listView, {
      B2BUnitList,
      csrfToken: req.csrfToken(),
      leftnavigationlinkactive: leftnavigationlinkactive,
      leftsubnavigationlinkactive: "manageb2bUnit",
    });
  } catch (err) {
    console.error(err);
    res.render(_500errorView);
  }
});

// @desc    Show edit page
// @route   GET /country/:code
router.get("/:code", ensureAuth, async (req, res) => {
  try {
    const country = await CountryModel.findOne({
      isocode: req.params.code,
    }).lean();

    if (!country) {
      return res.render(_404View);
    }

    res.render(editView, {
      country,
      csrfToken: req.csrfToken(),
      leftnavigationlinkactive: leftnavigationlinkactive,
      leftsubnavigationlinkactive: "country",
    });    
  } catch (err) {
    console.error(err);
    return res.render(_500errorView);
  }
});

// @desc    Update catalog
// @route   PUT /country/:_id
router.post("/:id", ensureAuth, async (req, res) => {
  try {
    let country = await CountryModel.findById(req.params.id).lean();
    console.log(country);
    if (!country) {
      return res.render(_404View);
    }

    country = await CountryModel.findOneAndUpdate(
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
// @route   DELETE /country/remove/:code
router.post("/remove/:id", ensureAuth, async (req, res) => {
  try {
    let country = await CountryModel.findById({ _id: req.params.id }).lean();
    if (!country) {
      return res.render(_404View);
    }

    await CountryModel.remove({ _id: req.params.id });
    res.redirect(viewAll);
  } catch (err) {
    console.error(err);
    return res.render(_500errorView);
  }
});

module.exports = router;