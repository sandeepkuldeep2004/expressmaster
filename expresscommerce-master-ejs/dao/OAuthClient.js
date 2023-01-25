const OAuthClientModel = require('../models/OAuthClient')

module.exports = {
  saveOAuthClient: async (data) => {
    //console.log('Insert UserGroup started');
    Object.entries(data).forEach(async (element) => {

      let oauthclient = await OAuthClientModel.findOne({ clientId: element[1].clientId }).lean();
      if (oauthclient) {
        console.log(
          "oauth with clientId " + element[1].clientId + " already exists, just updating the content"
        );
         OAuthClientModel.findOneAndUpdate(
          { clientId: element[1].clientId },
          {
            $set: {
              clientSecret: element[1].clientSecret,
              resourceIds: element[1].resourceIds,
              scope: element[1].scope,
              authorities: element[1].authorities,
              status: element[1].status,
            }
          }, function (err) {
            if (err)
              console.log(err);
          })
      } else {
        oauthclient = await OAuthClientModel({
          clientId: element[1].clientId,
          clientSecret: element[1].clientSecret,
          resourceIds: element[1].resourceIds,
          scope: element[1].scope,
          authorities: element[1].authorities,
          status: element[1].status,
        })

        oauthclient.save(function (err) {
          if (err) {
            console.log(err);
          }
          console.log('New OAuth with ClientId ', element[1].clientId);
        });
      }
    })
  }
};
