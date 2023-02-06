const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { ensureAuth } = require("../../middleware/auth");
const UserGroupModel = require("../../models/UserGroup");
const CustomerModel = require("../../models/Customer");
const {getModuleListActive} = require("../../services/module.js");
const {getBaseSiteList,getBaseSiteListActive,getBaseSiteById} = require("../../services/basesite.js");
const {getAllUserGroupServices,getOneUserGroupBycodeService} = require("../../services/UserGroup.js");


var leftnavigationlinkactive = "manageAccess";
const viewAll = "/usergroup/viewAll";
const listView = "usergroup/list";
const editView = "usergroup/edit";
const addView = "usergroup/add";
const addUserAssociationView = "usergroup/addGroupInCustomer";
const _404View = "error/404";
const _500errorView = "error/500";
const permisionEnum = {"read":"Read", "write":"Write", "remove":"Read/Write/Execute"}




// @desc    Show add page
// @route   GET /usergroup/add
router.get("/add", ensureAuth, async (req, res) => {
  var activeModuleList= await  getModuleListActive();
  const basesiteList = await getBaseSiteListActive();
  console.log("basesiteList"+basesiteList);

  res.render(addView, {
    csrfToken: req.csrfToken(),
    activeModuleList:activeModuleList,
    leftsubnavigationlinkactive:"UserGroup",
    leftnavigationlinkactive:leftnavigationlinkactive,
    fieldtypes:permisionEnum,
    basesiteList:basesiteList,
  });
});

// @desc    Process add form
// @route   POST /usergroup
router.post("/add", ensureAuth,
  [
    body("code").notEmpty(),
    body("name").notEmpty()],
  async (req, res) => {
    const accessmoules=JSON.parse(req.body.modulename);
    console.log(accessmoules)
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.render(addView, {
          code: req.body.isocode,
          name: req.body.name,
          modulename:accessmoules,
          BaseSite:req.body.BaseSite,
          errorMessage: "One or more value for mandatory field(s) missing",
          csrfToken: req.csrfToken(),
        });
      }

      const usergroup = await UserGroupModel.findOne({ code: req.body.code });
      if (usergroup) {
        return res.render(addView, {
          code: req.body.code,
          name: req.body.name,
          modulename:accessmoules,
          errorMessage: "userGroup with same code already exists",
          csrfToken: req.csrfToken(),
          BaseSite:req.body.BaseSite,
        });
      } else {
        await UserGroupModel.create({ 
          code: req.body.code,
          name: req.body.name,
          accessmoules: accessmoules,
          basesite:req.body.BaseSite,
         });
        return res.redirect(viewAll);
      }
    } catch (err) {
      console.error(err);
      res.render(_500errorView);
    }
  });

// @desc    Show all stories
// @route   GET /stories
router.get("/viewAll", ensureAuth, async (req, res) => {
  try {
    const usergroupList = await getAllUserGroupServices();
    res.render(listView, {
      usergroupList,
      csrfToken: req.csrfToken(),
    leftsubnavigationlinkactive:"UserGroup",
    leftnavigationlinkactive:leftnavigationlinkactive,
    });
  } catch (err) {
    console.error(err);
    res.render(_500errorView);
  }
});

// @desc    Show edit page
// @route   GET /usergroup/:code
router.get("/:code", ensureAuth, async (req, res) => {
  var activeModuleList= await  getModuleListActive();
  const basesiteList = await getBaseSiteListActive();

  try {
    const usergroup=await getOneUserGroupBycodeService(req.params.code);
    console.log("usergroup"+usergroup.baseSiteId);
    if (!usergroup) {
      return res.render(_404View);
    }

    res.render(editView, {
      usergroup:usergroup,
      basesiteList:basesiteList,
      activeModuleList:activeModuleList,
      csrfToken: req.csrfToken(),
      leftsubnavigationlinkactive:"UserGroup",
      leftnavigationlinkactive:leftnavigationlinkactive,
      fieldtypes:permisionEnum,
    });
  } catch (err) {
    console.error(err);
    return res.render(_500errorView);
  }
});

// @desc    Update catalog
// @route   PUT /usergroup/:_id
router.post("/:id", ensureAuth, async (req, res) => {
  try {
    let usergroup = await UserGroupModel.findById(req.params.id).lean();
    const accessmoules=JSON.parse(req.body.modulenameedit);
    console.log(usergroup);
    if (!usergroup) {
      return res.render(_404View);
    }
    usergroup = await UserGroupModel.findOneAndUpdate(
      { _id: usergroup._id },
      {
        $set: {
          code: req.body.code,
          name: req.body.name,
          accessmoules:accessmoules,
          basesite:req.body.BaseSite,
          Status:req.body.Status,
          
        }
      }
    );



    res.redirect(viewAll);
  } catch (err) {
    console.error(err);
    return res.render(_500errorView);
  }
});

// @desc    Delete story
// @route   DELETE /usergroup/remove/:code
router.post("/remove/:id", ensureAuth, async (req, res) => {
  try {
    let usergroup = await UserGroupModel.findById({
      _id: req.params.id,
    }).lean();
    if (!usergroup) {
      return res.render(_404View);
    }

    await UserGroupModel.remove({ _id: req.params.id });
    res.redirect(viewAll);
  } catch (err) {
    console.error(err);
    return res.render(_500errorView);
  }
});

// @desc    Show Association User group with Customer  page
// @route   GET /usergroup/add
router.get("/user/add", ensureAuth, async (req, res) => {
  res.render(addUserAssociationView, {
    csrfToken: req.csrfToken()
  });
});

// @desc    Associate User group with Customer 
// @route   POST /usergroup/user/add
router.post("/user/add", ensureAuth, async (req, res) => {
  try {
    let usergroup = await UserGroupModel.find({
      code: req.body.code,
    }).lean();
    if (!usergroup) {
      return res.render(_404View);
    }
//    console.log('Found User Group is : ', usergroup);

    customer = await CustomerModel.findOneAndUpdate(
      {
        uid: req.body.customerId
      },
      {
        $addToSet: { userGroups: usergroup }
      },
      { new: true });
    console.log('Customer Group Updated successfully: ', customer);
    res.redirect(viewAll);
  } catch (err) {
    console.error(err);
    return res.render(_500errorView);
  }
});

module.exports = router;
