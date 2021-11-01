import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import chalk from "chalk";
import User from "../models/userModel.js";
import Order from "../models/orderModel.js";

// @desc    Fetch Today's statistics
// @route   GET /api/dashboard/today
// @access  Admin
const getTodayStatistics = asyncHandler(async (req, res) => {
	// let date = new Date().toLocaleDateString("en-GB");
	let date = new Date();
	let startDate = date.setHours(0, 0, 0, 0);
	date = date.setHours(23, 59, 59, 999);
	console.log(date, startDate);
	let usersCount = await User.countDocuments({
		createdAt: {
			$gte: startDate,
			$lte: date,
		},
	});

	let productsCount = await Product.countDocuments({
		createdAt: {
			$gte: startDate,
			$lte: date,
		},
	});
	let ordersCount = await Order.countDocuments({
		createdAt: {
			$gte: startDate,
			$lte: date,
		},
	});
	let orders = await Order.find({
		createdAt: {
			$gte: firstDay,
			$lte: lastDay,
		},
	});
	let ordersTotalPrice = 0;
	for (let i = 0; i < orders.length; i++) {
		ordersTotalPrice += orders[i].totalPrice;
	}
	res.json({ usersCount, productsCount, ordersCount, ordersTotalPrice });
});

// @desc    Fetch This Months's statistics
// @route   GET /api/dashboard/week
// @access  Admin
const getWeekStatistics = asyncHandler(async (req, res) => {
	let curr = new Date(); // get current date
	let first = curr.getDate() - curr.getDay() - 1; // First day is the day of the month - the day of the week - 1 (to start saturday)
	let last = first + 6; // last day is the first day + 6

	let firstDay = new Date(curr.setDate(first)).toUTCString();
	let lastDay = new Date(curr.setDate(last)).toUTCString();

	console.log(firstDay, lastDay);
	let usersCount = await User.countDocuments({
		createdAt: {
			$gte: firstDay,
			$lte: lastDay,
		},
	});

	let productsCount = await Product.countDocuments({
		createdAt: {
			$gte: firstDay,
			$lte: lastDay,
		},
	});
	let ordersCount = await Order.countDocuments({
		createdAt: {
			$gte: firstDay,
			$lte: lastDay,
		},
	});
	let orders = await Order.find({
		createdAt: {
			$gte: firstDay,
			$lte: lastDay,
		},
	});
	let ordersTotalPrice = 0;
	for (let i = 0; i < orders.length; i++) {
		ordersTotalPrice += orders[i].totalPrice;
	}
	res.json({ usersCount, productsCount, ordersCount, ordersTotalPrice });
});

// @desc    Fetch This Months's statistics
// @route   GET /api/dashboard/month
// @access  Admin
const getMonthStatistics = asyncHandler(async (req, res) => {
	let date = new Date(),
		y = date.getFullYear(),
		m = date.getMonth();
	let firstDay = new Date(y, m, 1);
	let lastDay = new Date(y, m + 1, 0);

	console.log(firstDay, lastDay);
	let usersCount = await User.countDocuments({
		createdAt: {
			$gte: firstDay,
			$lte: lastDay,
		},
	});

	let productsCount = await Product.countDocuments({
		createdAt: {
			$gte: firstDay,
			$lte: lastDay,
		},
	});
	let ordersCount = await Order.countDocuments({
		createdAt: {
			$gte: firstDay,
			$lte: lastDay,
		},
	});
	let orders = await Order.find({
		createdAt: {
			$gte: firstDay,
			$lte: lastDay,
		},
	});
	let ordersTotalPrice = 0;
	for (let i = 0; i < orders.length; i++) {
		ordersTotalPrice += orders[i].totalPrice;
	}
	res.json({ usersCount, productsCount, ordersCount, ordersTotalPrice });
});

// @desc    Fetch This Year's statistics
// @route   GET /api/dashboard/month
// @access  Admin
const getYearStatistics = asyncHandler(async (req, res) => {
	let date = new Date(),
		y = date.getFullYear();
	let firstDay = new Date(y, 0, 1);
	let lastDay = new Date(y, 11, 31);

	console.log(firstDay, lastDay);
	let usersCount = await User.countDocuments({
		createdAt: {
			$gte: firstDay,
			$lte: lastDay,
		},
	});

	let productsCount = await Product.countDocuments({
		createdAt: {
			$gte: firstDay,
			$lte: lastDay,
		},
	});
	let ordersCount = await Order.countDocuments({
		createdAt: {
			$gte: firstDay,
			$lte: lastDay,
		},
	});
	let orders = await Order.find({
		createdAt: {
			$gte: firstDay,
			$lte: lastDay,
		},
	});
	let ordersTotalPrice = 0;
	for (let i = 0; i < orders.length; i++) {
		ordersTotalPrice += orders[i].totalPrice;
	}
	res.json({ usersCount, productsCount, ordersCount, ordersTotalPrice });
});

export {
	getTodayStatistics,
	getMonthStatistics,
	getWeekStatistics,
	getYearStatistics,
};
