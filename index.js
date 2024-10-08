// DEPENDENCIES
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");

// ROUTES
const userRoutes = require("./routes/user");

// APP 
const app = express();
require("dotenv").config();

// SETUP SERVER
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// CORS CONFIGURATION
const corsOptions = {
	origin: ["http://localhost:8000"],
	credentials: true,
	optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// SESSION CONFIGURATION
app.use(
	session({
		secret: process.env.CLIENT_SECRET,
		resave: false,
		saveUninitialized: false,
	})
);

// ROUTES CONFIGURATON
app.use("/users", userRoutes);

// SERVER START
if (require.main === module) {
	app.listen(process.env.PORT, () =>
		console.log(`Server running at port ${process.env.PORT}`)
	);
}

module.exports = {app, mongoose};
