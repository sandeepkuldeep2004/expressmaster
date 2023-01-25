const express = require('express')
const router = express.Router()
const { ensureTokenAuth, checkBaseSite } = require('../../middleware/auth')
const { getCustomerByUid } = require("../../lib/customer");
const { getFavouriteByCustomer,getFavouriteNamesByCustomer } = require("../../lib/favourite")
const { saveProductInWishlist, removeProductFromWishlist } = require("../../dao/Favourite")
const { body, validationResult } = require('express-validator');
// @desc   get all wish list of the customer 
// @route   GET /occ/v2/{baseSiteId}/customers/{customerId}/favourites
router.get('/:baseSiteId/customers/:customerId/favourites', ensureTokenAuth, checkBaseSite, async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const customer = await getCustomerByUid(customerId);
    let wishlist = await getFavouriteByCustomer(customer);
    return res.status(200).json(wishlist);

  } catch (err) {
    console.error(err)
    return res.status(500).json({
      error: err
    })
  }
})

// @desc   get all wish list names of the customer 
// @route   GET /occ/v2/{baseSiteId}/customers/{customerId}/favourites
router.get('/:baseSiteId/customers/:customerId/favourites/list', ensureTokenAuth, checkBaseSite, async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const customer = await getCustomerByUid(customerId);
    let wishlist = await getFavouriteNamesByCustomer(customer);
    return res.status(200).json(wishlist);

  } catch (err) {
    console.error(err)
    return res.status(500).json({
      error: err
    })
  }
})

// @desc   save product into customer's wish list
// @route   GET /occ/v2/{baseSiteId}/customers/{customerId}/favourites
router.post('/:baseSiteId/customers/:customerId/favourites',
  ensureTokenAuth,
  checkBaseSite,
  body('productCode').notEmpty().withMessage("product code is required"),
  body('name').notEmpty().withMessage("Wish list name is required"),
  async (req, res) => {

    // Validate incoming input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    try {
      const customerId = req.params.customerId;
      const baseSiteId = req.params.baseSiteId;
      const customer = await getCustomerByUid(customerId);
      const productCode = req.body.productCode;
      const name = req.body.name;

      let wishlist = await saveProductInWishlist(baseSiteId, customer, productCode, name);
      return res.status(200).json(wishlist);

    } catch (err) {
      console.error(err)
      return res.status(500).json({
        error: err
      })
    }
  })


// @desc   Remove product from customer's wish list
// @route   DELETE /occ/v2/{baseSiteId}/customers/{customerId}/favourites
router.delete('/:baseSiteId/customers/:customerId/favourites',
  ensureTokenAuth,
  checkBaseSite,
  body('productCode').notEmpty().withMessage("product code is required"),
  body('name').notEmpty().withMessage("Wish list name is required"),
  async (req, res) => {

    // Validate incoming input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    try {
      const customerId = req.params.customerId;
      const baseSiteId = req.params.baseSiteId;
      const customer = await getCustomerByUid(customerId);
      const productCode = req.body.productCode;
      const name = req.body.name;

      let wishlist = await removeProductFromWishlist(baseSiteId, customer, productCode, name);
      return res.status(200).json(wishlist);

    } catch (err) {
      console.error(err)
      return res.status(500).json({
        error: err
      })
    }
  })

module.exports = router