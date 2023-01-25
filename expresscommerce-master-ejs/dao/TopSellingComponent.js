const TopSellingComponentModel = require('../models/TopSellingComponent')
const { getCatalog } = require('../lib/catalog');
const { getUserGroup } = require('../lib/usergroup');
const { getTopSellingComponentByCode } = require('../lib/cmscomponent');
const { getProductList, getProduct } = require('../lib/product');
const { uuid } = require('uuidv4');


module.exports = {
    saveTopSellingComponent: async (data) => {
        Object.entries(data).forEach(async element => {
            console.log('Creating New CMS component with values:: ', element[1]);
            const contentCatalog = await getCatalog(element[1].catalog);
            const userGroup = await getUserGroup(element[1].visibleToUserGroup);
            productList = await getProductList(element[1].products);
            // console.log('All products', productList);
            let existComponent = await getTopSellingComponentByCode(element[1].code, contentCatalog);
            if (existComponent) {
                console.log("Top selling component with code: ", element[1].code, " already exist hence updating the content only!!")
                TopSellingComponentModel.findOneAndUpdate(
                    { code: element[1].code, catalog: contentCatalog },
                    {
                        $set: {
                            products: productList,
                            title: element[1].title,
                            visibleToUserGroup: userGroup,
                        }
                    }, function (err) {
                        if (err)
                            console.log(err);
                    })

            } else {
                const topSellingComponentModel = new TopSellingComponentModel({
                    code: element[1].code,
                    products: productList,
                    catalog: contentCatalog,
                    title: element[1].title,
                    visibleToUserGroup: userGroup,
                })
                //      console.log('topSellingComponentModel : ', topSellingComponentModel)
                topSellingComponentModel.save(function (err) {
                    if (err) {
                        console.log(err);
                    }
                })
                console.log("New Top selling component is creating with code: ", element[1].code)
            }
        });
    }
}