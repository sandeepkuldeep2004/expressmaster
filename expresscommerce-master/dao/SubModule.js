const SubModuleModel = require("../models/SubModule");
const {getSubModuleByCode} = require("../lib/submodule");
const {getModuleByCode}=require("../lib/module");
module.exports = {
  saveSubModule: async (data) => {

    console.log(
      "Module with same isocode " + data + " already exists"
    );
    Object.entries(data).forEach(async (element) => {
      const submodule = await getSubModuleByCode(element[1].code);
      const moduleCode = await getModuleByCode(element[1].moduleCode);
      
      if (submodule) {
        console.log(
          "submodule with same code " + element[1].code + " already exists, just updating the content"
        );
        SubModuleModel.findOneAndUpdate(
          { code: element[1].code },
          {
            $set: {
              name: element[1].name,
              landingUrl: element[1].landingUrl,
              cssclassname: cssclassname,
              position: position,
              module:moduleCode
            }
          },function (err) {
            if (err)
              console.log(err);
          })
      } else {
        const subModuleModel = new SubModuleModel({
          code: element[1].code,
          name: element[1].name,
          landingUrl:element[1].landingUrl,
          cssclassname:element[1].cssclassname,
          position:element[1].position,
          module:moduleCode
          
        });
        subModuleModel.save(function (err) {
          if (err) {
            console.log(err);
          }
        });
      }
    });
  },
};
