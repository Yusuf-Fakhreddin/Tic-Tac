import chalk from "chalk";
import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import Order from "../models/orderModel.js";
import startOfYear from "date-fns/startOfYear/index.js";
import endOfYear from "date-fns/endOfYear/index.js";
import subMonths from "date-fns/subMonths/index.js";

// @desc    Fetch last 12 months statistics
// @route   GET /api/graph_statistics
// @access  Admin
const getYearGraphStatistics = asyncHandler(async (req, res) => {
	let date = new Date();
	let firstDay = subMonths(date, 11);
	let lastDay = date;
	console.log(firstDay, lastDay);

	let users = await User.aggregate([
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
				_id: {
					// year: { $year: "$createdAt" },
					month: { $month: "$createdAt" },
					// day: { $dayOfMonth: "$createdAt" },
				},

				count: { $sum: 1 },
			},
		},
	]);

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
				_id: {
					// year: { $year: "$createdAt" },
					month: { $month: "$createdAt" },
					// day: { $dayOfMonth: "$createdAt" },
				},
				count: { $sum: 1 },
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
				_id: {
					// year: { $year: "$createdAt" },
					month: { $month: "$createdAt" },
					// day: { $dayOfMonth: "$createdAt" },
				},
				count: { $sum: 1 },
			},
		},
	]);
	res.json({ users, orders, products });
});

export { getYearGraphStatistics };
