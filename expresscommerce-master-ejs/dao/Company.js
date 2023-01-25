/* const CompanyModel = require("../models/Company"); */
const {getCompanyByIsocode} = require("../lib/company");

module.exports = {
  saveCompany: async (data) => {
    console.log("Company with same isocode " + data + " already exists");
    Object.entries(data).forEach(async (element) => {
      const company = await getCompanyByIsocode(element[1].isocode);
      if (company) {
        console.log("Company with same isocode " + element[1].isocode + " already exists");
      } else {
        const companyModel = new CompanyModel({
          isocode: element[1].isocode,
          name: element[1].name,
          description: element[1].description          
        });
        companyModel.save(function (err) {
          if (err) {
            console.log(err);
          }
        });
      }
    });
  },
};
