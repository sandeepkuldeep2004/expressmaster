const UserGroupModel = require("../models/UserGroup");
const {getUserGroup} = require("../lib/usergroup");

module.exports = {
  saveUserGroup: async (data) => {
    //console.log('Insert UserGroup started');
    Object.entries(data).forEach(async (element) => {
      const usergroup = await getUserGroup(element[1].code);
      if (usergroup) {
        //console.log("UserGroup with same code " + element[1].code + " already exists");
      } else {
        const usergroupModel = new UserGroupModel({
          code: element[1].code,
          name: element[1].name,
          userPriceGroup: element[1].userPriceGroup,
          userTaxGroup: element[1].userTaxGroup,
        });
        usergroupModel.save(function (err) {
          if (err) {
            console.log(err);
          }       
        });
      }
    });
  },
};
