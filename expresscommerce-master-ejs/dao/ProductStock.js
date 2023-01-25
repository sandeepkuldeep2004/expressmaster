const ProductStockModel = require("../models/ProductStock");
const { getCatalog } = require("../lib/catalog");
const { getStockByWarehouseAndProductCode } = require("../lib/stocklevel");

module.exports = {
  saveProductStock: async (data) => {
    Object.entries(data).forEach(async (element) => {
      const catalog = await getCatalog(element[1].catalog);
      const productStockModel = await getStockByWarehouseAndProductCode(element[1].productCode, element[1].warehouseCode);
      if (productStockModel) {
        ProductStockModel.findOneAndUpdate(
          { productCode: element[1].productCode, warehouseCode: element[1].warehouseCode },
          {
            $set: {
              productCode: element[1].productCode,
              availableQty: element[1].availableQty,
              inStockStatus: element[1].inStockStatus,
              maxPreOrder: element[1].maxPreOrder,
              maxStockLevelHistoryCount: element[1].maxStockLevelHistoryCount,
              overSelling: element[1].overSelling,
              preOrder: element[1].preOrder,
              reserved: element[1].reserved,
              catalog: catalog,
            }
          }, function (err) {
            if (err)
              console.log(err);
          })

        console.log(
          "product stock with same code " + element[1].productCode + " already exists, so just updating the fields"
        );
      } else {
        const productStockModel = new ProductStockModel({
          productCode: element[1].productCode,
          warehouseCode: element[1].warehouseCode,
          availableQty: element[1].availableQty,
          inStockStatus: element[1].inStockStatus,
          maxPreOrder: element[1].maxPreOrder,
          maxStockLevelHistoryCount: element[1].maxStockLevelHistoryCount,
          overSelling: element[1].overSelling,
          preOrder: element[1].preOrder,
          reserved: element[1].reserved,
          catalog: catalog,
        });
        productStockModel.save(function (err) {
          if (err) {
            console.log(err);
          }
        });
        console.log(
          "Creating new stock level of product " + element[1].productCode
        );
      }
    });
  },
};
