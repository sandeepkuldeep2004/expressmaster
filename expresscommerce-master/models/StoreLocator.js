const mongoose = require('mongoose')
require('mongoose-bigdecimal');
var BigDecimal=require('big.js');

const StoreLocatorSchema = new mongoose.Schema({
  storeId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required:false,
  },
  storeContent: {
    type: String,
    required:false,
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
    required:true,
  },
  type: {
    type: String,
    required:false,
   },
   features:[
     
   ],
   mapIcon: {
    type: String,
    required:false,
  },
  storeImageUri: {
    type: String,
    required:false,
  },
  basesite: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BaseSite',
    required:true,
  },
  latitude: {
    type: mongoose.Schema.Types.BigDecimal,
    required:false,
  },
  longitude: {
    type: mongoose.Schema.Types.BigDecimal,
    required:false,
  },
  creationdate: {
    type: Date,
    default: Date.now,
  },
  modificationdate: {
    type: Date,
  },
  zipCode:{
    type:String,
    required:false,
  }
});
module.exports = mongoose.model('StoreLocator', StoreLocatorSchema)
