const CategoryModel = require("../models/Category");
const { getCatalog } = require("../lib/catalog");
const { fetchCategoryByCode } = require("../lib/category");
module.exports = {
  saveCategory: async (data) => {
    Object.entries(data).forEach(async (element) => {
      const catalog = await getCatalog(element[1].catalog);
      const category = await fetchCategoryByCode(element[1].code, catalog);

      if (category) {
        console.log("category with same code " + element[1].code + " already exist, just updating the content");
        CategoryModel.findOneAndUpdate(
          { code: element[1].code, catalog: catalog },
          {
            $set: {
              title: element[1].title,
              description: element[1].description,
              rank: element[1].rank,
              visible: element[1].visible,
            }
          }, function (err) {
            if (err)
              console.log(err);
          })
      } else {
        const categoryModel = new CategoryModel({
          code: element[1].code,
          title: element[1].title,
          description: element[1].description,
          rank: element[1].rank,
          visible: element[1].visible,
          catalog: catalog,
        });
        categoryModel.save(function (err) {
          if (err) {
            console.log(err);
          }
        });
        console.log("creating new category with same code " + element[1].code);
      }
    });
  },
  fetchSuperCategories: async (param) => {

    return  await CategoryModel.find({status:param,superCategories:'63b4121ca29f61b90a407421'}).sort().lean();

   
  },
  fetchChildCategories: async (param,id) => {
    return await CategoryModel.findById({status:param,_id:id}).lean();
  }
  


};
