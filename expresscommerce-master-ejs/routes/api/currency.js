const express = require("express");
const router = express.Router();
const { ensureTokenAuth, checkBaseSite } = require("../../middleware/auth");
const { getCurrencyList, getCurrencyByIsoCode } = require("../../lib/currency");
const { getBaseSiteByCode } = require("../../lib/basesite");
// @desc   get all Currency List
// @route   GET /language
router.get('/:baseSiteId/currences', ensureTokenAuth, checkBaseSite, async (req, res) => {
  try {
    const currencyList = await getCurrencyList();
    res.status(200).json(currencyList);

  } catch (err) {
    console.error(err)
    res.status(500).json({
      error: err
    })
  }
})




// @desc   get language region by IsoCode
// @route   GET /isocode
router.get("/:baseSiteId/currences/:isocode", ensureTokenAuth, checkBaseSite, async (req, res) => {
  try {

    const currency = await getCurrencyByIsoCode(req.params.isocode);
    if (!currency)
      res.status(404).json({
        error: "invalid code"
      });

    res.status(200).json(currency);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err,
    });
  }
});

module.exports = router;
