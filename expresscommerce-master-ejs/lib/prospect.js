const ProspectModel = require('../models/Prospect')

// @desc    fetch Prospect by email
//@param {email}
const getProspectByEmail = async function(email){ 
  return  ProspectModel.findOne({email:email}).lean();
}

// @desc   fetch all Prospect 
const getProspectList = async function(){ 
  return  ProspectModel.find({}).lean();
}


module.exports={
  getProspectByEmail,getProspectList
}