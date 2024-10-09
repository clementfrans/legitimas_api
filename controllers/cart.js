// LEGENDS:
// "!!" - means important comment
// [SECTION] CONTROLLER FOR CART
const Cart = require("../models/Cart");

// [SECTION] MIDDLEWARE TO GET USERID FROM JWT
//(mock function, implement your JWT validation logic) 😲🤔
const getUserIdFromToken = (req) => {
  // Assuming the userId is stored in req.user after successful JWT validation
  return req.user.id;
};

// RETRIEVE CART ✅
exports.getCart = async (req, res) => {
  try {
    // !! Get userId through JWT Verification
    const userId = getUserIdFromToken(req);

    // !! User userId to find match cart in the database
    const cart = await Cart.findOne({ userId });

    // !! If no match, send 404
    if (!cart) {
      return res.status(404).send({ message: "Cart not found" });
    }

    // !! If match found, send cart details
    res.status(200).send({ cart });
  } catch (error) {
    // !! error on retrieval
    res.status(500).send({ message: "Error retrieving cart", error });
  }
};

// [SECTION] ADD TO CART ✅
exports.addToCart = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);

    const { productId, quantity, subtotal } = req.body;

    let cart = await Cart.findOne({ userId });

    // IF NO CART, CREATE A NEW ONE
    if (!cart) {
      cart = new Cart({ userId, cartItems: [], totalPrice: 0 });
    }

    // CHECK IF THE PRODUCT ALREADY EXISTS IN THE CART
    const cartItemIndex = cart.cartItems.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (cartItemIndex > -1) {
      // IF PRODUCT EXISTS, UPDATE QUANTITY AND SUBTOTAL
      cart.cartItems[cartItemIndex].quantity += quantity;
      cart.cartItems[cartItemIndex].subtotal += subtotal;
    } else {
      // ELSE, ADD A NEW ITEM IN CART
      cart.cartItems.push({ productId, quantity, subtotal });
    }

    // UPDATE THE TOTAL PRICE OF THE CART
    cart.totalPrice = cart.cartItems.reduce(
      (acc, item) => acc + item.subtotal,
      0
    );

    // SAVE THE CART AND WAIT FOR RESPONSE
    await cart.save();
    res.status(200).send({
      message: "Item added to cart successfully",
      cart,
    });
  } catch (error) {
    res.status(500).send({ message: "Error adding to cart", error });
  }
};

// UPDATE PRODUCT QUANTITY
exports.updateProductQuantity = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const { productId, newQuantity } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the product in the cart
    const cartItemIndex = cart.cartItems.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (cartItemIndex > -1) {
      // If product exists, update quantity and subtotal (smart 😆)
      const productPrice =
        cart.cartItems[cartItemIndex].subtotal /
        cart.cartItems[cartItemIndex].quantity;

      cart.cartItems[cartItemIndex].quantity = newQuantity;
      cart.cartItems[cartItemIndex].subtotal = productPrice * newQuantity;
    } else {
      return res.status(404).send({ message: "Item not found in cart" });
    }

    // Update total price of the cart
    cart.totalPrice = cart.cartItems.reduce(
      (acc, item) => acc + item.subtotal,
      0
    );

    await cart.save();
    res.status(200).send({
      message: "Item quantity updated successfully",
      updatedCart: cart,
    });
  } catch (error) {
    res.status(500).send({ message: "Error updating cart", error });
  }
};

// [SECTION] REMOVE ITEM FROM CART
exports.removeItemFromCart = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const productId = req.params.productId;

    // Find the user's cart
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Check if the cart contains the product
    const productIndex = cart.cartItems.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (productIndex > -1) {
      // Remove the product from the cartItems array
      cart.cartItems.splice(productIndex, 1);

      // Update the totalPrice of the cart
      cart.totalPrice = cart.cartItems.reduce(
        (acc, item) => acc + item.subtotal,
        0
      );

      // Save the updated cart
      await cart.save();
      res.status(200).json({ message: "Product removed from cart", cart });
    } else {
      res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error removing product from cart", error });
  }
};

// [SECTION] CLEAR CART
exports.clearCart = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req); // Extract user ID from JWT token

    // Find the user's cart
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    if (cart.cartItems.length > 0) {
      // Clear the cartItems array
      cart.cartItems = [];

      // Reset total price
      cart.totalPrice = 0;

      // Save the updated cart
      await cart.save();
      res.status(200).json({ message: "Cart cleared", cart });
    } else {
      res.status(400).json({ message: "Cart is already empty" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error clearing cart", error });
  }
};
