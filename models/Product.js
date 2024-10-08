// [SECTION] DEPENDENCIES
const mongoose = require("mongoose");

// [SECTION] PRODUCT MODEL -a
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product Name is required."],
  },
  description: {
    type: String,
    required: [true, "Product Description is required."],
  },
  price: {
    type: Number,
    required: [true, "Product Price is required."],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});
