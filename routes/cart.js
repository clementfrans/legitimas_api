// [SECTION] DEPENDENCIES
const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart");

// ADD ITEMS TO THE CART
router.post("/add-to-cart", cartController.addToCart);

// UPDATE PRODUCT QUANTITY IN THE CART
router.put("/update-product-quantity", cartController.updateProductQuantity);

// RETRIEVE THE CART
router.get("/", cartController.getCart);

// RETRIEVE USER'S CART
router.get("/get-cart", cartController.getCart);

// ADD ITEMS TO CART
router.post("/add-to-cart", cartController.addToCart);

// UPDATE PRODUCT QUANTITY IN THE CART
router.patch("/update-cart-quantity", cartController.updateProductQuantity);

module.exports = router;
