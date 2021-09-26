import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import { OAuth2Client } from "google-auth-library";
import chalk from "chalk";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";

//@desc    Auth user with google & get token
// @route   POST  /api/auth/googlelogin
// @access  Public
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const googleController = asyncHandler(async (req, res) => {
	// get token from request
	const { idToken } = req.body;
	// verify token
	const { payload } = await client.verifyIdToken({
		idToken,
		audience: process.env.GOOGLE_CLIENT_ID,
	});
	const { email_verified, name, email, picture } = payload;

	// check if email verified
	if (email_verified) {
		const user = await User.findOne({ email });
		if (user)
			res.json({
				_id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
				picture: user.picture,
				token: generateToken(user._id),
			});
		else {
			// user doesn't previously exist
			// generate password for it ?
			let password = email + process.env.JWT_SECRET;
			try {
				const user = await User.create({
					name,
					email,
					password,
					picture,
				});

				res.status(201).json({
					_id: user._id,
					name: user.name,
					email: user.email,
					isAdmin: user.isAdmin,
					picture: user.picture,

					token: generateToken(user._id),
				});
			} catch (error) {
				res.status(400);
				console.log(error);
				throw new Error("Google login failed. Try again later");
			}
		}
	}
});

// @desc    Auth user with google & get token
// @route   POST  /api/auth/facebooklogin
// @access  Public
const facebookController = asyncHandler(async (req, res) => {
	console.log("FACEBOOK LOGIN REQ BODY", req.body);
	const { userID, accessToken } = req.body;

	const url = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;
	try {
		const response = await http.get(url);
		response = response.json();
		const { email, name, picture } = response;
		const user = await User.findOne({ email });
		if (user) {
			return res.status(201).json({
				_id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
				picture: user.picture,
				token: generateToken(user._id),
			});
		} else {
			let password = email + process.env.JWT_SECRET;
			const user = new User({ name, email, password, picture });
			return res.status(201).json({
				_id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
				picture: user.picture,
				token: generateToken(user._id),
			});
		}
	} catch (error) {
		res.status(400);
		console.log(error);
		throw new Error("Facebook login failed. Try again later");
	}
});

// @desc    Auth user & get token
// @route   POST  /api/auth/login
// @access  Public
const login = asyncHandler(async (req, res) => {
	// getting the json data sent through a form in the request body but after initializing the express.json() middleware
	const { email, password } = req.body;

	// find user with email that matches this email so the user exists
	const user = await User.findOne({ email });

	// checking the password is right
	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(401);
		throw new Error("Inavalid email or password");
	}

	res.send({ email, password });
});

// @desc    Register a new user
// @route   POST  /api/auth
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
	// getting the json data sent through a form in the request body but after initializing the express.json() middleware
	const { name, email, password } = req.body;
	console.log(name, email, password);
	// find user with email that matches this email so the user exists
	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error("Email already exists");
	}
	try {
		const user = await User.create({
			name,
			email,
			password,
		});
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} catch (error) {
		res.status(400);
		console.log(error);
		// return schema validation errors
		const message = Object.values(error.errors).map((val) => val.message);
		throw new Error(message);
	}
});

// @desc    Forgot password
// @route   POST  /api/auth/forgotpassword
// @access  Public
const forgotPassword = asyncHandler(async (req, res) => {
	// find the user by the email that was sent
	console.log(chalk.red(req.body.email));
	const user = await User.findOne({ email: req.body.email });

	if (!user) {
		res.status(404);
		throw new Error("User not Found");
	}
	// Get reset token
	const resetToken = user.getResetPasswordToken();
	await user.save({ validateBeforeSave: false });

	// Create reset url in the frontend that you take the token from to send it in request to the backend in PUT /api/auth/resetpassword/:resettoken
	const resetUrl = `${req.protocol}://${req.get(
		"host"
	)}/resetpassword/${resetToken}`;

	const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please visit: \n\n ${resetUrl}`;
	try {
		await sendEmail({
			email: user.email,
			subject: "Password reset token",
			message,
		});
		res.status(200).json({ success: true, data: "Email sent" });
	} catch (err) {
		console.log(err);
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;

		await user.save({ validateBeforeSave: false });

		res.status(500);
		throw new Error("Email could not be sent");
	}
});

// @desc      Reset password
// @route     PUT /api/users/resetpassword/:resettoken
// @access    Public
const resetPassword = asyncHandler(async (req, res, next) => {
	// Get hashed token
	const resetPasswordToken = crypto
		.createHash("sha256")
		.update(req.params.resettoken)
		.digest("hex");

	const user = await User.findOne({
		resetPasswordToken,
		resetPasswordExpire: { $gt: Date.now() },
	});

	if (!user) {
		res.status(400);
		throw new Error("Invalid token");
	}

	// Set new password
	user.password = req.body.password;
	// when you set a field to undefined it goes away
	user.resetPasswordToken = undefined;
	user.resetPasswordExpire = undefined;
	await user.save();

	res.status(200).json({ ...user });
});

export {
	googleController,
	facebookController,
	forgotPassword,
	resetPassword,
	login,
	registerUser,
};
