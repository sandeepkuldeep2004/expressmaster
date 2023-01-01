const NumberSeriesModel = require('../models/NumberSeries')

function padLeadingZeros(num, size) {
  var s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}
// @desc    get currentNumber of specific Key
//@param {key}
const getCurrentNumber = async function (key) {

  let numberSeries = await NumberSeriesModel.findOne({
    key: key
  }).lean();

  var trimmedString = padLeadingZeros(numberSeries.number, numberSeries.digits);
  let currentNumber = numberSeries.prefix + trimmedString;
  return currentNumber;
}


// @desc    generate the new number for specific Key
//@param {key}
const generateNumber = async function (key) {

  let numberSeries = await NumberSeriesModel.findOneAndUpdate({
    key: key
  }, {
    $inc: { number: +1 } // there is no $dec
  }, {
    new: true
  }
  ).lean();

  var trimmedString = padLeadingZeros(numberSeries.number, numberSeries.digits);
  let currentNumber = numberSeries.prefix + trimmedString;
  return currentNumber;
}


// @desc    get currentNumber of specific Key
//@param {key}
const getNumberSeries = async (key) => {
  return NumberSeriesModel.findOne({ key: key }).lean();
}

module.exports = {
  getCurrentNumber, getNumberSeries, generateNumber
}