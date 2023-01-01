const mongoose = require('mongoose')

const CategoryNavigationComponentSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  JSON:[{
      type: String,
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
  creationDate: {
    type: Date,
    default: Date.now,
  },
  modificationDate: {
    type: Date,
  }
});
module.exports = mongoose.model('CategoryNavigationComponent', CategoryNavigationComponentSchema)
