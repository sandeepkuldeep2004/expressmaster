const ModuleModel = require("../models/Module");
const {getModuleByCode} = require("../lib/module");

module.exports = {
  saveModule: async (data) => {

    console.log(
      "Module with same isocode " + data + " already exists"
    );
    Object.entries(data).forEach(async (element) => {
      const module = await getModuleByCode(element[1].code);
      if (module) {
        ModuleModel.findOneAndUpdate(
          { code: element[1].code },
          {
            $set: {
              name: element[1].name,
              url: element[1].url,
              cssclassname: element[1].cssclassname,
              position: element[1].position
            }
          },function (err) {
            if (err)
              console.log(err);
          })
        console.log(
          "Company with same code " + element[1].code + " already exists"
        );
      } else {
        const moduleModel = new ModuleModel({
          code: element[1].code,
          name: element[1].name,
          url:element[1].url,
          cssclassname:element[1].cssclassname,
          position:element[1].position,
          
        });
        moduleModel.save(function (err) {
          if (err) {
            console.log(err);
          }
        });
      }
    });
  },
};
