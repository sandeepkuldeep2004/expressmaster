const RewardWalletModel = require('../models/RewardWallet')

// @desc    fetch Reward Wallet by Id
//@param {_id}
const getRewardWalletById = async function (id) {
  let rewardWalletModel = await RewardWalletModel.findById(id).populate([
    { path: 'customer' }
  ]).lean();
  if (rewardWalletModel) {
    return await populateRewardWalletData(rewardWalletModel);
  } else {
    return null;
  }
}
// @desc    fetch Reward Wallet by wallet Id
//@param {walletId}
const getRewardWalletByWalletId = async function (walletId) {
  let rewardWalletModel = await RewardWalletModel.findOne({ walletId: walletId })
    .populate([
      { path: 'customer' }
    ]).lean();
  if (rewardWalletModel) {
    return await populateRewardWalletData(rewardWalletModel);
  } else {
    return null;
  }
}

// @desc    fetch Reward Wallet by customer
//@param {customer}
const getRewardWalletByCustomer = async function (customer) {
  let rewardWalletModel = await RewardWalletModel.findOne({ customer: customer })
    .populate([
      { path: 'customer' }
    ]).lean();
  if (rewardWalletModel) {
    return await populateRewardWalletData(rewardWalletModel);
  } else {
    return null
  }
}
async function populateRewardWalletData(rewardWalletModel) {
  let rewardWalletData = {
    walletId: rewardWalletModel.walletId,
    earned: rewardWalletModel.earned,
    redeemed: rewardWalletModel.redeemed,
    availablePoints: rewardWalletModel.availablePoints,
    customerId: rewardWalletModel.customer.uid,
    tier: rewardWalletModel.tier,
  };

  return rewardWalletData;
}

module.exports = {
  getRewardWalletByCustomer,
  getRewardWalletByWalletId,
  getRewardWalletById,
}