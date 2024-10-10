// DEPENDENCIES
const express = require("express");
const productController = require("../controllers/product");
const { verify, verifyAdmin } = require("../auth");
const router = express.Router();

// CREATE ORDER
router.post("/checkout", verify, orderController.createOrder);

// RETRIEVE LOGGED IN USER'S ORDERS
router.get("/my-orders", verify, orderController.retrieveMyOrder);

// RETRIEVE ALL USER'S ORDERS
router.get("/checkout", verify, verifyAdmin, orderController.retrieveAllOrders);

// EXPORT AS MODULE
module.exports = router;
