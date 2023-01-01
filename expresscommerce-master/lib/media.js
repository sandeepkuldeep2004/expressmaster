const MediaModel = require('../models/Media')

// @desc    fetch media with code
//@param {code}
const getMedia = async (code) => {
  //console.log(" fetching catalog:: ",code)
  var media = await MediaModel.findOne({ code: code })
    .populate(
      { path: 'catalog', select: 'code' }
    ).lean();
  //console.log(" fetching catalog res:: ",catalog)
  return media;
}

// @desc    fetch media with code
//@param {code}
const getMediaWithCatalog = async (code, catalog) => {
  //console.log(" fetching catalog:: ",code)
  var media = await MediaModel.findOne({ code: code, catalog: catalog })
    .populate(
      { path: 'catalog', select: 'code' }
    ).lean();
  //console.log(" fetching catalog res:: ",catalog)
  return media;
}
// @desc    fetch media by ID
//@param {id}
const getMediaById = async function (id) {
  return await MediaModel.findById(id)
    .populate(
      { path: 'catalog', select: 'code' }
    ).lean();
}

module.exports = {
  getMedia, getMediaWithCatalog, getMediaById
}