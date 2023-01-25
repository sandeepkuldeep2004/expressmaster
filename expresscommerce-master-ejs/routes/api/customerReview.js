const express = require("express");
const router = express.Router();
const CustomerReviewModel = require("../../models/CustomerReview");
const { ensureTokenAuth,ensureCustomerAuth } = require("../../middleware/auth");
const { getProductReviews,getReviewsCustomerProductWise } = require("../../lib/customerReview");
const { getProduct } = require("../../lib/product");
const { getCatalog } = require("../../lib/catalog");
const { getBaseSiteByCode,getCurrentBaseSiteByOAuthCode,getBaseSiteById } = require("../../lib/basesite");
const { getLanguageByIsoCode } = require("../../lib/language");
const { getCurrencyByIsoCode } = require("../../lib/currency");
const { getCustomerByUid } = require("../../lib/customer");

// @desc   get product based on code and session catalog
// @route   get /product based on code 
router.get("/:baseSiteId/products/:productCode/reviews", ensureTokenAuth, async (req, res) => {
    try { 
      const oAuthClient = req.user;    
      console.log("oAuthClient",oAuthClient);
      const baseSite = await getBaseSiteByCode(req.params.baseSiteId);  
      console.log("baseSite",baseSite)      
      const catalog = baseSite.productCatalog; 
      const languageParam = "en_US";
      const currencyParam =  "USD";    
      const language1 = await getLanguageByIsoCode(languageParam);
      const currency1 = await getCurrencyByIsoCode(currencyParam);
      const language=language1._id;
      const currency=currency1._id;
      const product = await getProduct(req.params.productCode,catalog);  
      console.log("product"+product);   
      const reviews = await getProductReviews(product,language);
      console.log("reviews"+reviews); 
      if(reviews){
          res.status(200).json(reviews);
      }else{
          res.status(200).json("No reviews Found For product code:"+req.params.code+" & language:"+language);
      }
      
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: err,
      });
    }
  });

  // @desc  Submit product reivew 
// @route   Post /review based on product
router.post("/:baseSiteId/users/:userId/products/:productCode/reviews/submitreview", ensureCustomerAuth, async (req, res) => {
  try {  
    const userId = req.params.userId;
    const customer = await getCustomerByUid(userId);
    if(null === customer){
      return res.status(200).json({"error":400,"message":"Customer Not Found","userId":req.customer});
    }
    const baseSite = await getBaseSiteById(customer.baseSite);        
    const catalog = baseSite.productCatalog; 
    const languageParam = "en_US";
    const currencyParam =  "USD";    
    const language1 = await getLanguageByIsoCode(languageParam);
    const currency1 = await getCurrencyByIsoCode(currencyParam);
    const language=language1._id;
    const currency=currency1._id;  
    const product = await getProduct(req.body.code,catalog);    
   
      const customerReviews=await getReviewsCustomerProductWise(product,customer,language);  
      console.log("customerReviews:"+JSON.stringify(customerReviews.length)); 
      if(customerReviews.length>0){
        return res.status(400).json("You AllReady Given Review For This Product.");
      } 

    const customerReview=new CustomerReviewModel({
      user: customer,
      product:product,
      language: language,
      headline: req.body.headline,
      comment: req.body.comment,
      rating: req.body.rating,
      });
      
      customerReview.save(function (err){
          if(err){
            res.status(500).json({
              error:err
            })
          }else{           
            res.status(200).json(customerReview);
          }
      })
    
    
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err,
    });
  }
});


  // @desc  Update Customer reivew for any product
// @route   Post /review based on product
router.patch("/:baseSiteId/users/:userId/products/:productCode/reviews/updatereview", ensureCustomerAuth, async (req, res) => {
  try {  
    const userId = req.params.userId;
    const customer = await getCustomerByUid(userId);
    if(null === customer){
      return res.status(200).json({"error":400,"message":"Customer Not Found","userId":req.customer});
    }
    const baseSite = await getBaseSiteById(customer.baseSite);        
    const catalog = baseSite.productCatalog; 
    const languageParam = "en_US";
    const currencyParam =  "USD";    
    const language1 = await getLanguageByIsoCode(languageParam);
    const currency1 = await getCurrencyByIsoCode(currencyParam);
    const language=language1._id;
    const currency=currency1._id;
    const product = await getProduct(req.body.code,catalog);
   
    const customerReviews=await getReviewsCustomerProductWise(product,customer,language);  
    console.log("customerReviews:"+JSON.stringify(customerReviews.length)); 
    if(customerReviews.length<=0){
      return res.status(400).json("Customer Review Not Available For This Product");
    } 
    const customerReview=customerReviews[0]; 
     //CustomerReview  
     reviewParams = {
      headline : req.body.headline,
      comment:req.body.comment,
      rating:req.body.rating
    };
    const savedReview =  await CustomerReviewModel.findByIdAndUpdate(customerReview._id,{$set:reviewParams});
    if(savedReview){    
      return res.status(200).json("Product Review Updated Successfully");
    }else{
      return res.status(200).json("Product Review Updated Failed");
    }
    
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err,
    });
  }
});

module.exports = router;
