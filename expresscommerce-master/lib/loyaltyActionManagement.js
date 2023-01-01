const LoyaltyActionModel = require('../models/LoyaltyAction')
const LoyaltyActionRewardModel = require('../models/LoyaltyActionReward');

const fetchLoyaltyActionByType = async function (type) {
  let actions = await LoyaltyActionModel.findOne({ type: type, activation: { "$in": ["true", true] } },).populate({ path: 'rewards' }).lean();
  //console.log('benefits: ', benefits)
  return actions;
}

const fetchLoyaltyActionDetails = async function () {
  let actions = await LoyaltyActionModel.find().populate({ path: 'rewards' }).lean();
  //console.log('benefits: ', benefits)
  return actions;
}

const fetchLoyaltyActionByActionId = async function (actionId) {
  let actions = await LoyaltyActionModel.findOne({ actionId: actionId }).lean();
  return actions;
}


const fetchRewardByActionRewardId = async function (actionRewardId) {
  let actionReward = await LoyaltyActionRewardModel.findOne({ actionRewardId: actionRewardId }).lean();
  return actionReward;
}


const fetchRewardByActionAndTier = async function (actionId, tier) {
  console.log("fetching actionReward with actionId:", actionId, " and tier: ", tier)
  let actionReward = await LoyaltyActionRewardModel.findOne({ actionId: actionId, customerTier: tier }).lean();
  console.log("actionReward :", actionReward)
  return actionReward;
}

const createLoyaltyAction = async function (loyaltyActionData) {
  let existingAction = await fetchLoyaltyActionByActionId(loyaltyActionData.actionId);
  // check if this benefit is already exist, if yes then just update the content of benefit.
  if (existingAction) {
    return { error: 'This action ID is already exist in system' };
  } else {
    let loyaltyActionRewardModels = await createAndFetchRewards(loyaltyActionData.actionId, loyaltyActionData.rewards);
    // create new benefit.
    console.log('Creating new Tier details')
    let loyaltyActionModel = await LoyaltyActionModel({
      type: loyaltyActionData.type,
      actionId: loyaltyActionData.actionId,
      actionName: loyaltyActionData.actionName,
      minOrderAmount: loyaltyActionData.minOrderAmount,
      validity: loyaltyActionData.validity,
      activation: loyaltyActionData.activation,
      memberMessage: loyaltyActionData.memberMessage,
      nonMemberMessage: loyaltyActionData.nonMemberMessage,
      ctaText: loyaltyActionData.ctaText,
      ctaUrl: loyaltyActionData.ctaUrl,
      iconUrl: loyaltyActionData.iconUrl,
      benefit: loyaltyActionData.benefit,
      rewards: loyaltyActionRewardModels
    });
    loyaltyActionModel = await loyaltyActionModel.save();
    return loyaltyActionModel;
  }
}


const updateLoyaltyAction = async function (actionId, loyaltyActionData) {
  // check if this benefit is already exist, if yes then just update the content of benefit.
  let loyaltyActionRewardModels = await updateAndFetchRewards(actionId, loyaltyActionData.rewards);
  // create new benefit.
  console.log('Update Tier details')
  let loyaltyActionModel = await LoyaltyActionModel.findOneAndUpdate({ actionId: actionId }, {
    $set: {
      type: loyaltyActionData.type,
      actionName: loyaltyActionData.actionName,
      minOrderAmount: loyaltyActionData.minOrderAmount,
      validity: loyaltyActionData.validity,
      activation: loyaltyActionData.activation,
      memberMessage: loyaltyActionData.memberMessage,
      nonMemberMessage: loyaltyActionData.nonMemberMessage,
      ctaText: loyaltyActionData.ctaText,
      ctaUrl: loyaltyActionData.ctaUrl,
      iconUrl: loyaltyActionData.iconUrl,
      benefit: loyaltyActionData.benefit,
    },
    $addToSet: { rewards: loyaltyActionRewardModels }
  },
    { new: true }
  );
  return loyaltyActionModel;
}

async function createAndFetchRewards(actionId, loyaltyActionRewardDatas) {
  let loyaltyActionRewardModels = []
  if (loyaltyActionRewardDatas && loyaltyActionRewardDatas.length > 0) {
    for (rewardData of loyaltyActionRewardDatas) {
      let existingloyaltyActionRewardModel = await fetchRewardByActionRewardId(rewardData.actionRewardId);
      if (existingloyaltyActionRewardModel) {
        loyaltyActionRewardModels.push(existingloyaltyActionRewardModel);
      } else {
        let loyaltyActionRewardModel = await LoyaltyActionRewardModel({
          actionId: actionId,
          actionRewardId: rewardData.actionRewardId,
          customerTier: rewardData.tier,
          multiplePoints: rewardData.multiplePoints,
          bonusPoints: rewardData.bonusPoints,
          vouchers: rewardData.vouchers,
          exclusiveAccess: rewardData.exclusiveAccess,
          statusUpgrade: rewardData.statusUpgrade,
        });
        loyaltyActionRewardModel = await loyaltyActionRewardModel.save();
        loyaltyActionRewardModels.push(loyaltyActionRewardModel);
      }
    }
  }
  return loyaltyActionRewardModels;
}


async function updateAndFetchRewards(actionId, loyaltyActionRewardDatas) {
  let loyaltyActionRewardModels = []
  if (loyaltyActionRewardDatas && loyaltyActionRewardDatas.length > 0) {
    for (rewardData of loyaltyActionRewardDatas) {
      let existingloyaltyActionRewardModel = await fetchRewardByActionRewardId(rewardData.actionRewardId);
      if (existingloyaltyActionRewardModel) {

        existingloyaltyActionRewardModel = await LoyaltyActionRewardModel.findOneAndUpdate(
          { actionRewardId: rewardData.actionRewardId },
          {
            $set: {
              actionId: actionId,
              customerTier: rewardData.tier,
              multiplePoints: rewardData.multiplePoints,
              bonusPoints: rewardData.bonusPoints,
              vouchers: rewardData.vouchers,
              exclusiveAccess: rewardData.exclusiveAccess,
              statusUpgrade: rewardData.statusUpgrade,
            }
          },
          { new: true }
        );
        loyaltyActionRewardModels.push(existingloyaltyActionRewardModel);
      } else {
        let loyaltyActionRewardModel = await LoyaltyActionRewardModel({
          actionId: actionId,
          actionRewardId: rewardData.actionRewardId,
          customerTier: rewardData.tier,
          multiplePoints: rewardData.multiplePoints,
          bonusPoints: rewardData.bonusPoints,
          vouchers: rewardData.vouchers,
          exclusiveAccess: rewardData.exclusiveAccess,
          statusUpgrade: rewardData.statusUpgrade,
        });
        loyaltyActionRewardModel = await loyaltyActionRewardModel.save();
        loyaltyActionRewardModels.push(loyaltyActionRewardModel);
      }
    }
  }
  return loyaltyActionRewardModels;
}
module.exports = {
  fetchLoyaltyActionDetails,
  fetchRewardByActionRewardId,
  fetchRewardByActionRewardId,
  createLoyaltyAction,
  fetchLoyaltyActionByType,
  updateLoyaltyAction,
  fetchLoyaltyActionByActionId,
  fetchRewardByActionAndTier
}