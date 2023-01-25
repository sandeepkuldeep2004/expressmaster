const ProductModel = require("../models/Product");
const { getCatalog } = require("../lib/catalog");
const { fetchCategoryByCode } = require("../lib/category");
const { getProduct } = require("../lib/product");


const categoryExists = (allCategories, category) => {
  return category && allCategories && allCategories.length > 0 && allCategories.some((el) => {
    return el && el._id.equals(category._id);
  });
}

module.exports = {
  saveCategoryProductRel: async (data) => {
    Object.entries(data).forEach(async (element) => {
      const catalog = await getCatalog(element[1].catalog);
      const product = await getProduct(element[1].productCode, catalog)
      var superCategories = []
      // checking if product exist in DB or not 
      if (product) {
        // checking if any existing category available or not.
        if (product.categories
          && null != product.categories
          && product.categories.length > 0) {
          const category = await fetchCategoryByCode(element[1].categoryCode, catalog);
          // checking if categoryCode is already associated with product or not.
          if (!categoryExists(product.categories, category)) {

            // checking if given category code available in DB or not 
            if (category) {
              superCategories.push(...product.categories);
              superCategories.push(category);

              ProductModel.findOneAndUpdate({ code: element[1].productCode, catalog: catalog }, {
                $set: {
                  categories: superCategories
                }
              }, function (err) {
                if (err)
                  console.log(err);
              })
            } else {
              console.log("source category with code ", element[1].target, " not found in system");
            }
          }
        } else {
          //product with single category
          const category = await fetchCategoryByCode(element[1].categoryCode, catalog);
          // checking if given category code available in DB or not 
          if (category) {
            superCategories.push(category);

            ProductModel.findOneAndUpdate({ code: element[1].productCode, catalog: catalog }, {
              $set: {
                categories: superCategories
              }
            }, function (err) {
              if (err)
                console.log(err);
            })
          } else {
            console.log("source category with code ", element[1].target, " not found in system");
          }

        }

      } else {
        console.log('product with code is not found in DB :', element[1].productCode)
      }
    });
  },
};
