const router = require("express").Router();
const userCtrl = require("../controllers/userCtrl");

//Register user
router.post("/register", userCtrl.register);

//Login User
router.post("/login", userCtrl.loginUser);

//verify Token
router.get("/verify", userCtrl.verifiedToken);

module.exports = router;
