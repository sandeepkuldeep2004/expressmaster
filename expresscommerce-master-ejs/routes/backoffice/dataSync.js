const express = require("express");
const router = express.Router();
const { ensureAuth} = require("../../middleware/auth");

// @desc    Show add page
// @route   GET /vendors/add
router.get("/view", ensureAuth, (req, res) => {
  console.log("test");
  res.render("datasync/view",{
    csrfToken: req.csrfToken(),
    dataSyncActive:true
  });
});
const {
  essentialDataUpload,
  sampleDataUpload,
  cmsComponentUpload,
  sampleMediaDataUpload,
  lefNavigationUpload
} = require("../../lib/dataSynch.js");

const { saveTopSellingComponent } = require("../../dao/TopSellingComponent");
const { saveProduct } = require("../../dao/Product");
const { saveCategory } = require("../../dao/Category");
const { saveCatalog } = require("../../dao/Catalog");
const { saveCategoryProductRel } = require("../../dao/CategoryProductRel");
const { saveCategoryToCategoryRel } = require("../../dao/CategoryToCategoryRel");
const { saveProductPrice } = require("../../dao/ProductPrice");
const { saveProductStock } = require("../../dao/ProductStock");
const { saveProductMedia } = require("../../dao/ProductMedia");
const { saveVariantProductRel } = require("../../dao/VariantProductRel");
const { saveMedia } = require("../../dao/Media");
const { saveB2BUnit } = require("../../dao/Account");
const { saveNumberSeries } = require("../../dao/NumberSeries");

const path = require('path');
const fs = require('fs');





// @desc    Show add page
// @route   GET /essentialdata/synch
router.post("/essentialdata/synch", async (req, res) => {
  try {
    essentialDataUpload("essentialData");

   /* res.status(201).json({
      msg: "all essential data uploaded successfully",
    });*/

    res.render("datasync/view",{
      csrfToken: req.csrfToken(),
      msg: "All essential data uploaded successfully",
      dataSyncActive:true
     }); 
    //res.render("/data/view",{Msg:"All essential data uploaded successfully"});
   
  } catch (err) {
    res.status(500).json({
      err,
    });
  }
});



// @desc    Show add page
// @route   GET /catalog/synch
router.post("/cms/synch", async (req, res) => {
  try {
    cmsComponentUpload("TopSellingComponent", await saveTopSellingComponent);
    //cmsComponentUpload('ProductCarouselComponent');
    /*res.status(201).json({
      msg: "all CMS data uploaded successfully",
    });*/
    
    res.render("datasync/view",{
      csrfToken: req.csrfToken(),
      msg: "All CMS data uploaded successfully",
      dataSyncActive:true
     }); 
   
    
  } catch (err) {
    res.status(500).json({
      err,
    });
  }
});

// @desc    Show add page
// @route   GET /catalog/synch
router.post("/sampledata/synch", async (req, res) => {
  try {
    sampleDataUpload("catalogData", await saveCatalog);
    sampleDataUpload("categoryData1", await saveCategory);
    sampleDataUpload("categoryToCategoryRelData1", await saveCategoryToCategoryRel);
    sampleDataUpload("productData1", await saveProduct);
    sampleDataUpload("categoryProductRelData1", await saveCategoryProductRel);
    sampleDataUpload("productStockData1", await saveProductStock);
    sampleDataUpload("productPriceData1", await saveProductPrice);
    sampleDataUpload("numberSeriesData", await saveNumberSeries);
    sampleDataUpload("productMediaData1", await saveProductMedia);
    //sampleDataUpload("variantProductRelData", await saveVariantProductRel);

   /* res.status(201).json({
      msg: "all sample data uploaded successfully",
    });.*/
    //return res.redirect("/data/view");

    res.render("datasync/view",{
      csrfToken: req.csrfToken(),
      msg: "All sample data uploaded successfully",
      dataSyncActive:true
     }); 
   

  } catch (err) {
    res.status(500).json({
      err,
    });
  }
});

// @desc    Show add page
// @route   GET /catalog/synch
router.post("/mediadata/synch", async (req, res) => {
  try {
    sampleMediaDataUpload("/data/media", saveMedia);
   /* res.status(201).json({
      msg: "all media files uploaded successfully",
    });*/
  //  return res.redirect("/data/view");
    res.render("datasync/view",{
      csrfToken: req.csrfToken(),
      msg: "All media data uploaded successfully",
      dataSyncActive:true
    }); 
   

  } catch (err) {
    res.status(500).json({
      err,
    });
  }
});

router.post("/leftNavigation/synch", async (req, res) => {
  try {
    lefNavigationUpload("essentialData");
    res.render("datasync/view",{
      csrfToken: req.csrfToken(),
      msg: "Sync left Navigation",
      dataSyncActive:true
    }); 
   

  } catch (err) {
    res.status(500).json({
      err,
    });
  }
});


// @desc    Show add page
// @route   GET data/b2b/sampledata/synch
router.post("/b2b/sampledata/synch", async (req, res) => {
  try {
    sampleDataUpload("accountData", saveB2BUnit);
   /* res.status(201).json({
      msg: "all sample data uploaded successfully",
    });*/
    //return res.redirect("/data/view");

    res.render("datasync/view",{
      csrfToken: req.csrfToken(),
      msg: "Sync b2b sample data",
      dataSyncActive:true
    }); 
  } catch (err) {
    res.status(500).json({
      err,
    });
  }
});


router.get("/essentialdata/download", async (req, res) => {
   const fileName= "essentialData";
    //const file = fs.readFileSync(path.join(__dirname, '../../data/' + fileName + '.json'), 'utf8');
   
   //console.log("folderpat"+file);
    res.download(path.join(__dirname, '../../data/' + fileName + '.json')); // Set disposition and send it.
  
 
});







module.exports = router;
