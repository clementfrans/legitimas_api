// [SECTION] DEPENDENCIES
const mongoose = require("mongoose");

// [SECTION] CART SCHEMA
const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    cartItems: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: [true, 'Product ID is required']
            },
            quantity: {
                type: Number,
                required: [true, 'Quantity is Required']
            },
            subtotal: {
                type: Number,
                required: [true, 'Subtotal is required']
            }
        }
    ],
    totalPrice: {
        type: Number,
        required: [true, 'Total Price is required']
    },
    orderedOn: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Cart', cartSchema)