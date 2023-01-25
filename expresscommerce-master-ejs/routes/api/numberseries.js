const express = require("express");
const router = express.Router();
const { ensureTokenAuth, checkBaseSite } = require("../../middleware/auth");
const { getCurrentNumber,generateNumber} = require("../../lib/numberseries");
// @desc   get all Currency List
// @route   GET /language
router.get('/:baseSiteId/numberseries/:key', ensureTokenAuth, checkBaseSite, async (req, res) => {
  try {
    const number = await generateNumber(req.params.key);
    res.status(200).json(number);

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
