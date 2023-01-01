const express = require('express')
const router = express.Router()
const { body, validationResult } = require("express-validator");
const colors = require('colors');

const { ensureAuth } = require('../../middleware/auth')
const CurrencyModel = require('../../models/Currency')


const viewAll = "/currency/viewAll";
const listView = "currency/list";
const editView = "currency/edit";
const addView = "currency/add";
const _404View = "error/404";
const _500errorView = "error/500";



// @desc    Show add page
// @route   GET /currency/add
router.get('/add', ensureAuth, (req, res) => {
    res.render(addView,{
      csrfToken: req.csrfToken()
    })
  })

// @desc    create new catalog
// @route   POST /add
router.post('/add', ensureAuth, async (req, res) => {
  try {
    const currency = await CurrencyModel.findOne({
      isocode: req.body.isocode,
    }).lean();

    if(currency){
      console.log(colors.red('Currency with same code already exists.'));
      res.render(addView,{
        isocode:req.body.isocode,
        name:req.body.name,
        fallbackcurrency:req.body.fallbackcurrency,
        errorMessage:'Currency with same code already exists.'
      })
    }else{
      await CurrencyModel.create(req.body)
      res.redirect(viewAll);
    }
    
  } catch (err) {
    console.error(err)
    res.render(_500errorView)
  }
})
 

  
// @desc    Show all stories
// @route   GET /stories
router.get('/viewall', ensureAuth, async (req, res) => {
    try {
      const currencyList = await CurrencyModel.find({})
        .sort({ creationdate: 'desc' })
        .lean()
  
      res.render(listView, {
        currencyList,
        csrfToken: req.csrfToken(),
      })
    } catch (err) {
      console.error(err)
      res.render(_500errorView)
    }
  })
  
  
// @desc    Show edit page
// @route   GET /currency/edit/:code
router.get('/:isocode', ensureAuth, async (req, res) => {
    try {
      const currency = await CurrencyModel.findOne({
        isocode: req.params.isocode,
      }).lean()
  
      if (!currency) {
        return res.render(_404View)
      }
  
       res.render(editView, {
         currency,
        })
      
    } catch (err) {
      console.error(err)
      return res.render(_500errorView)
    }
  })
  
  // @desc    Update catalog
// @route   PUT /currency/:_id
router.put('/:id', ensureAuth, async (req, res) => {
    try {
      let currency = await CurrencyModel.findById(req.params.id).lean()
      console.log(currency);
      if (!currency) {
        return res.render(_404View)
      }
  
      currency = await CurrencyModel.findOneAndUpdate({ _id: req.params.id }, req.body);
  
      res.redirect(viewAll)
      
    } catch (err) {
      console.error(err)
      return res.render(_500errorView)
    }
  })
  
// @desc    Delete story
// @route   DELETE /currency/remove/:id
router.delete('remove/:id', ensureAuth, async (req, res) => {
    try {
      console.log('delete query with param '+req.params.id);
      let currency = await CurrencyModel.findById({_id:req.params.id}).lean()
        if (!currency) {
        return res.render(_404View)
      }
  
       await CurrencyModel.remove({ _id: req.params.id })
       res.redirect(viewAll)
      
    } catch (err) {
      console.error(err)
      return res.render(_500errorView)
    }
  })
  
  module.exports = router