const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const colors = require("colors");
const { ensureAuth } = require("../../middleware/auth");
const ModuleModel = require("../../models/Module");
const SubModuleModel = require("../../models/SubModule");
const { getModuleList,getModuleByCode,getModuleListActive} = require("../../lib/module.js");
const { getSubModuleByCode } = require("../../lib/submodule.js");

// @desc    Show add page
// @route   GET /basesite/add
router.get("/add", ensureAuth, async (req, res) => {
var activeModuleList= await  getModuleListActive();
  return res.render("subnavigation/add", {
    csrfToken: req.csrfToken(),
    activeModuleList:activeModuleList,
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
    body("landingUrl").notEmpty(),
    body("cssclassname").notEmpty(),
    body("position").notEmpty(),
    body("parentModule").notEmpty(),

  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      var activeModuleList= await  getModuleListActive();
      //One of more validation fails then return back to same page
      const {
        code,
        name,
        landingUrl,
        cssclassname,
         position,
         parentModule,
      } = req.body;
      if (!errors.isEmpty()) {
          console.log('validation fail: '+errors);
        return res.render("subnavigation/add", {
          code: code,
          name: name,
          landingUrl: landingUrl ,
          cssclassname:cssclassname,
          position: position,
          parentModule: parentModule,
          errorMessage: "One ore more fields are missing",
          csrfToken: req.csrfToken(),
          activeModuleList:activeModuleList,
        });
      } 
        const subModulesRec = await getSubModuleByCode(code);
        const moduleCode = await getModuleByCode(parentModule);

        if (subModulesRec) {
          
          console.log(colors.red("Base Site with same code already exists."));
          return res.render("subnavigation/add", {
            code: code,
            name: name,
            landingUrl: landingUrl,
            cssclassname:cssclassname,
            position: position,
            parentModule:parentModule,
            errorMessage: "Base Site with same code already exists.",
            csrfToken: req.csrfToken(),
            activeModuleList:activeModuleList,
          });
        } else {
          SubModuleModel.create({
            code: code,
            name: name,
            landingUrl: landingUrl,
            cssclassname: cssclassname,
            position: position,
            module:moduleCode,
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
        submodule:subnavigationArr
      };
      await navigationList.push(moduleListObj);
    }

/*
    for (moduleListIrrs of parentModule) {
      for (submoduls of moduleListIrrs.submodule){
        console.log("landingUrl"+submoduls.landingUrl);
      }
    }
    */
    return res.render("subnavigation/list", {
      navigationList,
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
    const modules = await ModuleModel.findOne({
      code: req.params.code,
    }).lean();

    if (!modules) {
      return res.render("error/404");
    }

    return res.render("subnavigation/edit", {
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
