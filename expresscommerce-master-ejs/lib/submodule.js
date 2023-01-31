const SubModuleModel = require('../models/SubModule')

// @desc    fetch all active Category
//@param {active}
const getSubModuleList = async function(){ 
  return  SubModuleModel.find({}).sort({ name: 'asc' }).lean();
}

// @desc    fetch Category by code
//@param {active}
const getSubModuleByIsocode = async function(isocode){ 
  return  SubModuleModel.findOne({isocode:isocode}).lean();
}

// @desc    fetch Category by Is
//@param {active}
const getSubModuleById = async function(id){ 
  return  SubModuleModel.findOne({_id:id}).lean();
}

// @desc    fetch module by Code
const getSubModuleByCode = async function(code){ 
  return  SubModuleModel.findOne({code:code}).lean();
}

// @desc    fetch ALL Module by Code
const getSubAllModuleByCode = async function(id){ 
  var subnavigationArr=[];
  var SubModuleList= await SubModuleModel.find({module:id}).lean();
      Object.entries(SubModuleList).forEach(async (element2) => {
        let subModuleListObj = {
          _id: element2[1]._id,
          code: element2[1].code,
          name: element2[1].name,
          landingUrl: element2[1].landingUrl,
          position: element2[1].position
        };   
       await  subnavigationArr.push(subModuleListObj);   
      
      });
      return subnavigationArr;
}

module.exports={
  getSubModuleList, getSubModuleByIsocode,getSubModuleById,getSubModuleByCode,getSubAllModuleByCode
}