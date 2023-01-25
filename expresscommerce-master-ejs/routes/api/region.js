const express = require("express");
const router = express.Router();
const { ensureTokenAuth,checkBaseSite } = require("../../middleware/auth");
const { getRegionByIsoCode } = require("../../lib/region");



// @desc   get region by IsoCode
// @route   GET /isocode
router.get("/:baseSiteId/regions/:isocode", ensureTokenAuth,checkBaseSite, async (req, res) => {
  try {
    const region = await getRegionByIsoCode(req.params.isocode);
    if (!region)
      res.status(404).json({
        error: "invalid code"
      });

    res.status(200).json(region);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err,
    });
  }
});

module.exports = router;
