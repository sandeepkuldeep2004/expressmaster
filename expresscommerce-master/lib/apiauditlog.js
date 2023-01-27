const ApiAuditLogModel= require('../models/ApiAuditLog')

// @desc    fetch ApiAuditLog by Id
//@param {id}

const getApiAuditLogByClientId=async function(client_Id){
    const apiAuditLog= await ApiAuditLogModel.findOne({clientId:client_Id}).lean();
    return apiAuditLog
}

const getAllApiAuditLogs= async function()
{
    var apiAuditLogs=await ApiAuditLogModel.findOne().lean();
    return apiAuditLogs;
}


module.exports=
{
    getApiAuditLogByClientId,getAllApiAuditLogs
}