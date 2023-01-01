const BaseSiteModel = require('../models/BaseSite')
const OAuthClientModel = require('../models/OAuthClient')
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('properties/local.properties');

// @desc    fetch all active BaseSite
//@param {active}
const getBaseSiteList = async function (param) {
  return BaseSiteModel.find({ status: param }).sort({ creationdate: 'desc' }).lean();
}

// @desc    fetch BaseSite by code
//@param {active}
const getBaseSiteByCode = async function (code) {
  return BaseSiteModel.findOne({ code: code })
    .populate([
      { path: 'defaultCurrency', model: 'Currency' },
      { path: 'defaultLanguage', model: 'Language' },
    ]).lean();
}

// @desc    fetch Default BaseSite
//@param {}
const getDefaultBaseSite = async function () {
  let code = properties.get("DEFAULT_BASESITE_ID");
  return BaseSiteModel.findOne({ code: code })
    .populate([
      { path: 'defaultCurrency', model: 'Currency' },
      { path: 'defaultLanguage', model: 'Language' },
    ]).lean();
}

// @desc    fetch BaseSite by code
//@param {active}
const getBaseSiteById = async function (Id) {
  return await BaseSiteModel.findById(Id).lean();
}

// @desc    fetch BaseSite by oAuthCode
//@param {oAuthCode}
const getCurrentBaseSiteByOAuthCode = async function (oAuthCode) {
  const oAuthClient = await OAuthClientModel.findOne({ clientId: oAuthCode });
  if (oAuthClient) {
    const resourceId = oAuthClient.resourceIds;
    return BaseSiteModel.findOne({ code: resourceId }).lean();
  }

}



module.exports = {
  getBaseSiteList, getBaseSiteByCode, getCurrentBaseSiteByOAuthCode, getBaseSiteById, getDefaultBaseSite
}