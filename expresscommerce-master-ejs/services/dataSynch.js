const path = require('path');
const fs = require('fs');
const { saveCompany } = require("../dao/Company");
const { saveLanguage } = require("../dao/Language");
const { saveCurrency } = require("../dao/Currency");
const { saveCountry } = require("../dao/Country");
const { saveUserGroup } = require("../dao/UserGroup");
const { saveZone } = require("../dao/Zone");
const { saveRegion } = require("../dao/Region");
const { saveBasesite } = require("../dao/Basesite");
const { saveDeliveryModes } = require("../dao/DeliveryMode");
const { saveOAuthClient } = require("../dao/OAuthClient");
const { saveBrand } = require("../dao/Brand");
const { saveModule,removeModule } = require("../dao/Module");
const { saveSubModule,removeSubModule} = require("../dao/SubModule");
const { saveLeftMenu,updLeftnavigation } = require("../dao/LeftNavigation");

async function essentialDataUpload(fileName, callBack) {
    const file = fs.readFileSync(path.join(__dirname, '../data/' + fileName + '.json'), 'utf8');
    const fileData = JSON.parse(file);
    saveCompany(fileData.company);
    saveLanguage(fileData.language);
    saveCurrency(fileData.currency);
    saveCountry(fileData.country);
    saveRegion(fileData.region);
    saveUserGroup(fileData.usergroup);
    saveZone(fileData.zone);
    saveBasesite(fileData.basesite);
    saveDeliveryModes(fileData.deliverymode);
    saveOAuthClient(fileData.oauth);
    saveBrand(fileData.brand);
     //removeModule();
    // Save newly added left navigation data.
    //saveModule(fileData.module);
   //await removeSubModule();
    //saveSubModule(fileData.submodule);
    //saveLeftMenu(fileData.leftmenu);
    //updLeftnavigation();

    //console.log(fileData.country);
    //console.log(fileData.region);

    //callBack(fileData);

}

async function sampleDataUpload(fileName, callBack) {
    const file = fs.readFileSync(path.join(__dirname, '../data/' + fileName + '.json'), 'utf8');
    const fileData = JSON.parse(file);
    // console.log(fileData);
    callBack(fileData);

}

async function sampleMediaDataUpload(folderName, callBack) {

    fs.readdir(path.join(__dirname, '../data/media'), (err, files) => {
        files.forEach(file => {
            console.log(file);
            callBack(file);
        });
    });
}

async function cmsComponentUpload(fileName, callBack) {
    const file = fs.readFileSync(path.join(__dirname, '../data/' + fileName + '.json'), 'utf8');
    const fileData = JSON.parse(file);
    callBack(fileData);
    //console.log(fileData);
}

async function lefNavigationUpload(fileName, callBack) {
    const file = fs.readFileSync(path.join(__dirname, '../data/' + fileName + '.json'), 'utf8');
    const fileData = JSON.parse(file);
   
   updLeftnavigation();
   
}

module.exports = {
    essentialDataUpload, sampleDataUpload, cmsComponentUpload, sampleMediaDataUpload,lefNavigationUpload
}