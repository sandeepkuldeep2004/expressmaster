const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../../middleware/auth')

const Story = require('../../models/Story')

// @desc    Login/Landing page
// @route   GET /
router.get('/',ensureGuest, (req, res) => {
  res.render('login', {
    csrfToken: req.csrfToken() 
  })
})

// @desc    Dashboard
// @route   GET /dashboard
router.get('/dashboard', ensureAuth, async (req, res, next) => {
  try {
    const stories = await Story.find({ user: req.user.id }).lean()
    res.render('dashboard', {
      name: req.user.name,
      email: req.user.email,
      stories,
      dashboard:true,
      csrfToken: req.csrfToken(),
      })
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})
module.exports = router
