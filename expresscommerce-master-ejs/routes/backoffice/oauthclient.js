const express = require('express')
const router = express.Router()
const { body, validationResult } = require("express-validator");
const { ensureAuth } = require('../../middleware/auth')

const OAuthClientModel = require('../../models/OAuthClient')

const viewAll='/oauthclient/viewAll';

const listView='oauthclient/list';
const editView='oauthclient/edit';
const addView='oauthclient/add';
const _404View='error/404';
const _500errorView='error/500';


// @desc    Show add page
// @route   GET /oauthclient/add
router.get('/add', ensureAuth, (req, res) => {
    res.render(addView,{
      csrfToken:req.csrfToken()
    })

  })

// @desc    Process add form
// @route   POST /stories
router.post('/add', 
ensureAuth,[
body("clientId").notEmpty(), 
body("clientSecret").notEmpty(), 
body("clientSecret").notEmpty(), 
body("resourceIds").notEmpty(), 
body("scope").notEmpty(),
body("authorities").notEmpty(),
body("status").notEmpty()
], 
async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.render(addView, {
        clientId:req.body.clientId,
        clientSecret:req.body.clientSecret,
        resourceIds:req.body.resourceIds,
        scope:req.body.scope,
        authorities:req.body.authorities,
        status:req.body.status,
        csrfToken: req.csrfToken(),
        errorMessage:'One or more fields value missing',
        csrfToken: req.csrfToken()
      });
    } 
   const oauthclient= await OAuthClientModel.findOne({clientId:req.body.clientId});
   if(oauthclient){
    return res.render(addView,{
      clientId:req.body.clientId,
      clientSecret:req.body.clientSecret,
      resourceIds:req.body.resourceIds,
      scope:req.body.scope,
      authorities:req.body.authorities,
      status:req.body.status,
      csrfToken: req.csrfToken(),
      errorMessage:'AuthClient with same clientid already exist',
      csrfToken: req.csrfToken()
    });
   }else{
    await OAuthClientModel.create(req.body)
    return res.redirect(viewAll)
   }
  } catch (err) {
    console.error(err)
    return res.render(_500errorView)
  }
})
 

  
// @desc    Show all OAuthClient
// @route   GET /viewall
router.get('/viewAll', ensureAuth, async (req, res) => {
    try {
      const oauthclientList = await OAuthClientModel.find({}).lean();
       res.render(listView, {
        oauthclientList,
        csrfToken: req.csrfToken(),
      })
    } catch (err) {
      console.error(err)
      res.render(_500errorView)
    }
  })
  
  
// @desc    Show edit page
// @route   GET /oauthclient/:code
router.get('/:clientId', ensureAuth, async (req, res) => {
    try {
      const oauthclient = await OAuthClientModel.findOne({
        clientId: req.params.clientId,
      }).lean()
  
      if (!oauthclient) {
        return res.render(_404View)
      }
  
       return res.render(editView, {
          oauthclient,
          csrfToken: req.csrfToken()
        })
      
    } catch (err) {
      console.error(err)
      return res.render(_500errorView)
    }
  })
  
  // @desc    Update oauthclient
// @route   PUT /oauthclients/:_id
router.put('/:id', ensureAuth, async (req, res) => {
    try {
      let oauthclient = await OAuthClientModel.findById(req.params.id).lean()
      console.log(oauthclient);
      if (!oauthclient) {
        return res.render(_404View)
      }
  
      oauthclient = await OAuthClientModel.findOneAndUpdate({ _id: req.params.id }, req.body);
  
      res.redirect(viewAll)
      
    } catch (err) {
      console.error(err)
      return res.render(_500errorView)
    }
  })
  
  // @desc    Delete story
// @route   DELETE /oauthclients/remove/:id
router.delete('remove/:id', ensureAuth, async (req, res) => {
    try {
      console.log('delete query with param '+req.params.id);
      let oauthclient = await OAuthClientModel.findById({_id:req.params.id}).lean()
        if (!oauthclient) {
        return res.render(_404View);
      }
  
       await OAuthClientModel.remove({ _id: req.params.id })
       res.redirect(viewAll);
      
    } catch (err) {
      console.error(err)
      return res.render(_500errorView);
    }
  })
  
  module.exports = router