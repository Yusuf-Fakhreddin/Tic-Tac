import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import chalk from "chalk";

const addDecimals = (num) => {
	return (Math.round(num * 100) / 100).toFixed(2);
};

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
	const { orderItems, shippingAddress, paymentMethod } = req.body;

	console.log(chalk.yellow(orderItems));
	if (orderItems && orderItems.length === 0) {
		res.status(400);
		throw new Error("No order items");
	} else {
		let verifiedOrderItems = [];
		let itemsPrice = 0;

		for (let i = 0; i < orderItems.length; i++) {
			let id = orderItems[0].product._id;
			const product = await Product.findById(id);
			// if product is out of stock don't include it in the order
			if (product.countInStock === 0) continue;
			// if product stock less than order qty take what's on stock
			else if (orderItems[i].qty > product.countInStock) {
				orderItems[i].qty = product.countInStock;
			}
			product.countInStock -= orderItems[i].qty;
			await product.save();
			itemsPrice += orderItems[i].qty * product.price;
			verifiedOrderItems.push({
				qty: orderItems[i].qty,
				product: {
					name: product.name,
					images: product.images,
					price: product.price,
					productId: product._id,
				},
			});
		}
		let shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 20);
		let totalPrice = (Number(itemsPrice) + Number(shippingPrice)).toFixed(2);

		const order = new Order({
			orderItems: verifiedOrderItems,
			user: req.user._id,
			shippingAddress,
			paymentMethod,
			shippingPrice,
			totalPrice,
			itemsPrice,
		});
		const createdOrder = await order.save();

		// empty user cart
		const user = await User.findById(req.user._id);
		user.cart = [];
		await user.save();

		res.status(201).json(createdOrder);
	}
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id).populate(
		"user",
		"name email"
	);

	if (order) {
		res.json(order);
	} else {
		res.status(404);
		throw new Error("Order not found");
	}
});

// @desc    Update order to shipped
// @route   GET /api/orders/:id/ship
// @access  Private/Admin
const updateOrderToShipped = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);

	if (order) {
		order.isShipped = true;
		order.shippedAt = Date.now();

		const updatedOrder = await order.save();

		res.json(updatedOrder);
	} else {
		res.status(404);
		throw new Error("Order not found");
	}
});

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);

	if (order) {
		order.isPaid = true;
		order.paidAt = Date.now();
		// order.paymentResult = {
		// 	id: req.body.id,
		// 	status: req.body.status,
		// 	update_time: req.body.update_time,
		// 	email_address: req.body.payer.email_address,
		// };

		const updatedOrder = await order.save();

		res.json(updatedOrder);
	} else {
		res.status(404);
		throw new Error("Order not found");
	}
});

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);

	if (order) {
		order.isDelivered = true;
		order.deliveredAt = Date.now();

		const updatedOrder = await order.save();

		res.json(updatedOrder);
	} else {
		res.status(404);
		throw new Error("Order not found");
	}
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({ user: req.user._id });
	res.json(orders);
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
	const pageSize = 10;
	const page = Number(req.query.pageNumber) || 1;

	const count = await Order.countDocuments();
	const orders = await Order.find({})
		.populate("user", "id name")
		.limit(pageSize)
		.skip(pageSize * (page - 1));

	res.json({ orders, count, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Delete an order
// @route   DELETE  /api/orders/:id/
// @access  Private/admin
const deleteOrder = asyncHandler(async (req, res) => {
	console.log(chalk.red(req.params.id));
	const order = await Order.findById(req.params.id);
	// delete order if user is admin || user owns the order and the order has not been shipped yet
	if (order) {
		if (
			!req.user.isAdmin &&
			order.user.toString() !== req.user._id.toString()
		) {
			res.status(401);
			console.log(chalk.yellow(order.user !== req.user._id));

			throw new Error("Not authorized");
		} else if (req.user.isAdmin) {
			await order.remove();
			res.json({ message: "Order removed" });
		} else if (order.user.toString() === req.user._id.toString()) {
			if (!order.isShipped) {
				await order.remove();
				res.json({ message: "Order removed" });
			} else {
				res.status(401);
				throw new Error("Order has been already shipped");
			}
		}
	} else {
		res.status(404);
		throw new Error("Order not found");
	}
});

export {
	addOrderItems,
	getOrderById,
	updateOrderToPaid,
	updateOrderToDelivered,
	updateOrderToShipped,
	getMyOrders,
	getOrders,
	deleteOrder,
};
