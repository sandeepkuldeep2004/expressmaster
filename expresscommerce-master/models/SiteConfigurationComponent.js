const mongoose = require('mongoose')

const SiteConfigurationComponentSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  baseSite: { /** Base Site**/
      type: mongoose.Schema.Types.ObjectId,  
      ref: "BaseSite",
      required: true,
  },
  searchAfterLetters: { /** auto suggest ***/
    type: Number,
    required: true,
  },
  productCounts: { /** PLP ***/
    type: Number,
    required: true,
  },
  orderCounts: { /** Order History ***/
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
module.exports = mongoose.model('SiteConfigurationComponent', SiteConfigurationComponentSchema)


