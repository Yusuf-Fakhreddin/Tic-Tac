import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import chalk from "chalk";
// @desc    Add to cart
// @route   POST /api/cart
// @access  Private
const addCartItems = asyncHandler(async (req, res) => {
	// receiving [{ proudctId, qty}] as cart items
	const { items } = req.body;
	const user = await User.findById(req.user._id).populate(
		"cart.product",
		"id name images price countInStock"
	);
	console.log(chalk.red(items));
	if (user) {
		for (let i = 0; i < items.length; i++) {
			console.log(items[i]);
			// if item already exists in cart assign its quantity to the new added value
			// if not add the item
			const idx = user.cart.findIndex(
				(x) => x.product._id == items[i].product._id
			);
			console.log(chalk.yellow(idx));

			if (idx === -1) {
				user.cart.push({ product: items[i].product, qty: items[i].qty });
			} else {
				user.cart[idx].qty = items[i].qty;
			}
		}

		const updatedUser = await user.save();

		res.json(updatedUser.cart);
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});

const removeCartItem = asyncHandler(async (req, res) => {
	// receives id in the url parameters
	const user = await User.findById(req.user._id).populate(
		"cart.product",
		"id name images price countInStock"
	);
	console.log(chalk.yellow(req.params.id));
	if (user) {
		const delIdx = user.cart.findIndex((x) => {
			console.log(x.product);
			return x.product._id == req.params.id;
		});
		console.log(delIdx);
		if (delIdx > -1) {
			user.cart.splice(delIdx, 1);
		} else {
			res.status(404);
			throw new Error("Product not found");
		}

		const updatedUser = await user.save();

		res.json(updatedUser.cart);
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});

// @desc    Get logged in user cart
// @route   GET /api/cart/mycart
// @access  Private
const getMyCart = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id).populate(
		"cart.product",
		"id name images price countInStock"
	);
	// console.log(chalk.green(user));
	if (user) {
		res.json(user.cart);
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});

export { addCartItems, removeCartItem, getMyCart };
