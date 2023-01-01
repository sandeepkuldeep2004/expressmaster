const express = require("express");
const router = express.Router();
const colors = require("colors");

const SolrNode = require("solr-node");
const people = require("../../data/people.json");
const { ensureAuth } = require("../../middleware/auth");
var cron = require('node-cron');
const { templateSettings } = require("lodash");

var client = new SolrNode({
  host: "127.0.0.1",
  port: "8984",
  core: "mycore",
  protocol: "http",
});

const task = cron.schedule('* 15 * * *', () =>  {
  console.log("Updating all Users")
  people.forEach((person) => {
    client.update(person, function (err, result) {
      if (err) {
        console.log("Error while indexing User in Solr:: ",err);
        return;
      }
      console.log("Response:", result.responseHeader);
    });
  });
},{
  scheduled:false
});

//task.start();

// Add
//Solr adds ID to each document by default, however, if you specify an id, solr will use that instead.

// client.update(data, function(err, result) {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log('Response:', result.responseHeader);
// });

//-------------------------------------------------------------------------------------------

// // Add a bunch of docs
router.post("/updateIndex", (req, res) => {
  people.forEach((person) => {
    client.update(person, function (err, result) {
      if (err) {
        console.log(err);
        return;
      }
      console.log("Response:", result.responseHeader);
    });
  });
  res.redirect("/solr/customers/viewAll");
});

//-------------------------------------------------------------------------------------------

// // Delete
// const stringQuery = 'id:2';    // delete document with id 2
// const deleteAllQuery = '*';    // delete all
// const objectQUery = {id: 'd7497504-22d9-4a22-9635-88dd437712ff'};   // Object query
// client.delete(deleteAllQuery, function(err, result) {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log('Response:', result.responseHeader);
// });

//-------------------------------------------------------------------------------------------

// const genderQuery = {
//   gender: 'Female'
// };

router.post("/search", async (req, res) => {
  // Search
  var keyword=  '*'+req.body.keyword+'*';
  var OR_OP=' OR ';
  var searchString='first_name:'+keyword+OR_OP+'last_name:'+keyword+OR_OP+'email:'+keyword;
  const authorQuery = {
    first_name:keyword
   };

  // Build a search query var
  const searchQuery = client
    .query()
    .q(searchString)
    .addParams({
      wt: "json",
      indent: true
    })
    .start(0)
    .rows(100);
    console.log(searchQuery);
  
  
 try {
  const result = await client.search(searchQuery);
  console.log('Response:', result);
  console.log('Response:', result.response);
 const customers=result.response.docs
  res.render('solr_customers/list',{
    customers,
    csrfToken:req.csrfToken()
  }) ;
} catch(e) {
  console.error(e);
}  
});


const removeCustomerInSolr= async (id)=>{
  var objQuery = {id:+id}
    // Build a search query var
    try {
      // Update document to Solr server
 // Delete document using objQuery
 console.log("query:: ",objQuery)
client.delete(objQuery, function(err, result) {
  if (err) {
     console.log("Error while deleting customer",err);
     return;
  }
  console.log('Response:', result.responseHeader);
});
   } catch(e) {
     console.error(e);
   }
   }

const createCustomerInSolr= async (req)=>{
//  var ip =req.headers['x-forwarded-for']
console.log("creating new Customer",req)

  var data ={
      id: req.id,
      first_name:req.first_name,
      last_name: req.last_name,
      email:req.email,
      gender: req.gender,
      ip_address:'99.99.99.99'
    }
    // Build a search query var
    try {
      // Update document to Solr server
  client.update(data, function(err, result) {
    if (err) {
       console.log(err);
       return;
    }
    console.log('Response:', result.responseHeader);
  });
   } catch(e) {
     console.error(e);
   }
   }

const updateCustomerInSolr= async (req)=>{
  
var data ={
    id: req.id,
    first_name:req.first_name,
    last_name: req.last_name,
    email:req.email,
    gender: req.gender,
    ip_address:'99.0.0'
  }
  // Build a search query var
  try {
    // Update document to Solr server
client.update(data, function(err, result) {
  if (err) {
     console.log(err);
     return;
  }
  console.log('Response:', result.responseHeader);
});
 } catch(e) {
   console.error(e);
 }
 }

const getCustomerFromSolr= async (id)=>{
  var strQuery = 'id:'+id;
  // Build a search query var
 const query = client
   .query()
   .q(strQuery)
   .addParams({
     wt: "json",
     indent: true,
   })
   .start(0)
   .rows(10);
 
  try {
    console.log('request:', query)
    const result = await client.search(query);
   console.log('Response:', result.response);
   return result.response.docs[0];
 } catch(e) {
   console.error(e);
 }
 }

const getAllCustomersFromSolr= async ()=>{
 const authorQuery="*:*";
 const result=null;
// Build a search query var
const query = client
  .query()
  .q(authorQuery)
  .addParams({
    wt: "json",
    indent: true,
  })
  .start(0)
  .rows(100);

 try {
  const result = await client.search(query);
 // console.log('Response:', result.response);
  return result.response.docs;
} catch(e) {
  console.error(e);
}
}
// @desc    Show all orders
// @route   GET /orders
router.get("/customers/viewAll", async (req, res) => {
  try {
    // add solr call
    const customers = await getAllCustomersFromSolr();

//console.log("All customers details is ::",customers)
    res.render("solr_customers/list", {
      customers,
      csrfToken: req.csrfToken()
    });
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});


// @desc    Delete customer from Solr
// @route   DELETE /solr/customer/remove/:id
router.delete("/customer/remove/:id", async (req, res) => {
  try {
    console.log(req.params)
    removeCustomerInSolr(req.params.id);
    res.redirect("/solr/customers/viewAll");
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
});


// @desc    Show edit page
// @route   GET /solr/customer/:id
router.get("/customer/:id", async (req, res) => {
  try {
    const customer = await getCustomerFromSolr(req.params.id);
  
    console.log("All customers details is ::",customer)
    if (!customer) {
      return res.render("error/404");
    }

    res.render("solr_customers/edit", {
      customer,
      csrfToken: req.csrfToken()
    });
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
});

// @desc    Update Customer index value
// @route   PUT /solr/customer/:id
router.put("/customer/:id", async (req, res) => {
  try {
    await updateCustomerInSolr(req.body);
  
    res.redirect("/solr/customers/viewAll");
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
});

// @desc    Show add page
// @route   GET /solr/customer/add
router.get("/customer", async (req, res) => {
  res.render("solr_customers/add", {
    csrfToken: req.csrfToken(),
  });
});

// @desc    Create Customer in solr index
// @route   POST /solr/customer/add
router.post("/customer", async (req, res) => {
  try {
    await createCustomerInSolr(req.body);
  
    res.redirect("/solr/customers/viewAll");
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
});

module.exports = router;
