const UserGroupModel = require("../models/UserGroup");
const {getAllUser,getOneUser} = require("../dao/User");
const { getBaseSiteById } = require("../dao/BaseSite");
const {getAcessModuleByUserGroupId} = require("../dao/UserGroup");

const getAllUserServices = async function () {
    var userListF = [];
    var usersList = await getAllUser();
    for (usersListIrr of usersList) {
      console.log("basesite23" + usersListIrr.basesite);
      var baseSiteName = "";
      if (usersListIrr.basesite && usersListIrr.basesite != "") {
        let baseSiteDetailF = await getBaseSiteById(usersListIrr.basesite);
        baseSiteName = baseSiteDetailF.name;
      }
      var groupName = "";
      if (usersListIrr.usergroup && usersListIrr.usergroup != "") {
        let groupDetailF = await getAcessModuleByUserGroupId(usersListIrr.usergroup);
        groupName = groupDetailF.name;
      }
      console.log("basesite" + baseSiteName);

      let userListObj = {
        _id: usersListIrr._id,
        name: usersListIrr.name,
        accessmoules: usersListIrr.accessmoules,
        baseSiteDetail: baseSiteName,
        usergroup: groupName,
        issuperadmin: usersListIrr.issuperadmin,


      };
      userListF.push(userListObj);
    }
    return userListF;
  },getOneUserService = async function (id) {
    var usergroupList = await getOneUser(id);
    baseSiteId = "";
    if (usergroupList.basesite && usergroupList.basesite != "") {
      let baseSiteData = await getBaseSiteById(usergroupList.basesite);
      baseSiteId = baseSiteData._id;
    }
    var groupName = "";
    var groupId = "";
    if (usergroupList.usergroup && usergroupList.usergroup != "") {
      let groupDetailF = await getAcessModuleByUserGroupId(usergroupList.usergroup);
      groupName = groupDetailF.name;
      groupId = groupDetailF._id;
    }

    
    let usergroupSingletObj = {
      _id: usergroupList._id,
      name: usergroupList.name,
      accessmoules: usergroupList.accessmoules,
      baseSiteId: baseSiteId,
      creationdate: usergroupList.creationdate,
      groupName:groupName,
      password:usergroupList.password,
      email:usergroupList.email,
      groupId:groupId,
    };

    return usergroupSingletObj;
  }
  
  
  module.exports = {
    getAllUserServices,getOneUserService
    }