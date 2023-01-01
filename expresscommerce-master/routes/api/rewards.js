const express = require('express')
const router = express.Router()
const { ensureTokenAuth, checkBaseSite } = require('../../middleware/auth')
const { getCustomerByUid } = require("../../lib/customer");
const { createRewardWallet } = require("../../dao/RewardWallet");
const { getRewardWalletByCustomer } = require('../../lib/rewardwallet')
const { getAllActivitiesByWalletId } = require('../../lib/customerActivity')
const { getLoyaltyTiers, createBenefit, getLoyaltyBenefits, createTier, getLoyaltyTierByName, removeTier } = require('../../lib/loyaltyManagement')
const { createLoyaltyAction, fetchLoyaltyActionDetails,
  fetchLoyaltyActionByType, updateLoyaltyAction,
  fetchLoyaltyActionByActionId } = require('../../lib/loyaltyActionManagement')
// @desc   get detailed rewards history
// @route   GET /occ/v2/{baseSiteId}/customers/{customerId}/rewards/detailed
router.get('/:baseSiteId/customers/:customerId/rewards/activities', ensureTokenAuth, checkBaseSite, async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const customer = await getCustomerByUid(customerId);
    if (customer) {
      let rewardWallet = await getRewardWalletByCustomer(customer);
      if (rewardWallet) {

        let activityDatas = await getAllActivitiesByWalletId(rewardWallet.walletId);
        let response = {
          ...rewardWallet,
          activities: activityDatas
        }
        if (response) {
          return res.status(200).json(response);
        } else {
          return res.status(400).json(unsubscribedUserResponse());
        }
      } else {
        return res.status(400).json(unsubscribedUserResponse());;
      }

    } else {
      return res.status(400).json(unenrolledUserResponse());
    }

  } catch (err) {
    console.error(err)
    return res.status(500).json({
      error: err
    })
  }
})

function unsubscribedUserResponse() {
  return {
    code: 1002,
    action: 'subscription',
    error: 'given customer doesnot have subscribed yet for Loyalty program.'
  };
}
function noBenefitResponse() {
  return {
    code: 1004,
    action: 'benefit',
    error: 'Unable to create Benefit'
  };
}

function noTierResponse() {
  return {
    code: 1003,
    action: 'tier',
    error: 'No Tier Setup Yet in System'
  };
}
function unenrolledUserResponse() {
  return {
    code: 1001,
    action: 'enrollment',
    error: 'given customer in not registered customer'
  };
}
// @desc   get basic rewards history
// @route   GET /occ/v2/{baseSiteId}/customers/{customerId}/rewards/basic
router.get('/:baseSiteId/customers/:customerId/rewards/basic', ensureTokenAuth, checkBaseSite, async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const customer = await getCustomerByUid(customerId);
    if (customer) {
      let rewards = await getRewardWalletByCustomer(customer);
      if (rewards) {
        return res.status(200).json(rewards);
      } else {
        return res.status(400).json(unsubscribedUserResponse());;
      }
    } else {
      return res.status(400).json(unenrolledUserResponse());
    }
  } catch (err) {
    console.error(err)
    return res.status(500).json({
      error: err
    })
  }
})


// @desc   create Loyalty wallet
// @route   POST /occ/v2/{baseSiteId}/customers/{customerId}/rewards
router.post('/:baseSiteId/customers/:customerId/rewards', ensureTokenAuth, checkBaseSite, async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const customer = await getCustomerByUid(customerId);
    if (customer) {
      let reward = await createRewardWallet(customer);
      return res.status(200).json(reward);
    } else {
      return res.status(400).json(unenrolledUserResponse());
    }
  } catch (err) {
    console.error(err)
    return res.status(500).json({
      error: err
    })
  }
})

// @desc   get All Loyalty tiers 
// @route   GET /occ/v2/{baseSiteId}/customers/{customerId}/tiers
router.get('/:baseSiteId/customers/:customerId/tiers', ensureTokenAuth, checkBaseSite, async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const customer = await getCustomerByUid(customerId);
    if (customer) {
      let tiers = await getLoyaltyTiers();
      return res.status(200).json(tiers);
    } else {
      return res.status(400).json(noTierResponse());
    }
  } catch (err) {
    console.error(err)
    return res.status(500).json({
      error: err
    })
  }
})


// @desc   get Loyalty tier details by Name
// @route   GET /occ/v2/{baseSiteId}/customers/{customerId}/tiers/{name}
router.get('/:baseSiteId/customers/:customerId/tiers/:name', ensureTokenAuth, checkBaseSite, async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const customer = await getCustomerByUid(customerId);
    if (customer) {
      let tiers = await getLoyaltyTierByName(req.params.name);
      return res.status(200).json(tiers);
    } else {
      return res.status(400).json(noTierResponse());
    }
  } catch (err) {
    console.error(err)
    return res.status(500).json({
      error: err
    })
  }
})


// @desc   remove Loyalty tier details by Name
// @route   DELETE /occ/v2/{baseSiteId}/customers/{customerId}/tiers/{name}
router.delete('/:baseSiteId/customers/:customerId/tiers/:name', ensureTokenAuth, checkBaseSite, async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const customer = await getCustomerByUid(customerId);
    if (customer) {
      let tiers = await removeTier(req.params.name);
      return res.status(200).json(tiers);
    } else {
      return res.status(400).json(noTierResponse());
    }
  } catch (err) {
    console.error(err)
    return res.status(500).json({
      error: err
    })
  }
})

// @desc   create new Tier
// @route   POST /occ/v2/{baseSiteId}/customers/{customerId}/tiers
router.post('/:baseSiteId/customers/:customerId/tiers', ensureTokenAuth, checkBaseSite, async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const customer = await getCustomerByUid(customerId);
    if (customer) {

      let tierData = {
        name: req.body.name,
        tierType: req.body.tierType,
        iconUrl: req.body.iconUrl,
        requiredPoints: req.body.requiredPoints,
        requiredPurchase: req.body.requiredPurchase,
        requiredSpend: req.body.requiredSpend,
        expiration: req.body.expiration,
        active: req.body.active,
        calculation: req.body.calculation
      };
      let tier = await createTier(tierData);
      return res.status(200).json(tier);
    } else {
      return res.status(400).json(noTierResponse());
    }
  } catch (err) {
    console.error(err)
    return res.status(500).json({
      error: err
    })
  }
})

// @desc   get all Benefit
// @route   GET /occ/v2/{baseSiteId}/customers/{customerId}/benefits
router.get('/:baseSiteId/customers/:customerId/benefits', ensureTokenAuth, checkBaseSite, async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const customer = await getCustomerByUid(customerId);
    if (customer) {
      let benefit = await getLoyaltyBenefits();
      return res.status(200).json(benefit);
    } else {
      return res.status(400).json(noBenefitResponse());
    }
  } catch (err) {
    console.error(err)
    return res.status(500).json({
      error: err
    })
  }
})

// @desc   create new Benefit
// @route   POST /occ/v2/{baseSiteId}/customers/{customerId}/benefits
router.post('/:baseSiteId/customers/:customerId/benefits', ensureTokenAuth, checkBaseSite, async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const customer = await getCustomerByUid(customerId);
    if (customer) {

      let benefitData = {
        benefitId: req.body.benefitId,
        title: req.body.title,
        text: req.body.text,
        iconUrl: req.body.iconUrl,
        potentialEarnPoints: req.body.potentialEarnPointsc,
        spend: req.body.spend,
        tiers: req.body.tiers
      };
      let benefit = await createBenefit(benefitData);
      return res.status(200).json(benefit);
    } else {
      return res.status(400).json(noBenefitResponse());
    }
  } catch (err) {
    console.error(err)
    return res.status(500).json({
      error: err
    })
  }
})


// @desc   get to all Loyalty Action
// @route   GET /occ/v2/{baseSiteId}/loyalty/actions
router.get('/:baseSiteId/loyalty/actions', ensureTokenAuth, checkBaseSite, async (req, res) => {
  try {

    let actions = await fetchLoyaltyActionDetails();
    return res.status(200).json(actions);

  } catch (err) {
    console.error(err)
    return res.status(500).json({
      error: err
    })
  }
})


// @desc   get to Loyalty Action based on Type
// @route   GET /occ/v2/{baseSiteId}/loyalty/actions
router.get('/:baseSiteId/loyalty/actions/:type', ensureTokenAuth, checkBaseSite, async (req, res) => {
  try {

    let actions = await fetchLoyaltyActionByType(req.params.type);
    return res.status(200).json(actions);

  } catch (err) {
    console.error(err)
    return res.status(500).json({
      error: err
    })
  }
})


// @desc   create to new Loyalty Action
// @route   POST /occ/v2/{baseSiteId}/loyalty/actions
router.post('/:baseSiteId/loyalty/actions', ensureTokenAuth, checkBaseSite, async (req, res) => {
  try {


    let loyaltyActionData = {
      type: req.body.type,
      actionId: req.body.actionId,
      actionName: req.body.actionName,
      minOrderAmount: req.body.minOrderAmount,
      validity: req.body.validity,
      activation: req.body.activation,
      memberMessage: req.body.memberMessage,
      nonMemberMessage: req.body.nonMemberMessage,
      ctaText: req.body.ctaText,
      ctaUrl: req.body.ctaUrl,
      iconUrl: req.body.iconUrl,
      benefit: req.body.benefit,
      rewards: req.body.rewards
    };
    let action = await createLoyaltyAction(loyaltyActionData);
    return res.status(200).json(action);

  } catch (err) {
    console.error(err)
    return res.status(500).json({
      error: err
    })
  }
})


// @desc   Update Loyalty Action
// @route   POST /occ/v2/{baseSiteId}/loyalty/actions/{actionId}
router.patch('/:baseSiteId/loyalty/actions/:actionId', ensureTokenAuth, checkBaseSite, async (req, res) => {
  try {

    let actionId = req.params.actionId;
    let loyaltyActionModel = await fetchLoyaltyActionByActionId(actionId);
    if (loyaltyActionModel) {
      let loyaltyActionData = {
        type: req.body.type,
        actionName: req.body.actionName,
        minOrderAmount: req.body.minOrderAmount,
        validity: req.body.validity,
        activation: req.body.activation,
        memberMessage: req.body.memberMessage,
        nonMemberMessage: req.body.nonMemberMessage,
        ctaText: req.body.ctaText,
        ctaUrl: req.body.ctaUrl,
        iconUrl: req.body.iconUrl,
        benefit: req.body.benefit,
        rewards: req.body.rewards
      };
      let action = await updateLoyaltyAction(actionId, loyaltyActionData);
      return res.status(200).json(action);
    } else {
      return res.status(400).json({ error: 'This Action ID is not exist in System. Please create this action first' });
    }

  } catch (err) {
    console.error(err)
    return res.status(500).json({
      error: err
    })
  }
})

module.exports = router