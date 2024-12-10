// DEPENDENCIES
const Order = require("../models/Order");
const Cart = require("../models/Cart");

// CREATE  A NEW ORDER
exports.createOrder = async (req, res) => {
  try {
    const userId = req.user.id; // Get user id from token (user already verified by middleware)

    // Find the user's cart
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      // No cart found for the user
      return res.status(404).json({ message: "No cart found for this user." });
    }

    // Check if the cart has items
    if (cart.cartItems.length === 0) {
      return res
        .status(400)
        .json({ message: "Cart is empty. Cannot create an order." });
    }

    // Create a new order based on the cart's data
    const newOrder = new Order({
      userId: userId,
      productsOrdered: cart.cartItems,
      totalPrice: cart.totalPrice
    });

    // Save the order
    await newOrder.save();

    // Optionally, clear the user's cart after order creation
    cart.cartItems = [];
    cart.totalPrice = 0;
    await cart.save();

    return res.status(201).json({
      message: "Order created successfully.",
      orderDetails: newOrder
    });
  } catch (error) {
    // Catch any errors and send to client
    return res.status(500).json({
      message: "An error occurred while creating the order.",
      errorDetails: error.message
    });
  }
};

// RETRIEVE THE LOGGED-IN USER'S ORDER
exports.retrieveMyOrder = async (req, res) => {
  try {
    const userId = req.user.id; // Get user id from token

    // Find the orders for this user
    const userOrders = await Order.find({ userId });

    if (userOrders.length === 0) {
      return res
        .status(404)
        .json({ message: "No orders found for this user." });
    }

    // Send found orders to client
    return res.status(200).json({
      message: "Orders retrieved successfully.",
      orders: userOrders
    });
  } catch (error) {
    // Catch any errors and send to client
    return res.status(500).json({
      message: "An error occurred while retrieving user's orders.",
      errorDetails: error.message
    });
  }
};

// RETRIEVE ALL USER'S ORDERS (ADMIN ONLY)
exports.retrieveAllOrders = async (req, res) => {
  try {
    // Find all orders
    const allOrders = await Order.find();

    // Send found orders to client
    return res.status(200).json({
      message: "All orders retrieved successfully.",
      orders: allOrders
    });
  } catch (error) {
    // Catch any errors and send to client
    return res.status(500).json({
      message: "An error occurred while retrieving all orders.",
      errorDetails: error.message
    });
  }
};
