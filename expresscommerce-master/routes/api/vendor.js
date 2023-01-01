const express = require("express");
const router = express.Router();
const { ensureTokenAuth } = require("../../middleware/auth");
const { getVendorList, getVendorByCode } = require("../../lib/vendor");


// @desc   get all Vendor List
// @route   GET /Vendor
router.get('/', ensureTokenAuth, async (req, res) => {
  try {
    const vendorList = await getVendorList();
    res.status(200).json(vendorList);
  
  } catch (err) {
    console.error(err)
    res.status(500).json({
      error:err
    })
  }
})




// @desc   get Vendor region by Code
// @route   GET /code
router.get("/:code", ensureTokenAuth, async (req, res) => {
  try {
    const vendor = await getVendorByCode(req.params.code);
    if (!vendor)
      res.status(404).json({
        error: "invalid code"
      });

    res.status(200).json(vendor);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err,
    });
  }
});

module.exports = router;
