const mongoose = require('mongoose')

const ProductCarouselComponentSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  products:[{
    type: mongoose.Schema.Types.ObjectId,  
    ref: "Product",
    required: true,
  }],
  catalog: { /** content catalog for rendering site**/
      type: mongoose.Schema.Types.ObjectId,  
      ref: "Catalog",
      required: true,
  },
  visibleToUserGroup:{
    type: mongoose.Schema.Types.ObjectId,  
    ref: "UserGroup",
    required: false,
  },
  transitionTime:{
    type: Number,
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  modificationDate: {
    type: Date,
  }
});
module.exports = mongoose.model('ProductCarouselComponent', ProductCarouselComponentSchema)


