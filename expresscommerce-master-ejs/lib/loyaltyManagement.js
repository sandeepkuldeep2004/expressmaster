const TierModel = require('../models/Tier')
const BenefitModel = require('../models/Benefit');

// @desc    fetch All existing loyalty tiers with Benefits
//@param {}
const getLoyaltyTiers = async function () {
  let tiers = await TierModel.find().populate([
    { path: 'benefits', model: 'Benefit' }
  ]).lean();
  // console.log('tiers: ', tiers)
  if (tiers) {
    return await populateLoyaltyTiersData(tiers);
  } else {
    return null;
  }
}

function populateLoyaltyTiersData(tiers) {
  return tiers;
}

const getLoyaltyTierByName = async function (name) {
  let tier = await TierModel.findOne({ name: name })
  .populate({path:'benefits'}).lean();
  // console.log('tier: ', tier)
  return tier;
}

const getLoyaltyBenefits = async function () {
  let benefits = await BenefitModel.find().populate({ path: 'tiers' }).lean();
  //console.log('benefits: ', benefits)
  return benefits;
}
const getLoyaltyBenefitByBenefitId = async function (benefitId) {
  let benefit = await BenefitModel.findOne({ benefitId: benefitId }).lean();
  //console.log('benefit: ', benefit)
  return benefit;
}

const createBenefit = async function (benefitData) {
  let existingBenefit = await getLoyaltyBenefitByBenefitId(benefitData.benefitId);
  let tierModels = []
  for (tier of benefitData.tiers) {
    let tierModel = await getLoyaltyTierByName(tier);
    tierModels.push(tierModel);
  }
  if (tierModels.length == 0) {
    return { error: 'no tier exist in system' }
  }

  // check if this benefit is already exist, if yes then just update the content of benefit.
  if (existingBenefit) {
    // update Benefit
    let benefitModel = await BenefitModel.findOneAndUpdate({ benefitId: benefitData.benefitId },
      {
        $set: {
          title: benefitData.title,
          text: benefitData.text,
          iconUrl: benefitData.iconUrl,
          potentialEarnPoints: benefitData.potentialEarnPointsc,
          spend: benefitData.spend,
        },
        $addToSet: {
          tiers: tierModels
        }
      },
      { new: true }
    )
    await updateBenefitInTier(tierModels, benefitModel);
    return benefitModel;
  } else {
    // create new benefit.
    let benefitModel = await BenefitModel({
      benefitId: benefitData.benefitId,
      title: benefitData.title,
      text: benefitData.text,
      iconUrl: benefitData.iconUrl,
      potentialEarnPoints: benefitData.potentialEarnPointsc,
      spend: benefitData.spend,
      tiers: tierModels
    });
    await updateBenefitInTier(tierModels, benefitModel);
    benefitModel = await benefitModel.save();
    return benefitModel;
  }
}


const createTier = async function (tierData) {
  let existingTier = await getLoyaltyTierByName(tierData.name);

  // check if this benefit is already exist, if yes then just update the content of benefit.
  if (existingTier) {
    // update Benefit
    console.log('Updating existing Tier details')
    let tierModel = await TierModel.findOneAndUpdate({ name: tierData.name },
      {
        $set: {
          tierType: tierData.tierType,
          iconUrl: tierData.iconUrl,
          requiredPoints: tierData.requiredPoints,
          requiredPurchase: tierData.requiredPurchase,
          requiredSpend: tierData.requiredSpend,
          expiration: tierData.expiration,
          active: tierData.active,
          calculation: tierData.calculation,
        },
      },
      { new: true }
    )
    return tierModel;
  } else {
    // create new benefit.
    console.log('Creating new Tier details')
    let tierModel = await TierModel({
      name: tierData.name,
      tierType: tierData.tierType,
      iconUrl: tierData.iconUrl,
      requiredPoints: tierData.requiredPoints,
      requiredPurchase: tierData.requiredPurchase,
      requiredSpend: tierData.requiredSpend,
      expiration: tierData.expiration,
      active: tierData.active,
      calculation: tierData.calculation,
    });
    tierModel = await tierModel.save();
    return tierModel;
  }
}


const removeTier = async function (name) {
  let existingTier = await getLoyaltyTierByName(name);

  // check if this benefit is already exist, if yes then just update the content of benefit.
  if (existingTier) {
    // update Benefit
    console.log('Removing Tier details with name-', name)
    let tierModel = await TierModel.findOneAndRemove({ name: name })
    return tierModel;
  } else {
    return { error: 'No Tier exist with ' + name + ' in system...!!' };
  }
}
async function updateBenefitInTier(tierModels, benefitModel) {
  for (tier of tierModels) {
    let tierModel = await TierModel.findByIdAndUpdate(tier,
      {
        $addToSet: { benefits: benefitModel }
      },
      { new: true }
    );
    console.log('Updated Tier model is: ', tierModel)
  }
}
module.exports = {
  getLoyaltyTiers,
  getLoyaltyTierByName,
  getLoyaltyBenefitByBenefitId,
  getLoyaltyBenefits,
  createBenefit,
  createTier,
  removeTier
}