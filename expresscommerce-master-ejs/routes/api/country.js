const express = require('express')
const router = express.Router()
const { ensureTokenAuth, checkBaseSite } = require('../../middleware/auth')
const CountryModel = require('../../models/Country');
const { getCountryList, getCountryByIsocode } = require('../../lib/country')
const { getRegionListByCountry, getRegionByIsoCode } = require("../../lib/region");


// @desc   get all Country List
// @route   GET /country
router.get('/:baseSiteId/countries', ensureTokenAuth, checkBaseSite, async (req, res) => {
  try {
    const countryList = await getCountryList();
    res.status(200).json(countryList);

  } catch (err) {
    console.error(err)
    res.status(500).json({
      error: err
    })
  }
})


// @desc   get country by isocode
// @route   GET country/:isocode
router.get('/:baseSiteId/countries/:isocode', ensureTokenAuth, checkBaseSite, async (req, res) => {
  try {

    const country = await getCountryByIsocode(req.params.isocode);
    if (!country)
      res.status(404).json({
        error: "invalid code"
      });

    res.status(200).json(country);

  } catch (err) {
    console.error(err)
    res.status(500).json({
      error: err
    })
  }
})

// @desc   get all region for a country
// @route   GET /country/:countryCode/regionList
router.get("/:baseSiteId/countries/:countryCode/regions", ensureTokenAuth, checkBaseSite, async (req, res) => {
  try {
    const country = await CountryModel.findOne({ isocode: req.params.countryCode });
    if (!country) {
      res.status(404).json({
        error: "invalid country",
      })
    }
    const regionList = await getRegionListByCountry(country);
    res.status(200).json(regionList);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err,
    });
  }
});

module.exports = router