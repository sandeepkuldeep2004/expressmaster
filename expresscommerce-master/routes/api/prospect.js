const express = require("express");
const router = express.Router();

const { ensureTokenAuth } = require("../../middleware/auth");
const { getProspectList, getProspectByEmail } = require("../../lib/prospect");
const { getRegionByIsoCode } = require("../../lib/region");
const { getCountryByIsocode } = require("../../lib/country");

const ProspectModel = require("../../models/Prospect");
const AddressModel = require("../../models/Address");

// @desc   get all Prospect List
// @route   GET /prospects
router.get("/", ensureTokenAuth, async (req, res) => {
  try {
    const prospectList = await getProspectList();
    res.status(200).json(prospectList);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err,
    });
  }
});

// @desc   get prospect by email
// @route   GET /prospect/email
router.get("/:email", ensureTokenAuth, async (req, res) => {
  try {
    const prospect = await getProspectByEmail(req.params.email);
    if (!prospect)
      res.status(404).json({
        error: "invalid code",
      });

    res.status(200).json(prospect);
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

    ProspectModel.create({
      email: req.body.email,
      name: req.body.name,
      address:address
    },function (err,prospect){
      if(err){
        res.status(505).json(err)
      }
      res.status(201).json(prospect);
    })
  })
  
});


router.post("/:email", ensureTokenAuth, async (req, res) => {
  const oAuthClient = req.user;
  const emailParam = req.params.email;
  const prospect = await getProspectByEmail(emailParam);
  const country = await getCountryByIsocode(req.body.countryIsoCode);
  const region = await getRegionByIsoCode(req.body.regionIsoCode);

  if (!prospect) {
    res.status(404).json({
      error: "Invalid email ",
    });
  }
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
    owner: prospect,
  });

  await ProspectModel.updateOne(
    { email: req.params.email },
    {
      $set: {
        name: req.body.name
    //    address: address,
      },
    },
    function (err) {
      if (err) {
        res.status(505).json(err);
      }
    }
  );
});

module.exports = router;
