
// DEPEDENCIES
const express = require("express");
const userController = require("../controllers/user");
const {verify, verifyAdmin} = require("../auth");
const router = express.Router();

// ROUTES FOR USER
router.post("/register", userController.registerUser);

router.post("/login", userController.loginUser);

router.get("/details", verify, userController.retrieveUserDetails);

router.patch("/:id/set-as-admin", verify, verifyAdmin, userController.updateUserAsAdmin);

router.patch("/updatepassword", verify, userController.updatePassword);    

// EXPORT AS MODULE
module.exports = router;

