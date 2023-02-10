const CampaignModel = require('../models/Campaign')

// @desc    fetch all active Campaign
//@param {active}
const getCampaignList = async function(param){ 
  return  CampaignModel.find({status:param}).lean();
}

// @desc   
//@param {active}
const getCampaign = async function(code){ 
  return  CampaignModel.findOne({code:code}).lean();
}


module.exports={
    getCatalogList: getCampaignList, getCampaign
}