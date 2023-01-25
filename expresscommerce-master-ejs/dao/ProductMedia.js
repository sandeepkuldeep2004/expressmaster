const MediaModel = require("../models/Media");
const ProductModel = require("../models/Product");
const { getCatalog } = require("../lib/catalog");
const { getProduct } = require("../lib/product");
const { set } = require("mongoose");
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('properties/local.properties');


const mediaExists = (allMedias, media) => {
  return media && allMedias && allMedias.length > 0 && allMedias.some((el) => {
    return el && el._id.equals(media._id);
  });
}

module.exports = {
  saveProductMedia: async (data) => {
    Object.entries(data).forEach(async (element) => {
      console.log("Creating and Mapping Media - " + element[1].mediaCode + " to product  - " + element[1].productCode);
      const catalog = await getCatalog(element[1].catalog);
      console.log("Product going for association is ::",element[1].productCode)
      const product = await getProduct(element[1].productCode, catalog);
      const hostname = properties.get("MEDIA_HOST_URL");
      var medias = []
      if (product) {
        let media = await MediaModel.findOneAndUpdate(
          { code: element[1].mediaCode },
          {
            $set: {
              name: element[1].name,
              priority: element[1].priority,
              thumbnail: hostname+element[1].thumbnailUrl,
              main: hostname+element[1].mainUrl,
              type: element[1].type,
            }
          },
          { new: true }
        ).lean();
    //    console.log("Existing Media is:: ", media)
        if (!media) {
          console.log("creating new media..... ")
          const mediaJson = {
            code: element[1].mediaCode,
            catalog: catalog,
            name: element[1].name,
            priority: element[1].priority,
            thumbnail: hostname + element[1].thumbnailUrl,
            main: hostname + element[1].mainUrl,
            type: element[1].type,
          }
          const productMediaModel = new MediaModel(mediaJson);
          media = await productMediaModel.save();
        }
      //  console.log(product.medias, "|", media)

        if (!mediaExists(product.medias, media)) {

          // checking if given media code available in DB or not 
          if (media) {
            if (product.medias)
              medias.push(...product.medias);
            medias.push(media);

            ProductModel.findOneAndUpdate({ code: element[1].productCode, catalog: catalog }, {
              $set: {
                medias: medias
              }
            }, function (err) {
              if (err)
                console.log(err);
            })
            console.log("Media with code " + element[1].mediaCode + " is associated with product  - " + element[1].productCode + " successfully");
          } else {
            console.error("Media with code " + element[1].mediaCode + " is not created successfully");
          }
        } else {
          console.error("Media with code " + element[1].mediaCode + " is already associated with product  - " + element[1].productCode);
        }

      } else {
        console.error("Media is not creating as given product code - " + element[1].productCode + " is not exist !!")
      }
    });
  },
};
