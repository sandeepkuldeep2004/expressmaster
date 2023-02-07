const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const colors = require("colors");
const { ensureAuth } = require("../../middleware/auth");
const ModuleModel = require("../../models/Module");
const { getModuleList,getModuleByCode } = require("../../lib/module.js");
const { getSubAllModuleByCode } = require("../../lib/submodule.js");

var leftnavigationlinkactive = "managenavigation";
// @desc    Show add page
// @route   GET /basesite/add
router.get("/add", ensureAuth, async (req, res) => {
  return res.render("navigation/add", {
    csrfToken: req.csrfToken(),
    leftnavigationlinkactive: leftnavigationlinkactive,
    leftsubnavigationlinkactive:"addnavigation",
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
    body("cssclassname").notEmpty(),
    body("position").notEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      //One of more validation fails then return back to same page
      const {
        code,
        name,
        url,
        cssclassname,
         position
      } = req.body;
      if (!errors.isEmpty()) {
          console.log('validation fail: '+errors);
        return res.render("navigation/add", {
          code: code,
          name: name,
          url: url ,
          cssclassname:cssclassname,
          position: position,
          errorMessage: "One ore more fields are missing",
          csrfToken: req.csrfToken(),
          leftnavigationlinkactive: leftnavigationlinkactive,
          leftsubnavigationlinkactive: "navigationlist",
        });
      } 
        const modulesRec = await getModuleByCode(code);
        if (modulesRec) {
          console.log(colors.red("Base Site with same code already exists."));
          return res.render("navigation/add", {
            code: code,
            name: name,
            url: url,
            cssclassname:cssclassname,
            position: position,
            errorMessage: "Base Site with same code already exists.",
            csrfToken: req.csrfToken(),
            leftnavigationlinkactive: leftnavigationlinkactive,
            leftsubnavigationlinkactive: "navigationlist",
          });
        } else {
          ModuleModel.create({
            code: code,
            name: name,
            url: url,
            cssclassname: cssclassname,
            position: position
          });
          return res.redirect("/navigation/viewAll");
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
    const moduleList = await getModuleList();
    var navigationList=[];
     for (moduleListIrr of moduleList) {
      let subnavigationArr = await getSubAllModuleByCode(moduleListIrr._id);
      let moduleListObj = {
        _id: moduleListIrr._id,
        code: moduleListIrr.code,
        name: moduleListIrr.name,
        url: moduleListIrr.url,
        position: moduleListIrr.position,
        status:moduleListIrr.active,
        submodule:subnavigationArr
      };
      await navigationList.push(moduleListObj);
    }

      return res.render("navigation/list", {
      navigationList,
      csrfToken: req.csrfToken(),
      leftnavigationlinkactive: leftnavigationlinkactive,
      leftsubnavigationlinkactive: "navigationlist",
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
    const modules = await ModuleModel.findOne({
      code: req.params.code,
    }).lean();

    if (!modules) {
      return res.render("error/404");
    }

    return res.render("navigation/edit", {
      modules,
      csrfToken: req.csrfToken(),
    });
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
});

// @desc    Update catalog
// @route   PUT /basesite/:_id
router.post("/:id", ensureAuth, async (req, res) => {
  try {

    console.log("requesr:"+req.params.id)
    let modules = await ModuleModel.findById(req.params.id).lean();
    console.log(modules);
    if (!modules) {
      return res.render("error/404");
    }

    modules = await ModuleModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );
    

    return res.redirect("/navigation/viewAll");
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
});

// @desc    Delete story
// @route   DELETE /basesite/remove/:code
router.post("/remove/:id", ensureAuth, async (req, res) => {
  try {
    console.log("delete query with param " + req.params.id);
    let modules = await ModuleModel.findById({ _id: req.params.id }).lean();
    if (!modules) {
      return res.render("error/404");
    }

    await ModuleModel.remove({ _id: req.params.id });
    return res.redirect("/navigation/viewAll");
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
});

module.exports = router;
