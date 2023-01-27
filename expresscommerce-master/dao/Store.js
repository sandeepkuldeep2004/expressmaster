const StoreLocatorModel = require("../models/StoreLocator");
const {getStoreById} = require("../lib/StoreLocator");
const {getBaseSiteByCode}=require("../lib/basesite");
const {getAddressByUid}=require("../lib/customer");

console.log("Entered into the save method of dao")

module.exports = {
saveStore: async (data) => {
Object.entries(data).forEach(async (element) => {
console.log("This is the store id",element[1].storeId)
const store = await getStoreById(element[1].storeId);
if (store.length!=0) {
console.log(
"store with same code " + element[1].storeId + " already exists"
);
console.log("store",store)
} else {
  console.log("Enter into the else ")
const basesite= await getBaseSiteByCode(element[1].basesite);
const address= await getAddressByUid(element[1].address);
const storeLocatorModel = new StoreLocatorModel({
storeId: element[1].storeId,
name: element[1].name,
basesite:basesite,
address:address,
description:element[1].description,
storeContent:element[1].storeContent,
type:element[1].type,
latitude:element[1].latitude,
longitude:element[1].longitude,
zipCode:element[1].zipCode,
});
console.log("this is the store locator model",storeLocatorModel);
storeLocatorModel.save(function (err) {
if (err) {
console.log(err);
}
console.log("coming below the error")
});
}
});
},
};
