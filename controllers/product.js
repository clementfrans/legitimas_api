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




module.exports.productFunction03 = (req, res) => {};

module.exports.productFunction04 = (req, res) => {};

module.exports.productFunction05 = (req, res) => {};

module.exports.productFunction06 = (req, res) => {};

module.exports.productFunction07 = (req, res) => {};
