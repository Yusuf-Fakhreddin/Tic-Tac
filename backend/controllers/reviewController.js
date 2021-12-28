import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import chalk from "chalk";

// @desc    Create new review
// @route   POST /api/reviews/:productId
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
	const { rating, comment } = req.body;

	const product = await Product.findById(req.params.productId);

	if (product) {
		const alreadyReviewed = product.reviews.find(
			(r) => r.user.toString() === req.user._id.toString()
		);

		if (alreadyReviewed) {
			res.status(400);
			throw new Error("Product already reviewed");
		}

		const review = {
			name: req.user.name,
			rating: Number(rating),
			comment,
			user: req.user._id,
		};

		product.reviews.push(review);

		product.numReviews = product.reviews.length;

		product.rating =
			product.reviews.reduce((acc, item) => item.rating + acc, 0) /
			product.reviews.length;

		await product.save();
		res.status(201).json({ message: "Review added" });
	} else {
		res.status(404);
		throw new Error("Product not found");
	}
});

// @desc    Update a product review
// @route   PUT /api/reviews/:productId/:reviewId
// @access  Private/Admin
const updateReview = asyncHandler(async (req, res) => {
	const { rating, comment } = req.body;

	const product = await Product.findById(req.params.productId);

	if (product) {
		let reviewIndex = -1,
			review;
		for (let i = 0; i < product.reviews.length; i++) {
			if (
				product.reviews[i]._id.toString() === req.params.reviewId.toString()
			) {
				reviewIndex = i;
				review = product.reviews[i];
			}
		}
		if (reviewIndex > -1) {
			if (req.user.isAdmin || review.user === req.user._id) {
				const newReview = {
					name: req.user.name,
					rating: Number(rating),
					comment,
					user: req.user._id,
				};

				product.reviews[reviewIndex] = newReview;
				product.rating =
					product.reviews.reduce((acc, item) => item.rating + acc, 0) /
					product.reviews.length;

				product.numReviews = product.reviews.length;

				await product.save();
				res.json({ message: "Review Updated" });
			} else {
				res.status(401);
				throw new Error("Not authorized");
			}
		} else {
			res.status(404);
			throw new Error("Review not found");
		}
	} else {
		res.status(404);
		throw new Error("Product not found");
	}
});

// @desc    Delete a product review
// @route   DELETE /api/reviews/:productId/:reviewId
// @access  Private/Admin
const deleteReview = asyncHandler(async (req, res) => {
	console.log(chalk.red(req.params.reviewId, req.params.productId));
	const product = await Product.findById(req.params.productId);

	if (product) {
		// finding the already existed review, and removing it
		let reviewIndex = -1,
			review;
		for (let i = 0; i < product.reviews.length; i++) {
			if (
				product.reviews[i]._id.toString() === req.params.reviewId.toString()
			) {
				reviewIndex = i;
				review = product.reviews[i];
			}
		}

		if (reviewIndex > -1) {
			if (req.user.isAdmin || review.user === req.user._id) {
				product.reviews.splice(reviewIndex, 1);
				if (product.reviews.length)
					product.rating =
						product.reviews.reduce((acc, item) => item.rating + acc, 0) /
						product.reviews.length;
				else {
					product.rating = 0;
				}
				product.numReviews = product.reviews.length;

				await product.save();
				res.status(201).json({ message: "Review Deleted" });
			} else {
				res.status(401);
				throw new Error("Not authorized");
			}
		} else {
			res.status(404);
			throw new Error("Review not found");
		}
	} else {
		res.status(404);
		throw new Error("Product not found");
	}
});

export { createProductReview, updateReview, deleteReview };
