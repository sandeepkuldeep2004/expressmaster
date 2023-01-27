const StoreLocatorModel=require('../models/StoreLocator')
const AddressModel=require('../models/Address')
const getStores= async function()
{
return await StoreLocatorModel.find().populate([
    {path:"address", select:"streetname cellphone"}]).lean();
}
const getStoreById=async function(storeId)
{
return StoreLocatorModel.find({storeId:storeId}).sort({name:'asc'}).lean();
}
const getStoreByZipCode=async function(zip_Code)
{
return await StoreLocatorModel.find({zipCode:zip_Code}).
populate([
    {path:"address", select:"streetname cellphone"}]).lean()
}
module.exports={getStores,getStoreById,getStoreByZipCode}
