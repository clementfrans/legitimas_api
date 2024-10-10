// DEPENDENCIES
const express = require("express");
const orderController = require("../controllers/order");
const { verify, verifyAdmin } = require("../auth");
const router = express.Router();

// CREATE ORDER
router.post("/checkout", verify, orderController.createOrder);

// RETRIEVE LOGGED IN USER'S ORDERS
router.get("/my-orders", verify, orderController.retrieveMyOrder);

// RETRIEVE ALL USER'S ORDERS
router.get("/all-orders", verify, verifyAdmin, orderController.retrieveAllOrders);

// EXPORT AS MODULE
module.exports = router;
