const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const colors = require("colors");
const { ensureAuth } = require("../../middleware/auth");
const BaseSiteModel = require("../../models/BaseSite");
const CatalogModel = require("../../models/Catalog");
const { getCatalogList } = require("../../services/commons.js");
const { getBaseSiteByCode } = require("../../services/basesite.js");
const { getCompanyList } = require("../../services/company.js");
const { getCurrencyList } = require("../../services/currency.js");
const { getLanguageList } = require("../../services/language.js");




var leftnavigationlinkactive = "manageAccess";


// @desc    Show add page
// @route   GET /basesite/add
router.get("/add", ensureAuth, async (req, res) => {
  const contentCatalogList = await getCatalogList(true);
  const productCatalogList = await getCatalogList(true);
  const companyList = await getCompanyList();
  const currencyList = await getCurrencyList();
  const languageList = await getLanguageList();


  return res.render("basesite/add", {
    contentCatalogList,
    productCatalogList,
    companyList,
    currencyList,
    languageList,
    csrfToken: req.csrfToken(),
    leftnavigationlinkactive:leftnavigationlinkactive,
    leftsubnavigationlinkactive:"BaseSite",

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
    body("productCatalog").notEmpty(),
    body("contentCatalog").notEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      //One of more validation fails then return back to same page
      const {
        code,
        name,
        description,
        productCatalog,
        contentCatalog,
        status,
        defaultCurrency,
        defaultLanguage,
        company,

      } = req.body;
      
      if (!errors.isEmpty()) {
          console.log('validation fail: '+errors);
        return res.render("basesite/add", {
          code: code,
          name: name,
          description: description,
          status:status,
          defaultCurrency:defaultCurrency,
          defaultLanguage:defaultLanguage,
          company:company,
          errorMessage: "One ore more fields are missing",
          csrfToken: req.csrfToken(),
            leftnavigationlinkactive:leftnavigationlinkactive,
            leftsubnavigationlinkactive:"BaseSite",
        });
      } 
       // const _productCatalog = await getCatalog(productCatalog);
        //const _contentCatalog = await getCatalog(contentCatalog);
        const basesite = await getBaseSiteByCode(code);
        if (basesite) {
          console.log(colors.red("Base Site with same code already exists."));
          return res.render("basesite/add", {
            code: code,
            name: name,
            description: description,
            status:status,
          defaultCurrency:defaultCurrency,
          defaultLanguage:defaultLanguage,
          company:company,
            errorMessage: "Base Site with same code already exists.",
            csrfToken: req.csrfToken(),
            leftnavigationlinkactive:leftnavigationlinkactive,
            leftsubnavigationlinkactive:"BaseSite",


          });
        } else {
          BaseSiteModel.create({
            code: code,
            name: name,
            description: description,
            productCatalog: productCatalog,
            contentCatalog: contentCatalog,
            status:status,
            defaultCurrency:defaultCurrency,
            defaultLanguage:defaultLanguage,
            company:company,
          });
          return res.redirect("/basesite/viewAll");
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
    const basesiteList = await BaseSiteModel.find({})
      .sort({ creationdate: "desc" })
      .populate([
       
        { path: 'productCatalog',model:'Catalog', select: 'code _id name', },
        { path: 'contentCatalog',model:'Catalog', select: 'code _id name ', },
        { path: 'defaultCurrency',model:'Currency', select: 'code _id name', },
        { path: 'defaultLanguage',model:'Language', select: 'code _id name', },
        { path: 'company',model:'Company', select: 'code _id name', },
      ]).lean();
      
    //const catalogList=await getCatalogList(true);
    return res.render("basesite/list", {
      basesiteList,
      csrfToken: req.csrfToken(),
      leftnavigationlinkactive:leftnavigationlinkactive,
      leftsubnavigationlinkactive:"BaseSite",

    });
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
});

// @desc    Show edit page
// @route   GET /basesite/:code
router.get("/:code", ensureAuth, async (req, res) => {
  const contentCatalogList = await getCatalogList(true);
  const productCatalogList = await getCatalogList(true);
  const companyList = await getCompanyList();
  const currencyList = await getCurrencyList();
  const languageList = await getLanguageList();

  try {
    const basesite = await BaseSiteModel.findOne({
      code: req.params.code,
    }).lean();

    if (!basesite) {
      return res.render("error/404");
    }

    return res.render("basesite/edit", {
      contentCatalogList,
    productCatalogList,
    companyList,
    currencyList,
    languageList,
      basesite,
      csrfToken: req.csrfToken(),
      leftnavigationlinkactive:leftnavigationlinkactive,
      leftsubnavigationlinkactive:"BaseSite",

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
    let basesite = await BaseSiteModel.findById(req.params.id).lean();
    console.log(basesite);
    if (!basesite) {
      return res.render("error/404");
    }

    basesite = await BaseSiteModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );

    return res.redirect("/basesite/viewAll");
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
    let basesite = await BaseSiteModel.findById({ _id: req.params.id }).lean();
    if (!basesite) {
      return res.render("error/404");
    }

    await BaseSiteModel.remove({ _id: req.params.id });
    return res.redirect("/basesite/viewAll");
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
});

module.exports = router;
