const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const colors = require('colors');
const { ensureAuth } = require("../../middleware/auth");

const VendorModel = require("../../models/Vendor");

// @desc    Show add page
// @route   GET /vendors/add
router.get("/add", ensureAuth, (req, res) => {
  res.render("vendors/add",{
    csrfToken: req.csrfToken()
  });
});

// @desc    Process add form
// @route   POST /vendor
router.post("/add", ensureAuth, async (req, res) => {
  try {
    const vendor = await VendorModel.findOne({ code: req.body.code });
    if (vendor) {
      console.log(colors.red("Vendor with same code already exists."));
      return res.render("vendors/add", {
        code: req.body.code,
        name: req.body.name,
        status: req.body.status,
        errorMessage: "Vendor with same code already exists.",
        csrfToken: req.csrfToken()
      });
    } else {
      await VendorModel.create(req.body);
      return res.redirect("/vendors/viewAll");
    }
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

// @desc    Show all stories
// @route   GET /stories
router.get("/viewAll", ensureAuth, async (req, res) => {
  try {
    const vendors = await VendorModel.find({})
      .sort({ creationdate: "desc" })
      .lean();

    res.render("vendors/list", {
      vendors,
      csrfToken: req.csrfToken(),
    });
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

// @desc    Show edit page
// @route   GET /vendor/edit/:code
router.get("/:code", ensureAuth, async (req, res) => {
  try {
    const vendor = await VendorModel.findOne({
      code: req.params.code,
    }).lean();

    if (!vendor) {
      return res.render("error/404");
    }

    res.render("vendors/edit", {
      vendor,
      csrfToken: req.csrfToken()
    });
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
});

// @desc    Update vendor
// @route   PUT /vendors/:_id
router.put("/:id", ensureAuth, async (req, res) => {
  try {
    let vendor = await VendorModel.findById(req.params.id).lean();
    if (!vendor) {
      return res.render("error/404");
    }

    vendor = await VendorModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );

    res.redirect("/vendors/viewAll");
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
});

// @desc    Delete story
// @route   DELETE /vendors/remove/:code
router.delete("/remove/:id", ensureAuth, async (req, res) => {
  try {
    console.log("delete query with param " + req.params.id);
    let vendor = await VendorModel.findById({ _id: req.params.id }).lean();
    if (!vendor) {
      return res.render("error/404");
    }

    await VendorModel.remove({ _id: req.params.id });
    res.redirect("/vendors/viewAll");
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
});

module.exports = router;
