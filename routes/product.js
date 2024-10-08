// DEPENDENCIES
const express = require("express");
const userController = require("../controllers/product");
const { verify, verifyAdmin } = require("../auth");
const router = express.Router();

// ROUTES FOR USER
router.post("/", verify, verifyAdmin, productController.createProduct);
router.get("/all", verify, verifyAdmin, productController.getAllProducts);
router.get("/active", productController.getAllActiveProducts);
router.get("/:productId", productController.getProduct);
router.patch("/:productId/update", verify, verifyAdmin, productController);
router.patch("/:productId/archive", verify, verifyAdmin, productController);
router.patch("/:productId/activate", verify, verifyAdmin, productController);
