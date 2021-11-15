import chalk from "chalk";
import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import Order from "../models/orderModel.js";
import startOfToday from "date-fns/startOfToday/index.js";
import endOfToday from "date-fns/endOfToday/index.js";
import startOfWeek from "date-fns/startOfWeek/index.js";
import endOfWeek from "date-fns/endOfWeek/index.js";
import startOfMonth from "date-fns/startOfMonth/index.js";
import endOfMonth from "date-fns/endOfMonth/index.js";
import startOfYear from "date-fns/startOfYear/index.js";
import endOfYear from "date-fns/endOfYear/index.js";

// @desc    Fetch Today's statistics
// @route   GET /api/dashboard/today
// @access  Admin
const getTodayStatistics = asyncHandler(async (req, res) => {
	let firstDay = startOfToday();
	let lastDay = endOfToday();

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
	let date = new Date(); // get current date
	let firstDay = startOfWeek(date, { weekStartsOn: 6 });
	let lastDay = endOfWeek(date, { weekStartsOn: 6 });
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
	let date = new Date();
	let firstDay = startOfMonth(date);
	let lastDay = endOfMonth(date);
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
	let date = new Date();
	let firstDay = startOfYear(date);
	let lastDay = endOfYear(date);
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
