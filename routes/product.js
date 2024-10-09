// DEPENDENCIES
const express = require("express");
const productController = require("../controllers/product");
const productController = require("../controllers/product");
const { verify, verifyAdmin } = require("../auth");
const router = express.Router();

// ROUTES FOR USER
router.post("/", verify, verifyAdmin, productController);
router.get("/all", verify, verifyAdmin, productController);
router.get("/active", productController);
router.get("/:productId", productController);
router.patch("/:productId/update", verify, verifyAdmin, productController);
router.patch("/:productId/archive", verify, verifyAdmin, productController);
router.patch("/:productId/activate", verify, verifyAdmin, productController);


module.exports = router;