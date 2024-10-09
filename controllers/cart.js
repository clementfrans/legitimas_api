// [SECTION] CONTROLLER FOR CART
const Cart = require("../models/Cart");

// [SECTION] MIDDLEWARE TO GET USERID FROM JWT
//(mock function, implement your JWT validation logic)
const getUserIdFromToken = (req) => {
  // Assuming the userId is stored in req.user after successful JWT validation
  return req.user.id;
};

// [SECTION] ADD TO CART
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
    res.status(200).json({ message: "Product added to cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart", error });
  }
};


// UPDATE PRODUCT QUANTITY
exports.updateProductQuantity = async (req, res) => {
    try {
      const userId = getUserIdFromToken(req);
      const { productId, newQuantity } = req.body;
  
      let cart = await Cart.findOne({ userId });
  
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      // Find the product in the cart
      const cartItemIndex = cart.cartItems.findIndex(item => item.productId.toString() === productId);
  
      if (cartItemIndex > -1) {
        // If product exists, update quantity and subtotal
        const productPrice = cart.cartItems[cartItemIndex].subtotal / cart.cartItems[cartItemIndex].quantity;
        cart.cartItems[cartItemIndex].quantity = newQuantity;
        cart.cartItems[cartItemIndex].subtotal = productPrice * newQuantity;
      } else {
        return res.status(404).json({ message: 'Product not found in cart' });
      }
  
      // Update total price of the cart
      cart.totalPrice = cart.cartItems.reduce((acc, item) => acc + item.subtotal, 0);
      
      await cart.save();
      res.status(200).json({ message: 'Cart updated', cart });
      
    } catch (error) {
      res.status(500).json({ message: 'Error updating cart', error });
    }
  };
  

// // UPDATE PRODUCT QUANTITY
// exports.updateProductQuantity = async (req, res) => {
//   try {
//     const userId = getUserIdFromToken(req);
//     const { productId, quantity, subtotal } = req.body;

//     let cart = await Cart.findOne({ userId });

//     if (!cart) {
//       return res.status(404).json({ message: "Cart not found" });
//     }

//     // FIND PRODUCT IN THE CART
//     const cartItemIndex = cart.cartItems.findIndex(
//       (item) => item.productId.toString() === productId
//     );

//     if (cartItemIndex > -1) {
//       // IF PRODUCT EXISTS, UPDATE QUANTITY AND SUBTOTAL
//       cart.cartItems[cartItemIndex].quantity = quantity;
//       cart.cartItems[cartItemIndex].subtotal = subtotal;
//     } else {
//       // ADD NEW PRODUCT IF FOUND
//       cart.cartItems.push({ productId, quantity, subtotal });
//     }

//     // UPDATE TOTAL PRICE OF THE CART
//     cart.totalPrice = cart.cartItems.reduce(
//       (acc, item) => acc + item.subtotal,
//       0
//     );

//     await cart.save();
//     res.status(200).json({ message: "Cart updated", cart });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating cart", error });
//   }
// };

// RETRIEVE CART
exports.getCart = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ cart });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving cart", error });
  }
};
