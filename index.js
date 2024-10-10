// DEPENDENCIES
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// ROUTES
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/order");

// APP
const app = express();
require("dotenv").config();

// SETUP SERVER
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS CONFIGURATION
const corsOptions = {
  origin: ["http://localhost:8000"],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// ROUTES CONFIGURATION
app.use(express.json());
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);

mongoose.connect(process.env.MONGODB_STRING);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => console.log("Now connected to MongoDB Atlas"));

// SERVER START
if (require.main === module) {
  app.listen(process.env.PORT, () =>
    console.log(`Server running at port ${process.env.PORT}`)
  );
}

module.exports = { app, mongoose };
