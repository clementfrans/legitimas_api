// [SECTION] DEPENDENCIES
const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart");
const { verify, verifyAdmin } = require("../auth");

// RETRIEVE USER'S CART
router.get("/get-cart", verify, cartController.getCart);

// ADD ITEMS TO CART
router.post("/add-to-cart", verify, cartController.addToCart);
/* 
if > success cart NOT have products 
  return 404 - failed
else if > product not available 
  return 404 - "product not available"
else
  return 202 - sucessfully added to cart
*/

// UPDATE PRODUCT QUANTITY IN THE CART
router.patch(
  "/update-cart-quantity",
  verify,
  cartController.updateProductQuantity
);

router.patch(
  "/:productId/remove-from-cart",
  verify,
  cartController.removeItemFromCart
);

router.put("/clear-cart", verify, cartController.clearCart);

module.exports = router;
