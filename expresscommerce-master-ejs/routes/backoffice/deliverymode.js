const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { ensureAuth } = require("../../middleware/auth");
const DeliveryMode = require("../../models/DeliveryMode");
const { getDeliveryModes } = require("../../services/deliverymode.js");

const viewAll = "/deliverymode/viewAll";

const listView = "deliverymode/list";
const editView = "deliverymode/edit";
const addView = "deliverymode/add";
const _404View = "error/404";
const _500errorView = "error/500";

var leftnavigationlinkactive = "orders";

// @desc    Show add page
// @route   GET /country/add
router.get("/add", ensureAuth, async (req, res) => {
  res.render(addView, {
    csrfToken: req.csrfToken(),
    leftnavigationlinkactive: leftnavigationlinkactive,
    leftsubnavigationlinkactive: "managedeliverymode",
  });
});

// @desc    Process add form
// @route   POST /stories
router.post(
  "/add",
  ensureAuth,
  [body("code").notEmpty(), body("name").notEmpty()],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.render(addView, {
          code: req.body.code,
          name: req.body.name,
          description: req.body.description,
          errorMessage: "One or more value for mandatory field(s) missing",
          csrfToken: req.csrfToken(),
          leftnavigationlinkactive: leftnavigationlinkactive,
          leftsubnavigationlinkactive: "managedeliverymode",

        });
      }
      // check if country with same isocode already exist
      const deliveryMode = await DeliveryMode.findOne({ code: req.body.code });
      if (deliveryMode) {
        return res.render(addView, {
          code: req.body.code,
          name: req.body.name,
          description: req.body.description,
          errorMessage: "Country with same code already exists",
          csrfToken: req.csrfToken(),
          leftnavigationlinkactive: leftnavigationlinkactive,
          leftsubnavigationlinkactive: "managedeliverymode",

        });
      } else {
        await DeliveryMode.create(req.body);
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
    const deliveryModeList = await getDeliveryModes();
     
    //const catalogList=await getCatalogList(true);
    res.render(listView, {
      deliveryModeList,
      csrfToken: req.csrfToken(),
      leftnavigationlinkactive: leftnavigationlinkactive,
      leftsubnavigationlinkactive: "managedeliverymode",

    });
  } catch (err) {
    console.error(err);
    res.render(_500errorView);
  }
});

// @desc    Show edit page
// @route   GET /country/:code
router.get("/:id", ensureAuth, async (req, res) => {
  try {
    const deliveryMode = await DeliveryMode.findOne({
      _id: req.params.id,
    }).lean();

    if (!deliveryMode) {
      return res.render(_404View);
    }

    res.render(editView, {
      deliveryMode,
      csrfToken: req.csrfToken(),
      leftnavigationlinkactive: leftnavigationlinkactive,
      leftsubnavigationlinkactive: "managedeliverymode",
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
    let deliveryMode = await DeliveryMode.findById(req.params.id).lean();
    console.log(deliveryMode);
    if (!deliveryMode) {
      return res.render(_404View);
    }

    deliveryMode = await DeliveryMode.findOneAndUpdate(
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
    let deliveryMode = await DeliveryMode.findById({ _id: req.params.id }).lean();
    if (!deliveryMode) {
      return res.render(_404View);
    }

    await DeliveryMode.remove({ _id: req.params.id });
    res.redirect(viewAll);
  } catch (err) {
    console.error(err);
    return res.render(_500errorView);
  }
});

module.exports = router;