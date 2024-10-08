// DEPEDENCIES
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const auth = require("../auth");
const {errorHandler} = require("../auth");

// MIDDLEWARES
module.exports.registerUser = (req, res) => {
	if (req.body.mobileNo.length !== 11) {
		return res.status(400).send({message: "Mobile number is invalid"});
	}

	if (!req.body.email.includes("@")) {
		return res.status(400).send({message: "Invalid email format"});
	}

	if (req.body.password.length < 8) {
		return res
			.status(400)
			.send({message: "Password must be at least 8 characters long"});
	}

	let newUser = new User({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		mobileNo: req.body.mobileNo,
		password: bcrypt.hashSync(req.body.password, 10),
		isAdmin: req.body.isAdmin,
	});

	newUser
		.save()
		.then((result) => {
			return res.status(201).send({
				message: "User registered successfully",
				user: result,
			});
		})
		.catch((error) => errorHandler(error, req, res));
};

module.exports.loginUser = (req, res) => {
	if (req.body.email.includes("@")) {
		return User.findOne({email: req.body.email})
			.then((result) => {
				if (result === null) {
					return res.status(404).send({message: "No email found"});
				} else {
					const isPasswordCorrect = bcrypt.compareSync(
						req.body.password,
						result.password
					);
					if (isPasswordCorrect) {
						return res.status(200).send({
							message: "User logged in successfully",
							access: auth.createAccessToken(result),
						});
					} else {
						return res
							.status(401)
							.send({message: "Incorrect email or password"});
					}
				}
			})
			.catch((error) => errorHandler(error, req, res));
	} else {
		return res.status(400).send({message: "Invalid email format"});
	}
};

module.exports.retrieveUserDetails = (req, res) => {
	return User.findById(req.user.id)
		.then((result) => {
			if (result) {
				result.password = "";
				return res.status(200).send(result);
			} else {
				return res.status(404).send({message: "User not found"});
			}
		})
		.catch((error) => errorHandler(error, req, res));
};

module.exports.updateUserAsAdmin = (req, res) => {
	const {id} = req.params;

    const updateData = {
        isAdmin: true
    }

	return User.findByIdAndUpdate(id, updateData, {new: true})
		.then((updatedUser) => {
			if (!updatedUser) {
				return res.status(404).send({error: "User not found"});
			} else {
				return res.status(200).send({
					updatedUser
				});
			}
		})
		.catch((error) => errorHandler(error, req, res));
};

module.exports.updatePassword = (req, res) => {

    const updateData = {
        password: bcrypt.hashSync(req.body.password, 10)
    }

	return User.findByIdAndUpdate(id, updateData, {new: true})
		.then((updatedUser) => {
			if (!updatedUser) {
				return res.status(404).send({
                    error: "User not found"
                });
			} else {
				return res.status(200).send({
					message: "Password reset successfully"
				});
			}
		})
		.catch((error) => errorHandler(error, req, res));
    
};