const { ensureAuth } = require('../middleware/auth')
const CatalogModel = require('../models/Catalog')
const CategoryModel = require('../models/Category')
const CountryModel = require('../models/Country')
const multer = require("multer")
const path = require("path")



// @desc    fetch all active Catalogs
//@param {active}
const getCatalogList = async function(param){ 
  return  CatalogModel.find({}).sort({ creationdate: 'desc' }).lean();
}

// @desc    fetch all active Catalogs
//@param {active}
const getCategoryList = async function(param){ 
  return  CategoryModel.find({}).sort({ creationdate: 'desc' }).lean();
}


// @desc    fetch all active Catalogs
//@param {active}
const getCountryList = async function(param){ 
  return  CountryModel.find({}).sort({ name: 'asc' }).lean();
}

var storage = multer.diskStorage({
  destination: function (req, file, cb) {

      // Uploads is the Upload_folder_name
      cb(null, "data/uploadImpex")
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname +".json")
  }
})

var upload = multer({ 
  storage: storage,
  limits: { fileSize: 1 * 1000 * 1000 },
  fileFilter: function (req, file, cb){
  
      // Set the filetypes, it is optional
      var filetypes = /json/;
      var mimetype = filetypes.test(file.mimetype);
      console.log(file);

      var extname = filetypes.test(path.extname(
                  file.originalname).toLowerCase());
      
      if (mimetype && extname) {
          return cb(null, true);
      }
    
      cb("Error: File upload only supports the "
              + "following filetypes - " + filetypes);
    } 

// essentialData is the name of file attribute
}).single("essentialData");   

module.exports={
    getCatalogList, getCategoryList,getCountryList,upload
}