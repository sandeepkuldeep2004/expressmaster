const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { ensureAuth } = require("../../middleware/auth");
const CountryModel = require("../../models/Country");
const RegionModel = require("../../models/Region");
const { getCountryList } = require("../../lib/commons.js");
const {getAllRegionServices, getRegionByIdServices} = require("../../services/region");
var leftnavigationlinkactive = "localization";

const viewAll = "/region/viewAll";

const listView = "region/list";
const editView = "region/edit";
const addView = "region/add";
const _404View = "error/404";
const _500errorView = "error/500";

// @desc    Show add page
// @route   GET /region/add
router.get("/add", ensureAuth, async (req, res) => {
  const countryList = await getCountryList(true);

  res.render(addView, {
    countryList,
    csrfToken: req.csrfToken(),
    leftnavigationlinkactive: leftnavigationlinkactive,
    leftsubnavigationlinkactive: "region",
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
      const { isocode, name, country } = req.body;
      const countryList = await getCountryList(true);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.render(addView, {
          isocode: req.body.isocode,
          name: req.body.name,
          countryList,
          errorMessage: "One or more value for mandatory field(s) missing",
          csrfToken: req.csrfToken(),
        });
      }
      // check if region with same isocode already exist
      const region = await RegionModel.findOne({ isocode: isocode });
      
      if (region) {
        res.render(addView, {
          isocode: isocode,
          name: name,
          countryList,
          errorMessage: "Region with same code already exists",
          csrfToken: req.csrfToken(),
          leftnavigationlinkactive: leftnavigationlinkactive,
          leftsubnavigationlinkactive: "region",
        });
      } else {
        CountryModel.findOne({ isocode: country }).then((country) => {
          RegionModel.create({
            isocode: isocode,
            name: name,
            country: country,
          });
          res.redirect(viewAll);
        });
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
    
    const regionList = await getAllRegionServices();
      res.render(listView, {
      regionList,      
      csrfToken: req.csrfToken(),
      leftnavigationlinkactive: leftnavigationlinkactive,
      leftsubnavigationlinkactive: "region",
      
    });
  } catch (err) {
    console.error(err);
    res.render(_500errorView);
  }
});

// @desc    Show edit page
// @route   GET /category/:code
router.get("/:_id", ensureAuth, async (req, res) => {
  try {
    const regionData = await getRegionByIdServices(req.params._id);
    if (!regionData) {
      return res.render(_404View);
    }
    res.render(editView, {
      region:regionData,
      csrfToken: req.csrfToken(),
      leftnavigationlinkactive: leftnavigationlinkactive,
      leftsubnavigationlinkactive: "region",
    });
  } catch (err) {
    console.error(err);
    return res.render(_500errorView);
  }
});

// @desc    Update catalog
// @route   PUT /category/:_id
router.post("/:id", ensureAuth, async (req, res) => {
  try {
    let region = await RegionModel.findById(req.params.id).lean();
    if (!region) {
      return res.render(_404View);
    }
    const { name, countryisocode } = req.body;
    //console.log('param country :'+country);
    CountryModel.find({ isocode: countryisocode }).then((country) => {
      //console.log('inside loop :'+country);
      RegionModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          isocode: region.isocode,
          name: name,
          country: country,
        }
      );
    });
    res.redirect(viewAll);
  } catch (err) {
    console.error(err);
    return res.render(_500errorView);
  }
});

// @desc    Delete story
// @route   DELETE /category/remove/:code
router.post("remove/:id", ensureAuth, async (req, res) => {
  try {
    console.log("delete query with param " + req.params.id);
    let region = await RegionModel.findById({ _id: req.params.id }).lean();
    if (!region) {
      return res.render(_404View);
    }

    await RegionModel.remove({ _id: req.params.id });
    res.redirect(viewAll);
  } catch (err) {
    console.error(err);
    return res.render(_500errorView);
  }
});

module.exports = router;
