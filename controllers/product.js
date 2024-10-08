// DEPENDENCIES
const Product = require("../models/Product");
const bcrypt = require("bcryptjs");
const auth = require("../auth");
const { errorHandler } = require("../auth");

// MIDDLEWARES
module.exports.productFunction01 = (req, res) => {

};

module.exports.productFunction02 = (req, res) => {

};

module.exports.productFunction03 = (req, res) => {

};

module.exports.productFunction04 = (req, res) => {

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