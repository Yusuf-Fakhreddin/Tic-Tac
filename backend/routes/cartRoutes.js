import express from "express";
import {
	addCartItems,
	getMyCart,
	removeCartItem,
} from "../controllers/cartController.js";
const router = express.Router();

import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addCartItems);
router.route("/mycart").get(protect, getMyCart);
router.route("/:id").delete(protect, removeCartItem);
export default router;
