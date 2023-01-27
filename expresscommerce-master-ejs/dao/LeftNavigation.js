const LeftNavigationModel = require("../models/LeftNavigation");
const {getNavigationByCode} = require("../lib/leftNavigation");
const MongoClient = require('mongodb').MongoClient


module.exports = {
  saveLeftMenu: async (data) => {
    Object.entries(data).forEach(async (element) => {
      const navigation = await getNavigationByCode("leftMenu");
      /* console.log("Display Country name " + element[1].name+ country + "Print Country Name"); */
      if (navigation) {
        console.log("Country with same isocode " + element[1].code + " already exists");
       
      } else {
        const leftNavigationModel = new LeftNavigationModel({
          code: "leftMenu",
          leftMenu: '[{"_id":"63ca3eaff39741065b7f13f3","code":"localization","name":"Localization","url":"","cssclassname":"fas fa-cog","position":1,"active":true,"__v":0,"moudulsDetail":[{"_id":"63ca4bd206ddb876b90f27d3","code":"region","name":"Region","cssclassname":"fas fa-cog","landingUrl":"/region/viewAll","position":0,"module":"63ca3eaff39741065b7f13f3","active":true,"__v":0},{"_id":"63ca4bd206ddb876b90f27d5","code":"currency","name":"Currency","cssclassname":"fas fa-cog","landingUrl":"/currency/viewAll","position":2,"module":"63ca3eaff39741065b7f13f3","active":true,"__v":0},{"_id":"63ca4bd206ddb876b90f27d7","code":"language","name":"Language","cssclassname":"fas fa-cog","landingUrl":"/language/viewAll","position":3,"module":"63ca3eaff39741065b7f13f3","active":true,"__v":0},{"_id":"63ca4bd206ddb876b90f27dc","code":"country","name":"Country","cssclassname":"fas fa-cog","landingUrl":"/country/viewAll","position":1,"module":"63ca3eaff39741065b7f13f3","active":true,"__v":0}]},{"_id":"63ca3eaff39741065b7f13f7","code":"dashboard","name":"Dashboard","url":"/dashboard","cssclassname":"fas fa-home","position":0,"active":true,"__v":0,"moudulsDetail":[]}]'          
        });
        leftNavigationModel.save(function (err) {
          if (err) {
            console.log(err);
          }
        });
      }
    });
  },
   updLeftnavigation: function () {
    try {
      var collectionArray=[];
      var fetchLeftNavCollection= function(err, client) {
        if (err) throw err;
        var dbo = client.db(process.env.MONGO_DB);
  
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
  
};
