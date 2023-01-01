const CustomerActivityModel = require('../models/CustomerActivity')

// @desc    fetch All customer activities by wallet Id
//@param {WalletID}
const getAllActivitiesByWalletId = async function (walletId) {
  let activityModels = await CustomerActivityModel.find({ walletId: walletId }).populate([
    { path: 'actionRef' },
    { path: 'orderRef' }
  ]).lean();
  if (activityModels) {
    return await populateActivityData(activityModels);
  } else {
    return null;
  }
}

async function populateActivityData(activityModels) {
  let activityDatas = []
  for (activityModel of activityModels) {

    activityDatas.push({
      actionId: activityModel.actionRef ? activityModel.actionRef.actionId : null,
      orderId: activityModel.orderRef ? activityModel.orderRef.id : null,
      walletId: activityModel.walletId,
      activityId: activityModel.activityId,
      actionType: activityModel.actionType,
      event: activityModel.event,
      status: activityModel.status,
      channel: activityModel.channel,
      earnPoints: activityModel.earnPoints,
      redeemPoints: activityModel.redeemPoints,
      reservedPoints: activityModel.reservedPoints,
      type: activityModel.type
    })
  }

  return activityDatas;
}

module.exports = { getAllActivitiesByWalletId }