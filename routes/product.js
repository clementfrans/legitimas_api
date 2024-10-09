// DEPENDENCIES
const express = require("express");
const productController = require("../controllers/product");
const { verify, verifyAdmin } = require("../auth");
const router = express.Router();

// ROUTES FOR USER
router.post("/", verify, verifyAdmin, productController.createProduct);
router.get("/all", verify, verifyAdmin, productController.getAllProducts);
router.get("/active", productController.getAllActiveProducts);
router.get("/:productId", productController.getProduct);

// ROUTES FOR PRODUCT
router.patch(
  "/:productId/update",
  verify,
  verifyAdmin,
  productController.updateProductInfo
);
router.patch(
  "/:productId/archive",
  verify,
  verifyAdmin,
  productController.archiveProduct
);
router.patch(
  "/:productId/activate",
  verify,
  verifyAdmin,
  productController.activateProduct
);

router.post("/search-by-name", productController.searchProductByName);
router.post("/search-by-price", productController.searchProductByPrice);

// THIS SHOULD ALWAYS BE AT THE END OF THE CODE
module.exports = router;
