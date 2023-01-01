const express = require("express");
const router = express.Router();
const OAuthClientModel = require("../../models/OAuthClient");
const jwt = require("jsonwebtoken");
const { checkBaseSite } = require("../../middleware/auth");
const SECRET_KEY = process.env.SECRET_KEY;
const ANOTHER_SECRET_KEY = process.env.ANOTHER_SECRET_KEY;


let refreshTokens = [];

// @desc    API Landing page
// @route   GET /
router.get("/:baseSiteId/", (req, res) => {
  res
    .status(200)
    .send(
      "<h1>Welcome to Xpress Commerce API HUB </h1><p>You can fetch api with Token only</p>"
    );
});

// @desc    Login/Landing page
// @route   GET /
router.post("/:baseSiteId/auth/token", checkBaseSite, (req, res) => {
  const clientkey = req.body.clientkey;
  const secretkey = req.body.secretkey;
  console.log('client key:' + clientkey);
  console.log('secret key:' + secretkey);

  OAuthClientModel.findOne({
    clientId: clientkey,
    clientSecret: secretkey,
    active: true,
  })
    .then((OAuthClient) => {
      // console.log(' found matching result in DB:'+ OAuthClient);
      const accessToken = generateAccessToken(OAuthClient.clientId);
      //  console.log(' generated token:'+ accessToken);
      const refreshToken = jwt.sign(OAuthClient.clientId, ANOTHER_SECRET_KEY);
      // console.log(' generated refresh token:'+ refreshToken);
      refreshTokens.push(refreshToken);

      res.json({
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    })
    .catch((err) => {
      res.status(404)
      res.json({
        message: "Invalid Client Id or Secret Key",
      });
    });
});

router.post("/:baseSiteId/auth/token/refresh", checkBaseSite, (req, res) => {
  const lastRefreshToken = req.body.token;
  if (lastRefreshToken == null) {
    res.sendStatus(401);
  }
  if (!refreshTokens.includes(lastRefreshToken)) {
    res.sendStatus(401);
  }
  jwt.verify(lastRefreshToken, ANOTHER_SECRET_KEY, (err, user) => {
    if (err) {
      res.sendStatus(401);
    }
    const newtoken = generateAccessToken(user);
    res.json({
      accessToken: newtoken,
    });
  });
});

function generateAccessToken(user) {
  return jwt.sign(user, SECRET_KEY);
}


module.exports = router;
