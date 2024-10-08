// DEPENDENCIES
const Product = require("../models/Product");
const bcrypt = require("bcryptjs");
const auth = require("../auth");
const { errorHandler } = require("../auth");

// MIDDLEWARES
// CREATE A PRODUCT (/)
module.exports.createProduct = (req, res) => {
  let newProduct = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  });
};

// RETRIEVE ALL PRODUCTS (/ALL)
module.exports.getAllProducts = (req, res) => {
  return Course.find({})
    .then((result) => {
      if (result.length > 0) {
        return res.status(200).send({ result });
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
                    error: "Product not found"
                });
            } else {
                return res.status(200).send({
                    success: true,
                    message: "Product updated successfully"
                });
            }
        })
        .catch((err) => errHandler(err, req, res));
};

module.exports.archiveProduct = (req, res) => {
    const { productId } = req.params;

    const updateData = {
        isActive: false
    };

    const isArchived = Product.find({ id: productId, isActive: false })

    // in case of error, change to isArchived.length
    if (isArchived) {
        return res.status(200).send({
            message: "Product already archived",
            archivedProduct: isArchived
        });
    }
    else {
        return Product.findByIdAndUpdate(productId, updateData, { new: true })
            .then((updatedProduct) => {
                if (!updatedProduct) {
                    return res.status(404).send({
                        error: "Product not found"
                    });
                } else {
                    return res.status(200).send({
                        success: true,
                        message: "Product updated successfully"
                    });
                }
            })
            .catch((err) => errHandler(err, req, res));
    }
};

module.exports.activateProduct = (req, res) => {
    const { productId } = req.params;

    const updateData = {
        isActive: true
    };

    const isActive = Product.find({ id: productId, isActive: true })

    // in case of error, change to isActive.length
    if (isActive) {
        return res.status(200).send({
            message: "Product already archived",
            archivedProduct: isActive
        });
    }
    else {
        return Product.findByIdAndUpdate(productId, updateData, { new: true })
            .then((updatedProduct) => {
                if (!updatedProduct) {
                    return res.status(404).send({
                        error: "Product not found"
                    });
                } else {
                    return res.status(200).send({
                        success: true,
                        message: "Product updated successfully"
                    });
                }
            })
            .catch((err) => errHandler(err, req, res));
    }
};
