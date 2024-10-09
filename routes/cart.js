// [SECTION] DEPENDENCIES
const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart");
const { verify, verifyAdmin } = require("../auth");

// RETRIEVE USER'S CART
router.get("/get-cart", verify, cartController.getCart);

// ADD ITEMS TO CART
router.post("/add-to-cart", verify, cartController.addToCart);

// UPDATE PRODUCT QUANTITY IN THE CART
router.patch("/update-cart-quantity", verify, cartController.updateProductQuantity);

module.exports = router;
