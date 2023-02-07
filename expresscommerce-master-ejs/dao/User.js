const { ideahub_v1beta } = require("googleapis");
const UserModel = require("../models/User");
module.exports = {
  
  getAllUser:async function(){ 
    return  await UserModel.find({}).sort({ creationdate: "desc" }).lean();
  },
  getOneUser:async function(Id){ 
    return  await UserModel.findOne({_id: Id}).lean();
  }
  
};
