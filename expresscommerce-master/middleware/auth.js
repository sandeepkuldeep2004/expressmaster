const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
const OAuthClientModel = require('../models/OAuthClient')
const BaseSiteModel = require('../models/BaseSite')
const _ = require('lodash');

const restrictedRoutes = [
  { route: '/api/catalogs', userGroup: 'customerGroup' },
  { route: '/api/vendor', userGroup: 'adminGroup' },
  { route: '/api/basesite', userGroup: 'adminGroup' },

  { route: '/api/product', method: 'GET', userGroup: 'customerGroup,adminGroup' },
  { route: '/api/product', method: 'POST', userGroup: 'adminGroup' },
  { route: '/api/product', method: 'DELETE', userGroup: 'adminGroup' },

  { route: '/api/category', method: 'GET', userGroup: 'customerGroup,adminGroup' },
  { route: '/api/category', method: 'POST', userGroup: 'adminGroup' },
  { route: '/api/category', method: 'DELETE', userGroup: 'adminGroup' },

];


module.exports = {
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    } else {
      res.redirect('/')
    }
  },
  ensureGuest: function (req, res, next) {
    if (req.isAuthenticated()) {
      res.redirect('/dashboard')
    } else {
      return next()
    }
  },

  forwardAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/dashboard');
  },

  ensureTokenAuth: function (req, res, next) {
    const headerToken = req.headers['authorization']
    const accessToken = headerToken && headerToken.split(' ')[1];
    console.log("Access Token :" + accessToken);

    if (accessToken == null) {
      return res.status(404).send({
        error: 'Invalid token'
      });
    }
    jwt.verify(accessToken, SECRET_KEY, (err, user) => {
      if (err) {

        return res.status(404).send({
          error: 'token not matching'
        })
      }
      // in case of valid token pass serialized object to request User and call next
      console.log("User Object :" + user);
      req.user = user;
      next();
    })
  },

  // It will ensure for customer specific token authentication
  ensureCustomerAuth: function (req, res, next) {
    const headerToken = req.headers['authorization']
    const accessToken = headerToken && headerToken.split(' ')[1];
    console.log("Access header Token :" + accessToken);
    console.log("session token: ", req.session.token);
    const sessionToken = req.session.token;
    /**if(accessToken==null || sessionToken != accessToken){
      return res.status(404).send( 'Access denied. Invalid token provided.');  
    } **/
    //Commented abve block to resolve session issue. To be fixed
    if (accessToken == null) {
      return res.status(404).send({
        error: 'Access denied. Invalid token provided.'
      });
    }

    try {
      jwt.verify(accessToken, SECRET_KEY, (err, customer) => {
        if (err) {
          return res.status(404).send({
            error: 'token not matching'
          })
        }
        console.log("Current customer :" + customer);
        req.customer = customer;
        next();
      })
    } catch (err) {
      res.status(400).send('Invalid token')
    }
  },

  checkUserGroup: function (req, res, next) {
    console.log("client Id :" + req.user);
    console.log(req.baseUrl);
    console.log(req.originalUrl);
    OAuthClientModel.findOne({ clientId: req.user })
      .then(function (oAuthClient) {
        req.userGroup = oAuthClient.authorities;
        console.log(" User Group set as " + req.userGroup);
        const routeCheck = _.find(restrictedRoutes, { route: req.baseUrl });
        if (routeCheck) {
          console.log(" API Required User Group  " + routeCheck.userGroup);
          if (req.userGroup === routeCheck.userGroup) {
            console.log(" API Required User Group matching");
          } else {
            res.status(404).send({
              error: 'Requested API not allowed'
            })
          }
        }
        next();
      })
      .catch(function (err) {
        res.status(404).send({
          error: 'token not matching'
        });
      })

  },

  checkBaseSite: function (req, res, next) {

    let baseSiteId = req.params.baseSiteId;
    const baseSite = null;
    BaseSiteModel.findOne({ code: baseSiteId })
      .then(function (baseSite) {
        if (baseSite == null) {
          res.status(404).send({ error: 'Given Base Site ' + baseSiteId + ' is invalid or not permitted to access.' });
          return;
        }
        baseSite = baseSite;
        next();

      })
      .catch(function (err) {
        res.status(404).send({
          error: 'Given Base Site ' + baseSiteId + ' is invalid or not permitted to access.'
        });
        return;
      })
  }


}
