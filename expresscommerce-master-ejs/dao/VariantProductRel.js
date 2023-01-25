const ProductModel = require("../models/Product");
const { getCatalog } = require("../lib/catalog");
const { fetchCategoryByCode } = require("../lib/category");
const { getProduct } = require("../lib/product");


const categoryExists = (allCategories, category) => {
  return category && allCategories && allCategories.length > 0 && allCategories.some((el) => {
    return el && el.equals(category._id);
  });
}

module.exports = {
  saveVariantProductRel: async (data) => {
    for (element of Object.entries(data)) {
      //  Object.entries(data).forEach(async (element) => {
      console.log('Product Variant Relation set base:: ', element[1].base, ' variants::', element[1].variants, ' catalog::', element[1].catalog)

      const catalog = await getCatalog(element[1].catalog);
      const product = await getProduct(element[1].base, catalog)

      // checking if product exist in DB or not 
      if (product) {
        var variants = element[1].variants.split('|')
        var variantOptions = []
        if (variants && variants.length > 0) {
          //set base products in variant products
          for (variant of variants) {
            console.log('variant:: ', variant)

            let variantModel = await ProductModel.findOneAndUpdate(
              { code: variant, catalog: catalog },
              {
                $set: {
                  baseProduct: product,
                }
              },
              { new: true }
            ).lean();
            //  console.log("Updated Variant Product is :: ", variantModel)
            variantOptions.push(variantModel)
          }

          //set variant options into base product
          if (variantOptions && variantOptions.length > 0) {
            let baseProductModel = await ProductModel.findOneAndUpdate(
              { code: element[1].base, catalog: catalog },
              {
                $set: {
                  variants: variantOptions,
                }
              },
              { new: true }
            ).lean();
            //  console.log("Updated Base Product is :: ", baseProductModel)
          }
        }
      } else {
        console.log('base product with code is not found in DB :', element[1].base)
      }
    };
  },
};
