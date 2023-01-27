const NavigationModel = require('../models/LeftNavigation.js')

// @desc    fetch Category by code
//@param {active}
const getNavigationByCode = async function(code){ 
  return  NavigationModel.findOne({code:code}).lean();
}
const updLeftnavigation = function () {
  try {
    const MongoClient = require('mongodb').MongoClient
    var collectionArray=[];
    var fetchLeftNavCollection= function(err, client) {
      if (err) throw err;
      var dbo = client.db("xpress");

      var updLeftNavList= async () => {
        var result = await dbo.collection('modules').aggregate([
         { $lookup:
           {
             from: 'submodules',
             localField: '_id',
             foreignField: 'module',
             as: 'moudulsDetail'
           }
         }
       ]).toArray();
      var collectionString=JSON.stringify(result);
               console.log("qqqqqqqqq"+ collectionString);
       dbo.collection("leftnavigations").findOneAndUpdate(
        { code: 'leftMenu' },
        {
          $set: {
            leftMenu: collectionString
          }
        },function (err) {
          if (err)
            console.log(err);
        })
      }
      return updLeftNavList();
    }

   const nnnn = MongoClient.connect(process.env.MONGO_URI, fetchLeftNavCollection);
   return collectionArray;

  } catch (err) {
    console.error(err)
    process.exit(1)
  }
  
}

module.exports={
  getNavigationByCode,updLeftnavigation
}