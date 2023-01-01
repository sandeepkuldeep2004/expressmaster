const express = require("express");
const router = express.Router();
const { getTopSellingComponentByCode, getTopSellingComponentByGroup } = require('../../lib/cmscomponent');
const { getBaseSiteByCode } = require("../../lib/basesite");
const { checkBaseSite } = require("../../middleware/auth");
const { getCustomerByUid } = require("../../lib/customer");
const { getRatingData } = require("../../lib/customerReview");
const { getProductPriceDetails } = require("../../lib/pricerow");
const { getLanguageByIsoCode } = require("../../lib/language");

// fetch top selling component
// @route   POST /{baseSiteId}/cms/component/topselling
router.get("/:baseSiteId/cms/component/topselling", checkBaseSite,
  async (req, res) => {
    const baseSiteId = req.params.baseSiteId;
    const baseSite = await getBaseSiteByCode(baseSiteId);
    const contentCatalog = baseSite.contentCatalog;
    const catalog = baseSite.productCatalog;
    // console.log("catalog:", catalog);
    let currency;
    let currencySymbol;
    if (null != baseSite.defaultCurrency) {
      currency = baseSite.defaultCurrency.isocode;
      currencySymbol = baseSite.defaultCurrency.symbol;
    } else {
      currency = 'INR';
      currencySymbol = '₹';
    }
    let language;
    if (null != baseSite.defaultLanguage) {
      language = baseSite.defaultLanguage._id;
    } else {
      const language1 = await getLanguageByIsoCode("en_US");
      language = language1._id;
    }

    let existComponent = await getTopSellingComponentByCode('111', contentCatalog);
 
    let productList = [];
    if (existComponent) {
      for (product of existComponent.products) {
        media = product.medias.sort((a, b) => a.priority - b.priority).shift();
        // fetch the product Price
        var priceJson = await fetchProductPrice(product, catalog, currency, currencySymbol);
        //calculate reviewAvgRating  
        var reviews = await getRatingData(product, language);
        var reviewsJson = { productReviews: reviews };

        let topImageUrl =  (media ? media.main : '')
        let productJson = {
          code: product.code,
          images: topImageUrl,
          title: product.title,
          ...reviewsJson,
          ...priceJson,
        }
        productList.push(productJson);
      }
      if (productList && productList.length > 0) {
        return res.status(200).json({
          code: existComponent.code,
          title: existComponent.title,
          products: productList
        });
      } else {
        return res.status(400).json({
          error: 'No product associated with existing top selling component'
        });
      }

    } else {
      return res.status(400).json({
        error: 'No existing top selling component found for this customer'
      });
    }
  });

async function fetchProductPrice(product, catalog, currency, symbol) {
  var productPrice = await getProductPriceDetails(product.code, catalog, currency);
  var priceJson;
  if (productPrice) {
    priceJson = {
      price: {
        currencyIso: currency,
        formattedValue: symbol + productPrice.priceValue.toFixed(2),
        value: productPrice.priceValue.toFixed(2)
      }
    };
  }
  return priceJson;
}

// fetch top selling component
// @route   POST /{baseSiteId}/cms/component/topselling
router.get("/:baseSiteId/users/:userId/cms/component/topselling", checkBaseSite,
  async (req, res) => {
    const baseSiteId = req.params.baseSiteId;
    const userId = req.params.userId;
    const baseSite = await getBaseSiteByCode(baseSiteId);
    const contentCatalog = baseSite.contentCatalog;
    const catalog = baseSite.productCatalog;
    // console.log("catalog:", catalog);
    let currency;
    let currencySymbol;
    if (null != baseSite.defaultCurrency) {
      currency = baseSite.defaultCurrency.isocode;
      currencySymbol = baseSite.defaultCurrency.symbol;
    } else {
      currency = 'INR';
      currencySymbol = '₹';
    }

    let language;
    if (null != baseSite.defaultLanguage) {
      language = baseSite.defaultLanguage._id;
    } else {
      const language1 = await getLanguageByIsoCode("en_US");
      language = language1._id;
    }

    const customer = await getCustomerByUid(userId);
    //console.log(customer)
    let existComponent = await getTopSellingComponentByGroup(customer.userGroups, contentCatalog);
    //console.log(existComponent)
    let productList = [];
    if (existComponent) {
      for (product of existComponent.products) {
        var media;
        if(product.medias)
        media = product.medias.sort((a, b) => a.priority - b.priority).shift();
        // fetch the product Price
        var priceJson = await fetchProductPrice(product, catalog, currency, currencySymbol);
        //calculate reviewAvgRating  
        var reviews = await getRatingData(product, language);
        var reviewsJson = { productReviews: reviews };

        let topImageUrl =  (media ? media.main : '')
        let productJson = {
          code: product.code,
          images: topImageUrl,
          title: product.title,
          ...reviewsJson,
          ...priceJson,

        }
        productList.push(productJson);
      }
      if (productList && productList.length > 0) {
        return res.status(200).json({
          code: existComponent.code,
          title: existComponent.title,
          products: productList
        });
      } else {
        return res.status(400).json({
          error: 'No product associated with existing top selling component'
        });
      }

    } else {
      return res.status(400).json({
        error: 'No existing top selling component found for this customer'
      });
    }
  });


module.exports = router;
