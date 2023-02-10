const ProductModel = require("../models/Product");
const { getCatalog } = require("../lib/catalog");
const { fetchCategoryByCode } = require("../lib/category");
const { saveProductPriceViaWeb } = require("./ProductPrice");
const { getProductList, getProduct } = require("../lib/product");
module.exports = {
  saveProduct: async (data) => {
    Object.entries(data).forEach(async (element) => {
      // console.log(' view object  ');
      // console.log(element.values);
      const catalog = await getCatalog(element[1].catalog);
      const product = await getProduct(element[1].code, catalog);
      if (product) {
        ProductModel.findOneAndUpdate(
          { code: element[1].code, catalog: catalog },
          {
            $set: {
              title: element[1].title,
              description: element[1].description,
              inUseStatus: element[1].inUseStatus,
              productType: element[1].productType,
              unit: element[1].unit,
              onSale: element[1].onSale,
              mainImage: element[1].mainImage,
              thumbnailImage: element[1].thumbnailImage,
              color:element[1].color,
              size:element[1].size,
              brand:element[1].brand,
            }
          }, function (err) {
            if (err)
              console.log(err);
          })

        console.log(
          "product with same code " + element[1].code + " already exists, so just updating the fields"
        );
      } else {
        const productModel = new ProductModel({
          code: element[1].code,
          title: element[1].title,
          description: element[1].description,
          inUseStatus: element[1].inUseStatus,
          productType: element[1].productType,
          unit: element[1].unit,
          onSale: element[1].onSale,
          catalog: catalog,
          mainImage: element[1].mainImage,
          thumbnailImage: element[1].thumbnailImage,
          color:element[1].color,
          size:element[1].size,
          brand:element[1].brand,
        });
        productModel.save(function (err) {
          if (err) {
            console.log(err);
          }
        });
      }
    });
  },
  saveProductViaWeb: async (data) => {
    console.log(' view product creation request  ');
    console.log(data);
    const catalog = await getCatalog(data.catalog);
    const product = await getProduct(data.code, catalog);
    if (catalog) {
      console.log(
        "catalog with same code " + data.catalog + " is not exists"
      );
      return "catalog with same code " + data.catalog + " is not exists"
    }

    const category = await fetchCategoryByCode(data.categoryCode, data.catalog);
    if (category) {
      console.log(
        "category with code " + data.categoryCode + " and catalog code: " + catalog.code + " is not exists"
      );
      return "category with code " + data.categoryCode + " and catalog code: " + catalog.code + " is not exists"
    }
    if (product) {
      console.log(
        "product with same code " + data.code + " already exists"
      );
      return "product with same code " + data.code + " already exists"
    } else {

      const productModel = new ProductModel({
        code: data.code,
        title: data.name,
        description: data.description,
        onSale: true,
        isPerishable: false,
        catalog: catalog,
      //  parentcategory: category,
        thumbnailImage: "https://randomuser.me/api/portraits/thumb/men/20.jpg",
        mainImage: "https://randomuser.me/api/portraits/men/20.jpg",
      });
      productModel.save(function (err) {
        if (err) {
          console.log(err);
        }
      });
      await saveProductPriceViaWeb({
        productCode: data.code,
        priceValue: data.price,
        catalog: catalog,
      });
      return "Product created successfully!!"
    }
  }, getProducts: async (data) => {
     //var valueArr = codes.split(', ')
  console.log("Searching all products")
  var products = await ProductModel.find()
    .populate([
      { path: 'medias', model: 'Media', select: 'code priority main thumbnail type -_id', populate: { path: 'catalog', select: 'code -_id' } },
      { path: 'categories', model: 'Category', select: 'code title' },
      { path: 'catalog', select: 'code' },
      { path: 'baseProduct', select: 'code ' },
    ]).lean();
  return products;
  },
};
