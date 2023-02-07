const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { ensureAuth } = require("../../middleware/auth");
const UserGroupModel = require("../../models/UserGroup");
const {getUserGroupsBybaseSiteService} = require("../../services/UserGroup.js");

router.post("/getselectbox", ensureAuth, async (req, res) => {
  console.log("inasdfasdf"+req.body.basesitereg);
const userGroupBaseSiteList= await getUserGroupsBybaseSiteService(req.body.basesitereg);
console.log("inasdfasdf"+userGroupBaseSiteList);

res.send(userGroupBaseSiteList);
});


module.exports = router;
