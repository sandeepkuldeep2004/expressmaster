const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  ean: {
    type: String,
    required: false,
  },
  localizedName: [
    {
      lang: String,
      value: String
    }
  ],
  title: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  productType: {
    type: String,
    required: true,
    default: "ORDINARY",
    enum: ["ORDINARY", "VARIANT", "BUNDLE", "WARRANTY", "DIGITAL"],
  },
  localizedDescription: [
    {
      lang: String,
      value: String
    }
  ],
  unit: {
    type: String,
    default: "EA",
    enum: ["EA", "NOS", "PKG", "KIT", "KG", "GM", "MTR", "CM", "LTR"],
  },
  baseProduct: { /* This property is only for variant product*/
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: false,
  },
  consistOfProducts: [ /* This property is only for bundle product*/
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BundleEntry",
    }
  ],
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: false,
  }],
  medias: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Media",
    required: false,
  }],
  variants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: false,
  }],
  status: {
    type: String,
    default: "ACTIVE",
    enum: ["ACTIVE", "INACTIVE", "SUSPENDED"],
  },
  inUseStatus: {
    type: String,
    default: "CONTEMPORARY",
    enum: ["NEW", "OBSOLETE", "CONTEMPORARY", "TREND"],
  },
  fsnStatus: {
    type: String,
    default: "FASTMOVING",
    enum: ["FASTMOVING", "SLOWMOVING", "NONMOVING"],
  },
  onSale: {
    type: Boolean,
    default: false
  },
  isPerishable: {
    type: Boolean,
    default: false
  },
  expiryDate: {
    type: Date,
    required: false,
  },
  creationdate: {
    type: Date,
    default: Date.now,
  },
  modificationdate: {
    type: Date,
  },
  catalog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Catalog',
    required: true,
  },
  mainImage: {
    type: String,
    required: false,
  },
  thumbnailImage: {
    type: String,
    required: false,
  },
  color: {
    type: String,
    required: false,
  },
  size: {
    type: String,
    required: false,
  },
  brand: {
    type: String,
    required: false,
  },
  purchasable: {
    type: Boolean,
    required: true,
    default: true
  }
});
module.exports = mongoose.model("Product", ProductSchema);
