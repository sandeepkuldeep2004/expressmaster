const mongoose = require('mongoose')

const TopSellingComponentSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  title: {
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
  creationdate: {
    type: Date,
    default: Date.now,
  },
  modificationdate: {
    type: Date,
  }
});
module.exports = mongoose.model('TopSellingComponent', TopSellingComponentSchema)
