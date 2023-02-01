const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const methodOverride = require('method-override')
const flash = require('connect-flash');
const passport = require('passport')
const session = require('express-session')
var cookieParser = require('cookie-parser')
var csrf = require('csurf')

var cors = require('cors')

const MongoStore = require('connect-mongo')
const connectDB = require('./config/db')
const {cronJob} = require('./lib/schedulers')
const NavigationModel = require('./models/LeftNavigation')

require('./routes/backoffice/productindex')

cronJob.start()
// Load config
dotenv.config({ path: './config/config.env' })

// Passport config
require('./config/passport')(passport)

connectDB()

// setup route middlewares
var csrfProtection = csrf({ cookie: true })
const app = express()



// Body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(cors())


// parse cookies
// we need this because "cookie" is true in csrfProtection
app.use(cookieParser())


// Method override
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method
      delete req.body._method
      return method
    }
  })
)



// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'viewsejs'));

const {collectionTest} = require('./middleware/auth')
//collectionTest();


// Sessions
app.use(
  session({
    secret: 'express secret',
    resave: false,
    saveUninitialized: false,
   // store: new MongoStore({ mongooseConnection: mongoose.connection }),
   store: MongoStore.create({
    mongoUrl:process.env.MONGO_URI
    }),
  })
)



//csrf middleware 
app.use(csrfProtection);

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Connect flash
app.use(flash());

// Global variables


  app.use(async function(req, res,next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    var leftNavigation=[];
    try{
    res.locals.SubNavigationCount =0;
   var leftMenuList = await NavigationModel.find();
if (leftMenuList) {
    for (moduleListIrr of leftMenuList) {
   var leftMenuArray= moduleListIrr.leftMenu;
    if(leftMenuArray!=''){
     leftNavigation.push(JSON.parse(leftMenuArray));
    }
  }
   res.locals.SubleftNavigation =leftNavigation;
   res.locals.SubNavigationCount =leftNavigation.length;
  }

} catch (err) {
  res.status(500).json({
    err,
  });
}
   next();
     
  });
  

// Set global var
app.use(function (req, res, next) {
  res.locals.user = req.user || null;
  // console.log(req.baseUrl);  
  next()
})

// Global variables
// Static folder
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', require('./routes/backoffice/index'))
app.use('/solr',require('./routes/backoffice/solrIndex'))
app.use('/campaigns', require('./routes/backoffice/campaign'))
app.use('/users',require('./routes/backoffice/user_auth'))
app.use('/usergroup', require('./routes/backoffice/userGroup'))
app.use('/oauthclient', require('./routes/backoffice/oauthclient'))
app.use('/region', require('./routes/backoffice/region'))
app.use('/country', require('./routes/backoffice/country'))
app.use('/basesite', require('./routes/backoffice/basesite'))
app.use('/catalogs', require('./routes/backoffice/catalog'))
app.use('/data', require('./routes/backoffice/dataSync'));
app.use('/category', require('./routes/backoffice/category'))
app.use('/vendors', require('./routes/backoffice/vendor'))
app.use('/stories', require('./routes/backoffice/stories'))
app.use('/language', require('./routes/backoffice/language'))
app.use('/currency', require('./routes/backoffice/currency'))
app.use('/sync', require('./routes/backoffice/ctorder'))
app.use('/products', require('./routes/backoffice/productindex'))
app.use('/navigation', require('./routes/backoffice/navigation'))
app.use('/subnavigation', require('./routes/backoffice/subnavigation'))


const PORT = process.env.PORT || 3000

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
