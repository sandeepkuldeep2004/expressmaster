const express = require('express')
const router = express.Router()
const bcrypt = require("bcryptjs");

const { ensureTokenAuth } = require('../../middleware/auth')
const { getCurrencyByIsoCode } = require("../../lib/currency");
const { getCurrentBaseSiteByOAuthCode,getBaseSiteByCode } = require("../../lib/basesite");

const VoucherModel=require('../../models/Voucher');

// @desc create a catalog
// @route   POST /voucher
router.post('/:baseSite/voucher/create', ensureTokenAuth, async (req, res) => {

  const baseSitecode = req.params.baseSite;
  const currencyParam = req.body.currency || "USD";
  const currency = await getCurrencyByIsoCode(currencyParam);
  const baseSite = await getBaseSiteByCode(baseSitecode);
  let inputValue=req.body.type+req.body.amount+req.body.discountPercent+req.body.startDate+req.body.expiryDate;
  
  if(!currency || !baseSite){
    res.status(200).json({"status":"failure","message":"Base site or currency can't be null"});
  }
  let code="";
  console.log("baseSite",baseSite);
  const voucher = new VoucherModel({
    type: req.body.type,
    amount: req.body.amount,
    discountPercentage: req.body.discountPercent,
    startDate:req.body.startDate,
    expireDate:req.body.expiryDate,
    status: req.body.status,
    currency:currency,
    baseSite:baseSite
  });

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(inputValue, salt, (err, hash) => {
     voucher.code=hash;
     console.log('voucher code :'+hash);
      voucher.save(function(err) {
        if(err){
          res.status(404).json({
            err
          })
        }else{
           res.status(200).json({
           voucher
         })
        }
      });
    })
  });
  

  
})


 


  module.exports = router