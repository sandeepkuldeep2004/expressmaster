const express = require("express");
const router = express.Router();
const {
  essentialDataUpload,
  sampleDataUpload,
  cmsComponentUpload,
  sampleMediaDataUpload
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


// @desc    Show add page
// @route   GET /essentialdata/synch
router.get("/essentialdata/synch", async (req, res) => {
  try {
    essentialDataUpload("essentialData");

    res.status(201).json({
      msg: "all essential data uploaded successfully",
    });
  } catch (err) {
    res.status(500).json({
      err,
    });
  }
});

// @desc    Show add page
// @route   GET /catalog/synch
router.get("/cms/synch", async (req, res) => {
  try {
    cmsComponentUpload("TopSellingComponent", await saveTopSellingComponent);
    //cmsComponentUpload('ProductCarouselComponent');
    res.status(201).json({
      msg: "all CMS data uploaded successfully",
    });
  } catch (err) {
    res.status(500).json({
      err,
    });
  }
});

// @desc    Show add page
// @route   GET /catalog/synch
router.get("/sampledata/synch", async (req, res) => {
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

    res.status(201).json({
      msg: "all sample data uploaded successfully",
    });
  } catch (err) {
    res.status(500).json({
      err,
    });
  }
});

// @desc    Show add page
// @route   GET /catalog/synch
router.get("/mediadata/synch", async (req, res) => {
  try {
    sampleMediaDataUpload("/data/media", saveMedia);
    res.status(201).json({
      msg: "all media files uploaded successfully",
    });
  } catch (err) {
    res.status(500).json({
      err,
    });
  }
});


// @desc    Show add page
// @route   GET data/b2b/sampledata/synch
router.get("/b2b/sampledata/synch", async (req, res) => {
  try {
    sampleDataUpload("accountData", saveB2BUnit);

    res.status(201).json({
      msg: "all sample data uploaded successfully",
    });
  } catch (err) {
    res.status(500).json({
      err,
    });
  }
});


module.exports = router;
