const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const colors = require("colors");

const { ensureAuth } = require("../../middleware/auth");
const CampaignModel = require("../../models/Campaign");
const { getCampaign, getCampaignList } = require("../../lib/campaign");

const viewAll = "/campaigns/viewAll";
const listView = "campaigns/list";
const editView = "campaigns/edit";
const addView = "campaigns/add";
const _404View = "error/404";
const _500errorView = "error/500";

var leftnavigationlinkactive = "campaigns";

// @desc    Show add campaign
// @route   GET /campaigns/add
router.get("/add", ensureAuth, (req, res) => {
  res.render(addView, {
    csrfToken: req.csrfToken(),
    leftsubnavigationlinkactive:"campaigns",
    leftnavigationlinkactive:leftnavigationlinkactive,
  });
});

// @desc    create new catalog
// @route   POST /add
router.post(
  "/add",
  ensureAuth,
  [body("code").notEmpty(), body("type").notEmpty()],
  async (req, res) => {
    try {
      const result = validationResult(req);
      if (result.errors.length > 0) {
        res.render(addView, {
          code: req.body.code,
          type: req.body.type,
          emailTemplate: req.body.emailTemplate,
          startDate:req.body.startDate,
          expiryDate:req.body.expiryDate,
          cronExpression:req.body.cronExpression,
          status:req.body.status,
          errorMessage: "One of more field(s) missing",
          csrfToken: req.csrfToken(),
          leftsubnavigationlinkactive:"campaigns",
          leftnavigationlinkactive:leftnavigationlinkactive,
        });
      } else {
        const campaign = await CampaignModel.findOne({
          code: req.body.code,
        }).lean();

        if (campaign) {
          console.log(colors.red("Campaign with same code already exists."));
          res.render(addView, {
            code: req.body.code,
            type: req.body.type,
            emailTemplate: req.body.emailTemplate,
            startDate:req.body.startDate,
            expiryDate:req.body.expiryDate,
            cronExpression:req.body.cronExpression,
            status:req.body.status,
            errorMessage: "Campaign with same code already exists.",
            csrfToken: req.csrfToken(),
            leftsubnavigationlinkactive:"campaigns",
            leftnavigationlinkactive:leftnavigationlinkactive,
          });
        } else {
          await CampaignModel.create(req.body);
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
    const campaignList = await CampaignModel.find({})
        .lean();

    res.render(listView, {
      campaignList: campaignList,
      csrfToken: req.csrfToken(),
      leftsubnavigationlinkactive:"campaigns",
      leftnavigationlinkactive:leftnavigationlinkactive,
    });
    
  } catch (err) {
    console.error(err);
    res.render(_500errorView);
  }
});

// @desc    Show edit page
// @route   GET /campaign/:code
router.get("/:code", ensureAuth, async (req, res) => {
  try {
    const campaign = await CampaignModel.findOne({
      code: req.params.code,
    }).lean();

    if (!campaign) {
      return res.render(_404View);
    }

    res.render(editView, {
      campaign: campaign,
      csrfToken: req.csrfToken(),
      leftsubnavigationlinkactive:"campaigns",
      leftnavigationlinkactive:leftnavigationlinkactive,
    });
  } catch (err) {
    console.error(err);
    return res.render(_500errorView);
  }
});

// @desc    Update catalog
// @route   PUT /catalogs/:_id
router.post("/:id", ensureAuth, async (req, res) => {
  try {
    let campaign = await CampaignModel.findById(req.params.id).lean();
    console.log(campaign);
    if (!campaign) {
      return res.render(_404View);
    }

    campaign = await CampaignModel.findOneAndUpdate(
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
    let campaign = await CampaignModel.findById({ _id: req.params.id }).lean();
    if (!campaign) {
      return res.render(_404View);
    }

    await CampaignModel.remove({ _id: req.params.id });
    res.redirect(viewAll);
  } catch (err) {
    console.error(err);
    return res.render(_500errorView);
  }
});

module.exports = router;
