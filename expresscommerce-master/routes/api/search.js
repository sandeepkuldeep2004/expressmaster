const express = require("express");
const router = express.Router();
const { ensureTokenAuth,checkBaseSite } = require("../../middleware/auth");
const { searchProductsByTerm, searchProductsByCategoryCode, searchProductsByBrandName } = require('../../lib/indexer');

// @desc   search products from solr based on term
// @route   GET /search/autocomplete/product?term=cam
router.get('/:baseSiteId/products/search', ensureTokenAuth, checkBaseSite, async (req, res) => {
  try {
    let baseSiteId = req.params.baseSiteId;
    let currentPage = req.query.currentPage;
    let pageSize = req.query.pageSize;
    let query = req.query.query;
    let sort = req.query.sort;
    let fields = req.query.fields;
    console.log(baseSiteId + '|' + currentPage + '|' + pageSize + '|' + query + '|' + sort + '|' + fields);
    const products = await searchProductsByTerm(query, currentPage, pageSize, sort);
    res.status(200).json(products);

  } catch (err) {
    console.error(err)
    res.status(500).json({
      error: err
    })
  }
});


// @desc   search products from solr based on categoryCode
// @route   GET /search/c/:categorycode
router.get('/:baseSiteId/products/search/:categoryCode', ensureTokenAuth, checkBaseSite, async (req, res) => {
  try {
    const query = req.params.categoryCode
    console.log(query);
    let baseSiteId = req.params.baseSiteId;
    let currentPage = req.query.currentPage;
    let pageSize = req.query.pageSize;
    let sort = req.query.sort;
    let fields = req.query.fields;
    console.log(baseSiteId + '|' + currentPage + '|' + pageSize + '|' + query + '|' + sort + '|' + fields);

    const products = await searchProductsByCategoryCode(query, currentPage, pageSize, sort);

    res.status(200).json(products);

  } catch (err) {
    console.error(err)
    res.status(500).json({
      error: err
    })
  }
});


// @desc   search products from solr based on brandName
// @route   GET /search/c/:categorycode
router.get('/:baseSiteId/products/search/brands/:brandName', ensureTokenAuth, checkBaseSite, async (req, res) => {
  try {
    const query = req.params.brandName
    console.log(query);
    let baseSiteId = req.params.baseSiteId;
    let currentPage = req.query.currentPage;
    let pageSize = req.query.pageSize;
    let sort = req.query.sort;
    let fields = req.query.fields;
    console.log(baseSiteId + '|' + currentPage + '|' + pageSize + '|' + query + '|' + sort + '|' + fields);

    const products = await searchProductsByBrandName(query, currentPage, pageSize, sort);

    res.status(200).json(products);

  } catch (err) {
    console.error(err)
    res.status(500).json({
      error: err
    })
  }
});

module.exports = router;
