const express = require('express')
const router = express.Router()
const { ensureTokenAuth, checkUserGroup, checkBaseSite } = require('../../middleware/auth')
const { getCatalogList, getCatalog } = require('../../lib/catalog')


// @desc   get all Catalog List
// @route   GET /catalogs
router.get('/:baseSiteId/catalogs', ensureTokenAuth, checkUserGroup, checkBaseSite, async (req, res) => {
  try {
    const catalogs = await getCatalogList("active");
    res.status(200).json(catalogs);

  } catch (err) {
    console.error(err)
    res.status(500).json({
      error: err
    })
  }
})

// @desc create a catalog
// @route   GET /catalogs
router.post('/:baseSiteId/catalogs', ensureTokenAuth, checkBaseSite, async (req, res) => {

})


// @desc   get all Catalog List
// @route   GET /catalogs
router.get('/:baseSiteId/catalogs/:code', ensureTokenAuth, checkUserGroup, checkBaseSite, async (req, res) => {
  try {

    const catalog = await getCatalog(req.params.code);
    if (!catalog)
      res.status(404).json({
        error: "invalid code"
      });

    res.status(200).json(catalog);

  } catch (err) {
    console.error(err)
    res.status(500).json({
      error: err
    })
  }
})



module.exports = router