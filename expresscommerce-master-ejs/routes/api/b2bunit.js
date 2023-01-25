const express = require("express");
const router = express.Router();

const { ensureTokenAuth } = require("../../middleware/auth");
const { getB2BUnitList, getB2BUnitByCode } = require("../../lib/b2bunit");
const { getRegionByIsoCode } = require("../../lib/region");
const { getCountryByIsocode } = require("../../lib/country");
//const {getCon}=require("../../lib/contact");

const AddressModel = require("../../models/Address");
const B2BUnitModel = require("../../models/B2BUnit");



// @desc   get all b2bUnit List
// @route   GET /b2bunit
router.get("/", ensureTokenAuth, async (req, res) => {
  try {
    const b2bUnitList = await getB2BUnitList();
    res.status(200).json(b2bUnitList);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err,
    });
  }
});

// @desc   get warehouse by code
// @route   GET /b2bunit/code
router.get("/:code", ensureTokenAuth, async (req, res) => {
  try {
    const b2bunit = await getB2BUnitByCode(req.params.code);
    if (!b2bunit)
      res.status(404).json({
        error: "invalid code",
      });

    res.status(200).json(b2bunit);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err,
    });
  }
});

router.post("/", ensureTokenAuth, async (req, res) => {
  const oAuthClient = req.user;
  
  const country = await getCountryByIsocode(req.body.countryIsoCode);
  const region = await getRegionByIsoCode(req.body.regionIsoCode);

  const address = new AddressModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    fax: req.body.fax,
    dateOfBirth: req.body.dateOfBirth,
    gender: req.body.gender,
    pobox: req.body.pobox,
    cellphone: req.body.cellphone,
    phone1: req.body.phone1,
    phone2: req.body.phone2,
    appartment: req.body.appartment,
    building: req.body.building,
    streetno: req.body.streetno,
    streetname: req.body.streetname,
    city: req.body.city,
    postalCode: req.body.postalCode,
    region: region,
    country: country,
  });

  AddressModel.create(address,function(err,address) {
    if(err){
      res.status(505).json(err)
    }

  const b2bunit = new B2BUnitModel({
    code: req.body.code,
    vatid: req.body.vatid,
    name: req.body.name,
    salesOrg: req.body.salesOrg,
    distributionChannel: req.body.distributionChannel,
    division: req.body.division,
    shippingAddress:address,
    billingAddress:address,
    //contact:contact,
    //parentBusinessUnit:parentBusinessUnit,
  });

  B2BUnitModel.create(b2bunit,function(err){
    if(err){
      res.status(500).json(err)
    }
    res.status(201).json(b2bunit);
  })
   
});

})

module.exports = router;
