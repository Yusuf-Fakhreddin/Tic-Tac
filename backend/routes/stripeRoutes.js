import Stripe from "stripe";
import express from "express";
import dotenv from "dotenv";
import { protect } from "../middleware/authMiddleware.js";

dotenv.config();
const stripe = new Stripe(process.env.SECRET_KEY);

const router = express.Router();

export default router.post("/", async (req, res) => {
	try {
		const { amount } = req.body;
		// Psst. For production-ready applications we recommend not using the
		// amount directly from the client without verifying it first. This is to
		// prevent bad actors from changing the total amount on the client before
		// it gets sent to the server. A good approach is to send the quantity of
		// a uniquely identifiable product and calculate the total price server-side.
		// Then, you would only fulfill orders using the quantity you charged for.

		const paymentIntent = await stripe.paymentIntents.create({
			amount,
			currency: "egp",
		});
		res.status(200).send(paymentIntent.client_secret);
	} catch (err) {
		res.status(500).json({ statusCode: 500, message: err.message });
	}
});
