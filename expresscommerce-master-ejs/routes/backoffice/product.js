const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const ProductModel = require('../../models/Product')
const ProductPriceModel = require('../../models/ProductPrice')
const { ensureAuth } = require("../../middleware/auth");
const { saveProductViaWeb } = require("../../dao/Product");
const { getProductDTOByProductModelService,getProductsService } = require("../../services/product");
const { getCatalogListService,getCatalogByIdService } = require('../../services/catalog');
const { getAllBrandDataService,getBrandById } = require('../../services/brand');
const { fetchSuperCategoriesService } = require('../../services/category');
const { getActiveCurrencyList } = require('../../services/currency');
const { getActiveWarehouseList } = require('../../services/warehouse');
const ProductStockModel = require('../../models/ProductStock')



const ProductTypeArr = {"ORDINARY":"ORDINARY", "VARIANT":"VARIANT","BUNDLE":"BUNDLE", "WARRANTY":"WARRANTY","DIGITAL":"DIGITAL"}
const unitTypeArr = {"EA":"EA", "NOS":"NOS", "PKG":"PKG", "KIT":"KIT", "KG":"KG", "GM":"GM","MTR":"MTR", "CM":"CM","LTR":"LTR"}
const inUseStatusArr = {"NEW":"NEW", "OBSOLETE":"OBSOLETE", "CONTEMPORARY":"CONTEMPORARY", "TREND":"TREND"}
const statusArr = {"ACTIVE":"ACTIVE", "INACTIVE":"INACTIVE", "SUSPENDED":"SUSPENDED"}
const fnsStatusArr = {"FASTMOVING":"FASTMOVING", "SLOWMOVING":"SLOWMOVING", "NONMOVING":"NONMOVING"}
const inStockStatusArr = {"notSpecified":"notSpecified", "outOfStock":"outOfStock", "forceInStock":"forceInStock"}


var leftnavigationlinkactive = "manageCatalogs";

// @desc   search products from solr based on term
// @route   GET /products/search
router.post('/search', async (req, res) => {
  try {
    const term = req.body.keyword
    console.log(term);
    const response = await searchProductsByTerm(term);
    var products = {
      result: response.docs,
      total: response.numFound,
      error: response.error
    }
    res.render("products/list", {
      products,
      csrfToken: req.csrfToken()
    });
  } catch (err) {
    console.error(err)
    res.status(500).json({
      error: err
    })
  }
});
// @desc    Search ALL Products
// @route   GET /products
router.get("/", async (req, res) => {
  try {
    console.log("****************")
    // add solr call
    const products = await getProductsService();
    var response = {
      result: products,
      total: products.length,
      

    }
    //console.log("All customers details is ::",customers)
    res.render("products/list", {
      response,
      csrfToken: req.csrfToken(),
      leftnavigationlinkactive:leftnavigationlinkactive,
      leftsubnavigationlinkactive:"products",
    });
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

async function populateProduct(products) {
  let productDTOs = [];
  for (product of products) {
    let productDTO = await getProductDTOByProductModelService(product)
    productDTOs.push(productDTO);
  };
  return productDTOs;
}

// @desc    Delete product from DB
// @route   DELETE /products/remove/:id
router.post("/remove/:id", async (req, res) => {
 
  try {
    let productDetail = await ProductModel.findById({
      _id: req.params.id,
    }).lean();
    if (!productDetail) {
      return res.render(_404View);
    }
    await ProductModel.remove({ _id: req.params.id });
    await ProductStockModel.remove({ productCode: productDetail.code,catalog:productDetail.catalog });
    await ProductPriceModel.remove({ productCode: productDetail.code,catalog:productDetail.catalog });
    res.redirect("/products");
  } catch (err) {
    console.error(err);
    return res.render(_500errorView);
  }
});


// @desc    Show product edit page
// @route   GET /products/update/:id
router.get("/:id", async (req, res) => {
  const catalogList= await getCatalogListService("active");
 const brandList=await getAllBrandDataService();
const categoriesList= await fetchSuperCategoriesService(10);
const currencyList= await getActiveCurrencyList();
const activeWarehouseList= await getActiveWarehouseList();
  try {
    

    res.render("products/edit", {
      csrfToken: req.csrfToken(),
      ProductTypeArr:ProductTypeArr,
      unitTypeArr:unitTypeArr,
      inUseStatusArr:inUseStatusArr,
      statusArr:statusArr,
      fnsStatusArr:fnsStatusArr,
      catalogList:catalogList,
      leftnavigationlinkactive:leftnavigationlinkactive,
      leftsubnavigationlinkactive:"products",
      categoriesList:categoriesList,
      brandList:brandList,
      currencyList:currencyList,
      inStockStatusArr:inStockStatusArr,
      activeWarehouseList:activeWarehouseList,
    });
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
});

// @desc    Update Product inDB
// @route   PUT /products/update/:id
router.put("/update/:id", async (req, res) => {
  try {
    //await updateCustomerInSolr(req.body);

    res.redirect("/products");
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
});

// @desc    Show add page
// @route   GET /solr/customer/add
router.get("/add",ensureAuth, async (req, res) => {
  //console.log("inllll");

 const catalogList= await getCatalogListService("active");
 const brandList=await getAllBrandDataService();
const categoriesList= await fetchSuperCategoriesService(10);
const currencyList= await getActiveCurrencyList();
const activeWarehouseList= await getActiveWarehouseList();
//console.log(categoriesList);


  res.render("products/add", {
    csrfToken: req.csrfToken(),
    ProductTypeArr:ProductTypeArr,
    unitTypeArr:unitTypeArr,
    inUseStatusArr:inUseStatusArr,
    statusArr:statusArr,
    fnsStatusArr:fnsStatusArr,
    catalogList:catalogList,
    leftnavigationlinkactive:leftnavigationlinkactive,
    leftsubnavigationlinkactive:"products",
    categoriesList:categoriesList,
    brandList:brandList,
    currencyList:currencyList,
    inStockStatusArr:inStockStatusArr,
    activeWarehouseList:activeWarehouseList,

  });
});

// @desc    Create Customer in solr index
// @route   POST /solr/customer/add

router.post("/add", ensureAuth, [
  body("code").notEmpty(),
  body("title").notEmpty()], async (req, res) => {
  //const accessmoules=JSON.parse(req.body.modulename);
  //console.log(accessmoules)

  //console.log("pasedsfsdfsdf");
  try {
    const catalogList= await getCatalogListService("active");
    const brandList=await getAllBrandDataService();
    const categoriesList= await fetchSuperCategoriesService(10);
    const currencyList= await getActiveCurrencyList();
    const activeWarehouseList= await getActiveWarehouseList();
    const errors = validationResult(req);
    console.log(errors);

    if (!errors.isEmpty()) {
      return res.render("products/add", {
        code: req.body.isocode,
        title: req.body.title,
        errorMessage: "One or more value for mandatory field(s) missing",
        csrfToken: req.csrfToken(),
        ProductTypeArr:ProductTypeArr,
        unitTypeArr:unitTypeArr,
        inUseStatusArr:inUseStatusArr,
        statusArr:statusArr,
        fnsStatusArr:fnsStatusArr,
        catalogList:catalogList,
        leftnavigationlinkactive:leftnavigationlinkactive,
        leftsubnavigationlinkactive:"products",
        categoriesList:categoriesList,
        brandList:brandList,
        currencyList:currencyList,
        inStockStatusArr:inStockStatusArr,
        activeWarehouseList:activeWarehouseList,
        csrfToken: req.csrfToken(),

      });
    }

    const products = await ProductModel.findOne({ code: req.body.code });
    if (products) {
      return res.render("products/add", {
        code: req.body.code,
        title: req.body.title,
        ProductTypeArr:ProductTypeArr,
        unitTypeArr:unitTypeArr,
        inUseStatusArr:inUseStatusArr,
        statusArr:statusArr,
        fnsStatusArr:fnsStatusArr,
        catalogList:catalogList,
        leftnavigationlinkactive:leftnavigationlinkactive,
        leftsubnavigationlinkactive:"products",
        categoriesList:categoriesList,
        brandList:brandList,
        currencyList:currencyList,
        inStockStatusArr:inStockStatusArr,
        activeWarehouseList:activeWarehouseList,
        csrfToken: req.csrfToken(),

        
        
      });
    } else {

      const catalogcode = await getCatalogByIdService(req.body.catalog);
      const productCatagories=JSON.parse(req.body.categories);
      console.log("brand"+ req.body.brand);

      await ProductModel.create({ 
        code: req.body.code,
        title: req.body.title,
        description:req.body.description,
        catalog:catalogcode,
        brand:String(req.body.brand),
        productType:req.body.productType,
        inUseStatus:req.body.inUseStatus,
        unit:req.body.unit,
        status:req.body.status,
        categories:productCatagories,
        csrfToken: req.csrfToken(),

       });

       const productPrice = await ProductPriceModel.findOne({ productCode: req.body.code,currencyIsoCode:req.body.currencyIsoCode,catalog:catalogcode });
       if (productPrice) {

       }else{
        await ProductPriceModel.create({ 
          productCode: req.body.code,
          priceValue: Number(req.body.priceValue),
          currencyIsoCode:req.body.currencyIsoCode,
          catalog:catalogcode,
          priceGroup:"customerGroup",
          userpriceGroup:"customerGroup",
          inUseStatus:req.body.inUseStatus,
          unit:req.body.unit,
          unitFactor:1,
          csrfToken: req.csrfToken(),
  
         });

       }

       const productStock = await ProductStockModel.findOne({ productCode: req.body.code,warehouseCode:req.body.warehouseCode,catalog:catalogcode });
       if (productStock) {

       }else{
        await ProductStockModel.create({ 
          productCode: req.body.code,
          warehouseCode: req.body.warehouseCode,
          availableQty:Number(req.body.availableQty),
          inStockStatus:req.body.inStockStatus,
          maxPreOrder:Number(req.body.maxPreOrder),
          maxStockLevelHistoryCount:Number(req.body.maxStockLevelHistoryCount),
          overSelling:Number(req.body.overSelling),
          preOrder:Number(req.body.preOrder),
          catalog:catalogcode,
          reserved:Number(req.body.reserved),
         });

       }

       
      return res.redirect("/products");
    }
  } catch (err) {
    console.error(err);
    res.render(_500errorView);
  }
});

module.exports = router
