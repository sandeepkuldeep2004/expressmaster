const UserGroupModel = require("../models/UserGroup");
const { getBaseSiteById } = require("../dao/BaseSite");
const { getAllUserGroup, getOneUserGroup,getUserGroupsBybaseSiteId,getAcessModuleByUserGroupId} = require("../dao/UserGroup");

const getAllUserGroupServices = async function () {
    var usergroupListF = [];
    var usergroupList = await getAllUserGroup();
    for (usergroupListIrr of usergroupList) {
      console.log("basesite23" + usergroupListIrr.basesite);
      var baseSiteName = "";
      if (usergroupListIrr.basesite && usergroupListIrr.basesite != "") {
        let baseSiteDetailF = await getBaseSiteById(usergroupListIrr.basesite);
        baseSiteName = baseSiteDetailF.name;
      }
      console.log("basesite" + baseSiteName);

      let usergroupListObj = {
        _id: usergroupListIrr._id,
        code: usergroupListIrr.code,
        name: usergroupListIrr.name,
        accessmoules: usergroupListIrr.accessmoules,
        accessMoulesStr: await JSON.stringify(usergroupListIrr.accessmoules),
        Status: usergroupListIrr.Status,
        baseSiteDetail: baseSiteName,
        creationdate: usergroupListIrr.creationdate,
      };
      usergroupListF.push(usergroupListObj);
    }
    return usergroupListF;
  },getOneUserGroupBycodeService = async function (code) {
    var usergroupList = await getOneUserGroup(code);
    baseSiteId = "";
    if (usergroupList.basesite && usergroupList.basesite != "") {
      let baseSiteData = await getBaseSiteById(usergroupList.basesite);
      baseSiteId = baseSiteData._id;
    }
    let usergroupSingletObj = {
      _id: usergroupList._id,
      code: usergroupList.code,
      name: usergroupList.name,
      accessmoules: usergroupList.accessmoules,
      Status: usergroupList.Status,
      baseSiteId: baseSiteId,
      creationdate: usergroupList.creationdate,
    };

    return usergroupSingletObj;
  },
  getUserGroupsBybaseSiteService = async function (id) {
    var usergroupListService = await getUserGroupsBybaseSiteId(id);
       var usergroupListServiceData=[];
        for (usergroupListServiceIrr of usergroupListService) {
        let usergroupBybaseSitetObj = {
          _id: usergroupListServiceIrr._id,
          name: usergroupListServiceIrr.name,
        };
        usergroupListServiceData.push(usergroupBybaseSitetObj);
      }
     return usergroupListService;
  },
  getAllAcessModuleServices= async function (id) {
    var getAcessModuleByUserGroupIdData = await getAcessModuleByUserGroupId(id);
     return getAcessModuleByUserGroupIdData.accessmoules;
  }
  
  module.exports = {
     getAllUserGroupServices, getOneUserGroupBycodeService,getUserGroupsBybaseSiteService, getAllAcessModuleServices
    }