const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');

const FavouriteSchema = new mongoose.Schema({
  baseSite: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BaseSite',
    required: false,
  },
  name: {
    type: String,
    required: false,
  },
  code: {
    type: String,
    required: true,
    unique:true,
  },
  customer:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    }
  ],
  creationdate: {
    type: Date,
    default: Date.now,
  }
});
FavouriteSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Favourite', FavouriteSchema)
