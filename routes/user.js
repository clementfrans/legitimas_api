
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
router.patch("/update-password", verify, userController.updatePassword);  


// router.patch("/update-password", userController.updatePassword); 

// EXPORT AS MODULE
module.exports = router;

// ENV CONTENT
// PORT=4000
// AUTH_SECRET_KEY=ECommerceAPI
// JWT_SECRET_KEY=ECommerceAPI
// MONGODB_STRING='mongodb+srv://capstone2delossantosdelrosario:admin1234@cluster0.i6dj2.mongodb.net/e-commerce-api?retryWrites=true&w=majority&appName=Cluster0'