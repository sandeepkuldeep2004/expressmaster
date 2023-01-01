const RewardWalletModel = require("../models/RewardWallet");
const CustomerActivityModel = require('../models/CustomerActivity')

const OrderModel = require("../models/Order");
const { getRewardWalletByCustomer } = require("../lib/rewardwallet");
const { generateNumber } = require("../lib/numberseries");
const { getLoyaltyTierByName } = require('../lib/loyaltyManagement');
const { fetchLoyaltyActionByType, fetchRewardByActionAndTier } = require('../lib/loyaltyActionManagement');
const updatePointInOrder = async function (order, earned) {
  order = await OrderModel.findByIdAndUpdate(order._id,
    {
      $set: { accrualPoint: earned }
    },
    { new: true }
  )
  return order;
}
const updatePointInWallet = async function (customerActivityModel, wallet, earned) {
  wallet = await RewardWalletModel.findOneAndUpdate({ walletId: wallet.walletId },
    {
      $set: {
        availablePoints: wallet.availablePoints + earned,
        earned: wallet.earned + earned,
      }
    },
  )
  return wallet;
}


const getEarnedPointsBasedOnRewards = async function (loyaltyActionRewardModel, totalOrderAmount) {
  if (loyaltyActionRewardModel) {
    if (loyaltyActionRewardModel.multiplePoints != null) {
      return totalOrderAmount * loyaltyActionRewardModel.multiplePoints;
    }
    if (loyaltyActionRewardModel.bonusPoints != null) {
      return loyaltyActionRewardModel.bonusPoints;
    }
    // other condition in not applied as of now.
    //vouchers
    //exclusiveAccess
    //statusUpgrade
  } else {
    console.error("loyaltyActionRewardModel is not found for this customer.")
    return 0;
  }
}


const createPurchaseCustomerActivity = async (order, loyaltyActionModel, wallet, earned) => {
  const customerActivityId = await generateNumber('customerActivity');
  let customerActivityModel = await CustomerActivityModel({
    actionRef: loyaltyActionModel,
    orderRef: order,
    walletId: wallet.walletId,
    activityId: customerActivityId,
    actionType: 'POINTS_EARN',
    event: 'PLACE_ORDER',
    status: 'COMPLETED',
    earnPoints: earned,
    openingPoints: wallet.availablePoints,
    closingPoints: wallet.availablePoints + earned,
    type: 'PURCHASE',
  });

  customerActivityModel = await customerActivityModel.save();
  console.log('customerActivityModel created successfully', customerActivityModel);
  return customerActivityModel;

}

module.exports = {
  accrualPointOnPurchase: async (customer, order) => {
    if (order && customer) {
      console.log("Accrual Loyalty Points to Customer: ", customer.uid, " to order: ", order.id);

      let wallet = await getRewardWalletByCustomer(customer);
      console.log("Existing Customer Wallet - ", wallet);
      if (wallet) {
        let tierName = wallet.tier;
        // let tierModel = await getLoyaltyTierByName(tierName);
        let loyaltyActionModel = await fetchLoyaltyActionByType('Purchases');

        if (loyaltyActionModel && loyaltyActionModel.activation) {
          let totalOrderAmount = order.totalPrice.toString();
          let minOrderAmount = loyaltyActionModel.minOrderAmount;
          if (totalOrderAmount >= minOrderAmount) {
            console.log('Minimum Order Amount limit is matched with this order for getting loyalty points. limit : ', minOrderAmount, ' and order amount: ', totalOrderAmount);

            // now apply rewards on this order.
            let loyaltyActionRewardModel = await fetchRewardByActionAndTier(loyaltyActionModel.actionId, tierName);
            console.log('found loyaltyActionRewardModel is :', loyaltyActionRewardModel)

            if (loyaltyActionRewardModel) {
              let earned = await getEarnedPointsBasedOnRewards(loyaltyActionRewardModel, totalOrderAmount)

              // accrual the points and add into wallet and create Customer Activity 
              let customerActivityModel = await createPurchaseCustomerActivity(order, loyaltyActionModel, wallet, earned);
              if (customerActivityModel) {
                // adding amount in wallet.
                await updatePointInWallet(customerActivityModel, wallet, earned, order)

              }
            } else {
              console.error('No Rewards model defined for given action');
            }

          } else {
            console.error('Minimum Order Amount limit is not matched with this order for getting loyalty points. limit : ', minOrderAmount, ' and order amount: ', totalOrderAmount);

          }

        } else {
          console.error('No Active Loyalty Action define for this customer!!!');
        }

      } else {
        console.error("Customer ", customer.uid, " has not subscribed yet for loyalty wallet. ");
      }
    } else {
      console.error("Customer- ", customer, " or Order-", order, " detail is missing...");
    }
  },

  createRewardWallet: async (customer) => {
    if (customer) {
      console.log("Creating new Reward wallet for Customer: ", customer.uid);
      let wallet = await getRewardWalletByCustomer(customer);
      if (!wallet) {
        console.log("Creating new Wallet as no wallet associated with this customer...");
        const walletId = await generateNumber('rewardWallet');
        let rewardWalletModel = new RewardWalletModel({
          walletId: walletId,
          customer: customer,
          lifecycleStatus: ['MEMBERSHIP'],

        });
        wallet = await rewardWalletModel.save();
        return wallet;
      } else {
        console.log("Reward Wallet is already Exist with this customer Customer Wallet - ", wallet.walletId);
        return wallet;
      }
    } else {
      console.error("Customer in null !!!");
    }
  },

};
