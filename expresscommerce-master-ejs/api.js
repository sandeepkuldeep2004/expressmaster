const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const methodOverride = require('method-override')
//const jwt= require('jsonwebtoken')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const connectDB = require('./config/db')
var cookieParser = require('cookie-parser')
const flash = require('express-flash')
var cors = require('cors')
const oneDay = 1000 * 60 * 60 * 24;

//Enable swagger UI for API View
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs');
//const swaggerDocument = require('./swagger.js');
// Load config
dotenv.config({ path: './config/config.env' })

connectDB()


const app = express()

// Body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(cors())

// Static folder
app.use(express.static(path.join(__dirname, 'public')))

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Sessions
app.use(
  session({
    secret: 'express secret',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
  }),
)

// for send flash messages
app.use(flash());

//Initialize the passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/occ/v2', require('./routes/api/index'))
app.use('/occ/v2', require('./routes/api/auth'))
app.use('/occ/v2', require('./routes/api/language'))
app.use('/occ/v2', require('./routes/api/currency'))
app.use('/occ/v2', require('./routes/api/catalogs'))
app.use('/occ/v2', require('./routes/api/customer'))
app.use('/occ/v2', require('./routes/api/category'))
app.use('/occ/v2', require('./routes/api/country'))
app.use('/api/vendor', require('./routes/api/vendor'))
app.use('/occ/v2', require('./routes/api/voucher'))
app.use('/occ/v2', require('./routes/api/region'))
app.use('/api/prospect', require('./routes/api/prospect'))
app.use('/api/warehouse', require('./routes/api/warehouse'))
app.use('/api/b2bunit', require('./routes/api/b2bunit'))
app.use('/api/accounts', require('./routes/api/account')) 
app.use('/api/order', require('./routes/api/order'))
app.use('/occ/v2', require('./routes/api/order'))
app.use('/occ/v2', require('./routes/api/myAccount'))

app.use('/occ/v2', require('./routes/api/search'))
app.use('/occ/v2', require('./routes/api/product'))

app.use('/occ/v2', require('./routes/api/customerReview'))
app.use('/api/minicart', require('./routes/api/cart'))

app.use('/occ/v2', require('./routes/api/cart'))
app.use('/occ/v2', require('./routes/api/checkout'))
app.use('/occ/v2', require('./routes/api/address'))
app.use('/occ/v2', require('./routes/api/numberseries'))
app.use('/occ/v2', require('./routes/api/topSellingComponent'))
app.use('/occ/v2', require('./routes/api/favourite'))
app.use('/occ/v2', require('./routes/api/brand'))
app.use('/occ/v2', require('./routes/api/rewards'))

app.use('/occ/v2', require('./routes/api/razorpay'))

// let express to use this for swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//handle 404 response
app.use((req, res, next) => {
  const error = new Error('requesting api not found');
  error.status = 404;
  res.status(500).send('This is invalid URl, requesting api not found !!!')
  next();
});

app.use((error, req, res, next) => {
  req.status = error.status || 500;
  res.json({
    error: {
      message: error.message
    }
  });

});

const APIPORT = process.env.APIPORT || 5000
app.listen(
  APIPORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${APIPORT}`)
)
