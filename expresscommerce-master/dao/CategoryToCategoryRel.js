const CategoryModel = require("../models/Category");
const { getCatalog } = require("../lib/catalog");
const { fetchCategoryByCode } = require("../lib/category");


const categoryExists = (allCategories, category) => {
  return category && allCategories && allCategories.length > 0 && allCategories.some((el) => {
    return el && el.code === category;
  });
}
module.exports = {
  saveCategoryToCategoryRel: async (data) => {
    Object.entries(data).forEach(async (element) => {
      const catalog = await getCatalog(element[1].catalog);
      const targetCategory = await fetchCategoryByCode(element[1].target, catalog);

     // var superCategories = []
      if (targetCategory && targetCategory.superCategories
        && null != targetCategory.superCategories
        && targetCategory.superCategories.length > 0) {
          console.log("category to category rel updating with target:: ", element[1].target," and source:: ",element[1].source);
      
       // if (!categoryExists(targetCategory.superCategories, element[1].source)) {

          const sourceCategory = await fetchCategoryByCode(element[1].source, catalog);
          if (sourceCategory) {
          //  superCategories.push(...targetCategory.superCategories);
          //  superCategories.push(sourceCategory);

            CategoryModel.findOneAndUpdate({ code: element[1].target, catalog: catalog }, {
              $addToSet: {
                superCategories: sourceCategory
              }
            },  { new: true }, function (err) {
              if (err)
                console.log(err);
            })
            CategoryModel.findOneAndUpdate({ code: element[1].source, catalog: catalog }, {
              $addToSet: {
                categories: targetCategory
              }
            },   { new: true },function (err) {
              if (err)
                console.log(err);
            })
          } else {
            console.log("source category with code ", element[1].target, " not found in system");
          }
    //    }
      } else {
        console.log("category to category rel first time::", element[1].target);
        const sourceCategory = await fetchCategoryByCode(element[1].source, catalog);
       // superCategories.push(sourceCategory);
        // adding perent categories

        if (sourceCategory) {
          CategoryModel.findOneAndUpdate({ code: element[1].target, catalog: catalog }, {
            $addToSet: {
              superCategories: sourceCategory
            }
          },   { new: true },function (err) {
            if (err)
              console.log(err);
          })
        } else {
          console.log("source category with code ", element[1].source, " not found in system");
        }

        // adding child categories in source category
        if (targetCategory) {
          CategoryModel.findOneAndUpdate({ code: element[1].source, catalog: catalog }, {
            $addToSet: {
              categories: targetCategory
            }
          },   { new: true },function (err) {
            if (err)
              console.log(err);
          })
        } else {
          console.log("target category with code ", element[1].target, " not found in system");
        }

      }
    });
  },
};
