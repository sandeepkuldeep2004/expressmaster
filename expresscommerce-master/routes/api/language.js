const express = require("express");
const router = express.Router();
const { ensureTokenAuth, checkBaseSite } = require("../../middleware/auth");
const { getLanguageList, getLanguageByIsoCode } = require("../../lib/language");
const { getBaseSiteByCode } = require("../../lib/basesite");

// @desc   get all Language List
// @route   GET /language
router.get('/:baseSiteId/languages', ensureTokenAuth, checkBaseSite, async (req, res) => {
  try {
    const languageList = await getLanguageList();
    res.status(200).json(languageList);

  } catch (err) {
    console.error(err)
    res.status(500).json({
      error: err
    })
  }
})




// @desc   get language region by IsoCode
// @route   GET /isocode
router.get("/:baseSiteId/languages/:isocode", ensureTokenAuth, checkBaseSite, async (req, res) => {
  try {
    const language = await getLanguageByIsoCode(req.params.isocode);
    if (!language)
      res.status(404).json({
        error: "invalid code"
      });

    res.status(200).json(language);
  } catch (err) {
    console.error(err);
    res.json({
      error: err,
    });
  }
});

module.exports = router;
