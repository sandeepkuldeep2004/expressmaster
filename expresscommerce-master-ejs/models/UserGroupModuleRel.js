const mongoose = require('mongoose')

const UserGroupModuleRel = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  modulename: {
    type: String,
    required:false,
  },
  permision: {
    type: String,
    required:false,
  }

});
module.exports = mongoose.model('UserGroup', UserGroupSchema)
