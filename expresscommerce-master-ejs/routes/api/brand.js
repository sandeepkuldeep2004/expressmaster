const express = require('express')
const router = express.Router()
const { ensureTokenAuth, checkBaseSite } = require('../../middleware/auth')
const { getAllBrandData } = require("../../lib/brand");
// @desc   get all brands for site 
// @route   GET /occ/v2/{baseSiteId}/brands
router.get('/:baseSiteId/brands', ensureTokenAuth, checkBaseSite, async (req, res) => {
  try {
    let brands = await getAllBrandData();
    return res.status(200).json(brands);
  } catch (err) {
    console.error(err)
    return res.status(500).json({
      error: err
    })
  }
})


module.exports = router