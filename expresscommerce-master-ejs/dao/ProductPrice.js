const ProductPriceModel = require("../models/ProductPrice");
const { getCatalog } = require("../lib/catalog");
const { getProductPriceDetails } = require("../lib/pricerow");

module.exports = {
  saveProductPrice: async (data) => {
    Object.entries(data).forEach(async (element) => {
      const catalog = await getCatalog(element[1].catalog);

      const productPriceModel = await getProductPriceDetails(element[1].productCode, catalog, element[1].currencyIsoCode);
      if (productPriceModel) {
        ProductPriceModel.findOneAndUpdate(
          { productCode: element[1].productCode, currencyIsoCode: element[1].currencyIsoCode, catalog: catalog },
          {
            $set: {
              priceValue: element[1].priceValue,
              currencyIsoCode: element[1].currencyIsoCode,
              priceGroup: element[1].priceGroup,
              userpriceGroup: element[1].userpriceGroup,
              channel: element[1].channel,
              unit: element[1].unit,
              unitFactor: element[1].unitFactor,
              fromDate: element[1].fromDate,
              toDate: element[1].toDate,
              catalog: catalog,
            }
          }, function (err) {
            if (err)
              console.log(err);
          })

        console.log(
          "product price with same code " + element[1].productCode + " already exists, so just updating the fields"
        );
      } else {
        const productPriceModel = new ProductPriceModel({
          productCode: element[1].productCode,
          priceValue: element[1].priceValue,
          currencyIsoCode: element[1].currencyIsoCode,
          priceGroup: element[1].priceGroup,
          userpriceGroup: element[1].userpriceGroup,
          channel: element[1].channel,
          unit: element[1].unit,
          unitFactor: element[1].unitFactor,
          fromDate: element[1].fromDate,
          toDate: element[1].toDate,
          catalog: catalog,
        });
        productPriceModel.save(function (err) {
          if (err) {
            console.log(err);
          }
        });
        console.log(
          "Creating new price row of product " + element[1].productCode
        );
      }
    });
  },

  saveProductPriceViaWeb: async (data) => {
    console.log("Creating price: ", data)
    const productPriceModel = new ProductPriceModel({
      productCode: data.productCode,
      priceValue: data.priceValue,
      currencyIsoCode: "USD",
      catalog: catalog,
    });
    productPriceModel.save(function (err) {
      if (err) {
        console.log(err);
      }
    });
  },
  getProductPrice : async function(productCode,catalog){ 
    return await ProductPriceModel.findOne({productCode:productCode,catalog:catalog}).lean();
  },
  getProductPriceDetails : async function(productCode,catalog,currency){ 
    return await ProductPriceModel.findOne({productCode:productCode,catalog:catalog,currencyIsoCode:currency}).lean();
  },
  fetchProductPrice : async function(product, catalog, currency, symbol) {
    var productPrice = await getProductPriceDetails(product.code, catalog, currency);
    return productPrice;
  }
};
