const mongoose = require('mongoose')

const UserGroupSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required:false,
  },
  userPriceGroup: {
    type: String,
    required: false,
  },
  userTaxGroup: {
    type: String,
    required: false,
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserGroup',
    required:false,
  },
  accessmoules: {
    type: Array,
    default:[],
    required:false,
  },
  basesite: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BaseSite',
    required:false,
  },
  creationdate: {
    type: Date,
    default: Date.now,
  },
  modificationdate: {
    type: Date,
  },
  Status: {
    type: Boolean,
    default:true,
    required:false,
  }
});
module.exports = mongoose.model('UserGroup', UserGroupSchema)
