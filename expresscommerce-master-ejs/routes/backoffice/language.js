const express = require('express')
const router = express.Router()
const { body, validationResult } = require("express-validator");
const colors = require('colors');

const { ensureAuth } = require('../../middleware/auth')
const LanguageModel = require('../../models/Language')


const viewAll = "/language/viewAll";
const listView = "language/list";
const editView = "language/edit";
const addView = "language/add";
const _404View = "error/404";
const _500errorView = "error/500";



// @desc    Show add page
// @route   GET /language/add
router.get('/add', ensureAuth, (req, res) => {
    res.render(addView,{
      csrfToken: req.csrfToken()
    })
  })

// @desc    create new catalog
// @route   POST /add
router.post('/add', ensureAuth, [body("isocode").notEmpty(), body("name").notEmpty()], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
     return res.render(addView, {
        isocode: req.body.isocode,
        name: req.body.name,
        errorMessage: "One or more value for mandatory field(s) missing",
        csrfToken: req.csrfToken(),
      });
    }

    const language = await LanguageModel.findOne({ isocode: req.body.isocode}).lean();

    if(language){
      console.log(colors.red('Language with same code already exists.'));
      return res.render(addView,{
        isocode:req.body.isocode,
        name:req.body.name,
        fallbacklanguage:req.body.fallbacklanguage,
        errorMessage:'Language with same code already exists.',
        csrfToken: req.csrfToken()
      })
    }else{
      await LanguageModel.create(req.body)
      return res.redirect(viewAll);
    }
    
  } catch (err) {
    console.error(err);
    res.render(_500errorView);
  }
})
 

  
// @desc    Show all stories
// @route   GET /languageList
router.get('/viewall', ensureAuth, async (req, res) => {
    try {
      const languageList = await LanguageModel.find({})
        .sort({ creationdate: 'desc' })
        .lean()
  
      res.render(listView, {
        languageList,
        csrfToken: req.csrfToken(),
      })
    } catch (err) {
      console.error(err)
      res.render(_500errorView)
    }
  })
  
  
// @desc    Show edit page
// @route   GET /language/edit/:isocode
router.get('/:isocode', ensureAuth, async (req, res) => {
    try {
      const language = await LanguageModel.findOne({
        isocode: req.params.isocode,
      }).lean()
  
      if (!language) {
        return res.render(_404View)
      }
  
       res.render(editView, {
         language,
         csrfToken: req.csrfToken()
        })
      
    } catch (err) {
      console.error(err)
      return res.render(_500errorView)
    }
  })
  
  // @desc    Update catalog
// @route   PUT /language/:_id
router.put('/:id', ensureAuth, async (req, res) => {
    try {
      let language = await LanguageModel.findById(req.params.id).lean()
      console.log(language);
      if (!language) {
        return res.render(_404View)
      }
  
      language = await LanguageModel.findOneAndUpdate({ _id: req.params.id }, req.body);
  
      res.redirect(viewAll)
      
    } catch (err) {
      console.error(err)
      return res.render(_500errorView)
    }
  })
  
// @desc    Delete story
// @route   DELETE /language/remove/:code
router.delete('remove/:id', ensureAuth, async (req, res) => {
    try {
      console.log('delete query with param '+req.params.id);
      let language = await LanguageModel.findById({_id:req.params.id}).lean()
        if (!language) {
        return res.render(_404View)
      }
  
       await LanguageModel.remove({ _id: req.params.id })
       res.redirect(viewAll)
      
    } catch (err) {
      console.error(err)
      return res.render(_500errorView)
    }
  })
  
  module.exports = router