const express = require("express");
const router = express.Router();

const { ensureTokenAuth } = require("../../middleware/auth");
const { getWarehouseList, getWarehouseByCode } = require("../../lib/warehouse");

const WarehouseModel = require("../../models/Warehouse");
const { getVendorByCode } = require("../../lib/vendor");


// @desc   get all warehouse List
// @route   GET /warehouse
router.get("/", ensureTokenAuth, async (req, res) => {
  try {
    const warehouseList = await getWarehouseList();
    res.status(200).json(warehouseList);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err,
    });
  }
});

// @desc   get warehouse by code
// @route   GET /wareshouse/code
router.get("/:code", ensureTokenAuth, async (req, res) => {
  try {
    const warehouse = await getWarehouseByCode(req.params.code);
    if (!warehouse)
      res.status(404).json({
        error: "invalid code",
      });

    res.status(200).json(warehouse);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err,
    });
  }
});

router.post("/", ensureTokenAuth, async (req, res) => {
  const oAuthClient = req.user;
  const vendor=await getVendorByCode(req.body.vendorCode)
  
  const warehouse = new WarehouseModel({
    code: req.body.code,
    name: req.body.name,
    status: req.body.status,
    vendor:vendor
  });

  WarehouseModel.create(warehouse,function(err){
    if(err){
      res.status(500).json(err)
    }
    res.status(201).json(warehouse);
  })
   
});


module.exports = router;
