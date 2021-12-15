import express from "express";
import {
	createProductReview,
	deleteReview,
	updateReview,
} from "../controllers/reviewController.js";
const router = express.Router();

import { protect } from "../middleware/authMiddleware.js";

router.route("/:productId").post(protect, createProductReview);
router
	.route("/:productId/:reviewId")
	.put(protect, updateReview)
	.delete(protect, deleteReview);

export default router;
