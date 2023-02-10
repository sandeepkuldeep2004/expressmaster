const { populate } = require('../models/TopSellingComponent');
const TopSellingComponentModel = require('../models/TopSellingComponent')

// @desc    fetch top selling component by code and catalog
//@param {code, catalog}
const getTopSellingComponentByCode = async function (code, catalog) {
  return await TopSellingComponentModel.findOne({ code: code, catalog: catalog })
    .populate([
      { path: "products", model: "Product", populate: { path: "medias" } }
    ]).lean();
}

// @desc    fetch top selling component by id
//@param {id}
const getTopSellingComponentById = async function (id) {
  return TopSellingComponentModel.findById(id).lean();
}

// @desc    fetch top selling component by visible group
//@param {group, catalog}
const getTopSellingComponentByGroup = async function (group, catalog) {
  return TopSellingComponentModel.findOne({ visibleToUserGroup: group, catalog: catalog }).lean();
}


module.exports = {
  getTopSellingComponentByCode, getTopSellingComponentById, getTopSellingComponentByGroup
}