//Routes Code Below
const express = require("express");
const router = express.Router();
const { getStores, getStoreByZipCode } = require("../../lib/storeLocator");
const { ensureTokenAuth,checkBaseSite } = require("../../middleware/auth");
// @desc get all stores
// @route GET //:baseSiteId/stores
router.get("/:baseSiteId/stores", ensureTokenAuth,checkBaseSite, async (req,
res) => {
try {
const stores = await getStores();
console.log("Total number of Stores:::", stores.length)
res.status(200).json(stores);
} catch (err) {
console.error(err);
res.status(500).json({
error: err,
});
}
});
// @desc get stores by zipCode
// @route GET //:baseSiteId/stores/:zip_Code
router.get("/:baseSiteId/stores/searchstores/:zip_Code", ensureTokenAuth, checkBaseSite,
async(req,res)=>{
try
{
const zip_Code=req.params.zip_Code
const store_Models=await getStoreByZipCode(zip_Code)
return res.status(200).json(store_Models)
}
catch(err)
{
console.log(err)
return res.status(500).json({
error:err
})
}
})
module.exports = router;