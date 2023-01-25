const UserGroupModel = require('../models/UserGroup')


// @desc    fetch Usergroup by code
//@param {code}
const getUserGroup = async function(code){ 
  return  UserGroupModel.findOne({code:code}).lean();
}


module.exports={
    getUserGroup
}