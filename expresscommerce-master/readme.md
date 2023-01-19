# expresscommerce

# Step 1: install nodemon
npm install -g nodemon
 
# Step2 : run this command to install all module dependencies, it will install all module mentioned in package.json file
npm install

# Step 3 : start the backoffice server uncomment

npm run backoffice

# start the occ server

npm run occ

https://www.youtube.com/watch?v=SBvmnHTQIPY


# Solr installation
1. Download 
https://solr.apache.org/guide/solr/latest/getting-started/solr-tutorial.html
https://solr.apache.org/downloads.html

2. 
for starting solr server
>solr start -p 8984

for creating code (one time only)
>solr create -c us-product-catalog

for stoping solr
>solr stop -p 8984

3. 
https://www.npmjs.com/package/solr-node

# Enabling Cron Jobs
https://www.npmjs.com/package/node-cron

4. 
# Enabling session & cookie
npm i express express-session cookie-parser

5. 
# send flash messages
npm install express-flash --save

6. 
# Integration with Ship rocket. Please follow this link to get more about shiprocket API. https://apidocs.shiprocket.in/#intro
# I have added  auth API and order create api in lib\schedulers.js. 

7. How to enable Optimistic Concurrency
# https://thecodebarbarian.com/whats-new-in-mongoose-5-10-optimistic-concurrency.html

8. How to enable Transactions in mongoose
# https://mongoosejs.com/docs/transactions.html

