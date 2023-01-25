const mongoose = require('mongoose')

//const SuperCategorySchema = new Schema(CategorySchema);
const CategorySchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  localizedName: [
    {
      lang: String,
      value: String
    }],
  description: {
    type: String,
    required: false,
  },
  rank: {
    type: Number,
    required: false,
    default:100
  },
  visible: {
    type: Boolean,
    required: true,
    default:true
  },
  superCategories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: false,
  }],
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: false,
  }],
  catalog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Catalog',
    required: true,
  },
  status: {
    type: String,
    default: 'active',
    enum: ['active', 'inactive'],
  },
  creationdate: {
    type: Date,
    default: Date.now,
  },
  modificationdate: {
    type: Date,
  }
});
module.exports = mongoose.model('Category', CategorySchema)
