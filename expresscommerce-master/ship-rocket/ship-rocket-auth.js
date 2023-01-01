var axios = require('axios');
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('properties/local.properties');
var shipRocketUrl= properties.get("SHIP_ROCKET_URL");
var shipRocketEmail= properties.get("SHIP_ROCKET_AUTH_USERNAME");
var shipRocketPassword= properties.get("SHIP_ROCKET_AUTH_PASSWORD");

//const SHIP_ROCKET_URL = await process.env.SHIP_ROCKET_URL;
var data = JSON.stringify({
    "email": shipRocketEmail,
    "password": shipRocketPassword
});

var config = {
    method: 'post',
    url: shipRocketUrl+'/v1/external/auth/login',
    headers: {
        'Content-Type': 'application/json'
    },
    data: data
};

const auth = async () => {
    var response = await axios(config);
    console.log(JSON.stringify(response.data));
    return response.data;
}
module.exports={auth,shipRocketUrl}