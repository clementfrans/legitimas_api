// DEPENDENCIES
const Product = require("../models/Product");
const { errorHandler } = require("../auth");

// MIDDLEWARES
// CREATE A PRODUCT (/)
module.exports.createProduct = (req, res) => {
  let newProduct = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  });

  newProduct
    .save()
    .then((result) => {
      return res.status(201).send(result);
    })
    .catch((error) => errorHandler(error, req, res));
};

// RETRIEVE ALL PRODUCTS (/ALL)
module.exports.getAllProducts = (req, res) => {
  return Product.find({})
    .then((result) => {
      if (result.length > 0) {
        return res.status(200).send(result);
      } else {
        return res.status(404).send({ message: "No Products Found" });
      }
    })
    .catch((error) => errorHandler(error, req, res));
};

//RETRIEVE ALL ACTIVE PRODUCTS (/ACTIVE)
module.exports.getAllActiveProducts = (req, res) => {
  Product.find({ isActive: true })
    .then((result) => {
      if (result.length > 0) {
        return res.status(200).send(result);
      } else {
        return res.status(404).send(false);
      }
    })
    .catch((error) => errorHandler(error, req, res));
};

//RETRIEVE A SINGLE PRODUCT (/:PRODUCT-ID)
module.exports.getProduct = (req, res) => {
  Product.findById(req.params.productId)
    .then((product) => {
      if (product) {
        return res.status(200).send(product);
      } else {
        return res.status(404).send(false);
      }
    })
    .catch((error) => errorHandler(error, req, res));
};

// temporary comment - franz contribution
module.exports.updateProductInfo = (req, res) => {
  const { productId } = req.params;

  const updateData = req.body;

  return Product.findByIdAndUpdate(productId, updateData, { new: true })
    .then((updatedProduct) => {
      if (!updatedProduct) {
        return res.status(404).send({
          error: "Product not found",
        });
      } else {
        return res.status(200).send({
          success: true,
          message: "Product updated successfully",
        });
      }
    })
    .catch((err) => errHandler(err, req, res));
};

module.exports.archiveProduct = (req, res) => {
  const { productId } = req.params;

  const updateData = {
    isActive: false,
  };

  Product.findById(productId)
    .then((foundProduct) => {
      if (foundProduct === null) {
        return res.status(404).send({
          error: "Product not found",
        });
      } else if (!foundProduct.isActive) {
        return res.status(200).send({
          message: "Product already archived",
          archivedProduct: foundProduct,
        });
      } else {
        return Product.findByIdAndUpdate(productId, updateData, {
          new: true,
        }).then(
          res.status(200).send({
            success: true,
            message: "Product archived successfully",
          })
        );
      }
    })
    .catch((error) => errorHandler(error, req, res));
};

module.exports.activateProduct = (req, res) => {
  const { productId } = req.params;

  const updateData = {
    isActive: true,
  };

  Product.findById(productId)
    .then((foundProduct) => {
      if (foundProduct === null) {
        return res.status(404).send({
          error: "Product not found",
        });
      } else if (foundProduct.isActive) {
        return res.status(200).send({
          message: "Product already active",
          activateProduct: foundProduct,
        });
      } else {
        return Product.findByIdAndUpdate(productId, updateData, {
          new: true,
        }).then(
          res.status(200).send({
            success: true,
            message: "Product activated successfully",
          })
        );
      }
    })
    .catch((error) => errorHandler(error, req, res));
};

// [SECTION] SEARCH PRODUCT BY NAME
exports.searchProductByName = async (req, res) => {
  try {
    const { name } = req.body;

    // Use a case-insensitive regular expression to find products with matching names
    const products = await Product.find({
      name: { $regex: new RegExp(name, "i") },
    });

    if (products.length > 0) {
      res.status(200).json({ message: "Products found", products });
    } else {
      res.status(404).json({ message: "No products found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error searching products by name", error });
  }
};

// [SECTION] SEARCH PRODUCT BY PRICE RANGE
exports.searchProductByPrice = async (req, res) => {
  try {
    const { minPrice, maxPrice } = req.body;

    // Query to find products within the price range
    const products = await Product.find({
      price: { $gte: minPrice, $lte: maxPrice },
    });

    if (products.length > 0) {
      res.status(200).json({ message: "Products found", products });
    } else {
      res
        .status(404)
        .json({ message: "No products found within this price range" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error searching products by price range", error });
  }
};
