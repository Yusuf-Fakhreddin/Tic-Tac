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
	let firstDay = date.setHours(0, 0, 0, 0);
	let lastDay = date.setHours(23, 59, 59, 999);

	let newUsersCount = await User.countDocuments({
		createdAt: {
			$gte: firstDay,
			$lte: lastDay,
		},
	});

	let products = await Product.aggregate([
		{
			$match: {
				createdAt: {
					$gte: firstDay,
					$lte: lastDay,
				},
			},
		},
		{
			$group: {
				_id: "$category",
				productsCount: { $sum: 1 },
			},
		},
	]);

	let orders = await Order.aggregate([
		{
			$match: {
				createdAt: {
					$gte: firstDay,
					$lte: lastDay,
				},
			},
		},
		{
			$group: {
				_id: { isPaid: "$isPaid", isDelivered: "$isDelivered" },
				ordersCount: { $sum: 1 },
				totalPriceSum: { $sum: "$totalPrice" },
			},
		},
	]);
	res.json({ newUsersCount, products, orders });
});

// @desc    Fetch This Months's statistics
// @route   GET /api/dashboard/week
// @access  Admin
const getWeekStatistics = asyncHandler(async (req, res) => {
	let weekMap = [0, 1, 2, 3, 4, 5, 6];

	let curr = new Date(); // get current date
	curr.setHours(0, 0, 0, 0);
	let first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week - 1 (to start saturday)
	let last = first + 7; // last day is the first day + 6
	let firstDay = new Date(curr.setDate(first)).toUTCString();
	let lastDay = new Date(curr.setDate(last)).toUTCString();

	console.log(firstDay, lastDay);
	let newUsersCount = await User.countDocuments({
		createdAt: {
			$gte: firstDay,
			$lte: lastDay,
		},
	});

	let products = await Product.aggregate([
		{
			$match: {
				createdAt: {
					$gte: firstDay,
					$lte: lastDay,
				},
			},
		},
		{
			$group: {
				_id: "$category",
				productsCount: { $sum: 1 },
			},
		},
	]);

	let orders = await Order.aggregate([
		{
			$match: {
				createdAt: {
					$gte: firstDay,
					$lte: lastDay,
				},
			},
		},
		{
			$group: {
				_id: { isPaid: "$isPaid", isDelivered: "$isDelivered" },
				ordersCount: { $sum: 1 },
				totalPriceSum: { $sum: "$totalPrice" },
			},
		},
	]);
	res.json({ newUsersCount, products, orders });
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
	let newUsersCount = await User.countDocuments({
		createdAt: {
			$gte: firstDay,
			$lte: lastDay,
		},
	});

	let products = await Product.aggregate([
		{
			$match: {
				createdAt: {
					$gte: firstDay,
					$lte: lastDay,
				},
			},
		},
		{
			$group: {
				_id: "$category",
				productsCount: { $sum: 1 },
			},
		},
	]);

	let orders = await Order.aggregate([
		{
			$match: {
				createdAt: {
					$gte: firstDay,
					$lte: lastDay,
				},
			},
		},
		{
			$group: {
				_id: { isPaid: "$isPaid", isDelivered: "$isDelivered" },
				ordersCount: { $sum: 1 },
				totalPriceSum: { $sum: "$totalPrice" },
			},
		},
	]);
	res.json({ newUsersCount, products, orders });
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
	let newUsersCount = await User.countDocuments({
		createdAt: {
			$gte: firstDay,
			$lte: lastDay,
		},
	});

	let products = await Product.aggregate([
		{
			$match: {
				createdAt: {
					$gte: firstDay,
					$lte: lastDay,
				},
			},
		},
		{
			$group: {
				_id: "$category",
				productsCount: { $sum: 1 },
			},
		},
	]);

	let orders = await Order.aggregate([
		{
			$match: {
				createdAt: {
					$gte: firstDay,
					$lte: lastDay,
				},
			},
		},
		{
			$group: {
				_id: { isPaid: "$isPaid", isDelivered: "$isDelivered" },
				ordersCount: { $sum: 1 },
				totalPriceSum: { $sum: "$totalPrice" },
			},
		},
	]);
	res.json({ newUsersCount, products, orders });
});

export {
	getTodayStatistics,
	getMonthStatistics,
	getWeekStatistics,
	getYearStatistics,
};
