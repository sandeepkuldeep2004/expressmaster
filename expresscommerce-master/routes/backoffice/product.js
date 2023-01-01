const express = require("express");
const router = express.Router();
const ProductModel = require('../../models/Product')
const { searchProductById, searchAllProducts, searchProductsByTerm } = require('../../lib/indexer');
const { saveProductViaWeb } = require("../../dao/Product");

const { getProductDTOByProductModel } = require("../../lib/product");

const { getProducts } = require("./product");

// @desc   search products from solr based on term
// @route   GET /products/search
router.post('/search', async (req, res) => {
  try {
    const term = req.body.keyword
    console.log(term);
    const response = await searchProductsByTerm(term);
    var products = {
      result: response.docs,
      total: response.numFound,
      error: response.error
    }
    res.render("products/list", {
      products,
      csrfToken: req.csrfToken()
    });
  } catch (err) {
    console.error(err)
    res.status(500).json({
      error: err
    })
  }
});
// @desc    Search ALL Products
// @route   GET /products
router.get("/", async (req, res) => {
  try {
    console.log("****************")
    // add solr call
    const products = await getProducts();
    let productDTOs = await populateProduct(products)
    var response = {
      result: productDTOs,
      total: products.length,
    }
    console.log("All customers details is ::",customers)
    res.render("products/list", {
      response,
      csrfToken: req.csrfToken()
    });
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

async function populateProduct(products) {
  let productDTOs = [];
  for (product of products) {
    let productDTO = await getProductDTOByProductModel(product)
    productDTOs.push(productDTO);
  };
  return productDTOs;
}

// @desc    Delete product from DB
// @route   DELETE /products/remove/:id
router.delete("/remove/:id", async (req, res) => {
  try {
    console.log(req.params)
    // removeCustomerInSolr(req.params.id);
    res.redirect("/products");
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
});


// @desc    Show product edit page
// @route   GET /products/update/:id
router.get("/update/:id", async (req, res) => {
  try {
    const product = await searchProductById(req.params.id);

    console.log("All product details is ::", product)
    if (!product) {
      return res.render("error/404");
    }

    res.render("products/edit", {
      product,
      csrfToken: req.csrfToken()
    });
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
});

// @desc    Update Product inDB
// @route   PUT /products/update/:id
router.put("/update/:id", async (req, res) => {
  try {
    //await updateCustomerInSolr(req.body);

    res.redirect("/products");
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
});

// @desc    Show add page
// @route   GET /solr/customer/add
router.get("/add", async (req, res) => {
  res.render("products/add", {
    csrfToken: req.csrfToken(),
  });
});

// @desc    Create Customer in solr index
// @route   POST /solr/customer/add
router.post("/add", async (req, res) => {
  try {
    //await createCustomerInSolr(req.body);
    var response = await saveProductViaWeb(req.body);
    console.log("Product creation response: ", response);
    res.render("products/add", {
      error: response
    });
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
});

module.exports = router
