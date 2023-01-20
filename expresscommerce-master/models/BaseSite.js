const mongoose = require('mongoose')

const BaseSiteSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  urls:[ {
    type: String,
    required: true
  }],
  productCatalog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Catalog',
    required:false,
  },
  contentCatalog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Catalog',
    required:false,
  },
  defaultCurrency: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Currency',
    required:false,
  },
  defaultLanguage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Language',
    required:false,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required:false,
  },
  status: {
    type: String,
    default: 'active',
    enum: ['active', 'inactive'],
  },
  creationdate: {
    type: Date,
    default: Date.now,
  },
  modificationdate: {
    type: Date,
  }
});
module.exports = mongoose.model('BaseSite', BaseSiteSchema)
