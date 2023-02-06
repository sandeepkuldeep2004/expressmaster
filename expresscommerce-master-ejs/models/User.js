const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },  
  basesite: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BaseSite',
    required:false,
  },
  issuperadmin: {
    type: Boolean,
    default: false,
  },
  usergroup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserGroup',
    required:false,
  }
});
module.exports = mongoose.model('User', UserSchema)
