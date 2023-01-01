const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { ensureAuth } = require("../../middleware/auth");
const CountryModel = require("../../models/Country");

const viewAll = "/country/viewAll";

const listView = "country/list";
const editView = "country/edit";
const addView = "country/add";
const _404View = "error/404";
const _500errorView = "error/500";

// @desc    Show add page
// @route   GET /country/add
router.get("/add", ensureAuth, async (req, res) => {
  res.render(addView, {
    csrfToken: req.csrfToken(),
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
        });
      }
      // check if region with same isocode already exist
      const country = await CountryModel.findOne({ isocode: req.body.isocode });
      if (country) {
        return res.render(addView, {
          isocode: req.body.isocode,
          name: req.body.name,
          errorMessage: "Country with same code already exists",
          csrfToken: req.csrfToken(),
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
    const countryList = await CountryModel.find({})
      .sort({ creationdate: "desc" })
      .lean();
    //const catalogList=await getCatalogList(true);
    res.render(listView, {
      countryList,
      csrfToken: req.csrfToken(),
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
    });
  } catch (err) {
    console.error(err);
    return res.render(_500errorView);
  }
});

// @desc    Update catalog
// @route   PUT /country/:_id
router.put("/:id", ensureAuth, async (req, res) => {
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
router.delete("remove/:id", ensureAuth, async (req, res) => {
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
