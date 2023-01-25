const mongoose = require('mongoose')

const OAuthClientSchema = new mongoose.Schema({
  clientId: {
    type: String,
    required: true,
  },
  clientSecret: {
    type: String,
    required:true,
  },
  resourceIds: {
    type: String,
    required:false,
  },
  scope: {
    type: String,
    required:false,
  },
  authorities: {
    type: String,
    required:false,
  },
  registeredRedirectUri: {
    type: String,
    required:false,
  },
  active: {
    type: Boolean,
    default:true,
  }
});
module.exports = mongoose.model('OAuthClient', OAuthClientSchema)
