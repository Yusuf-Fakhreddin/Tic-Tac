import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import http from "../../httpService";

const StripeCard = ({ price, user, shippingAddress, onSuccessfulCheckout }) => {
	const [isProcessing, setProcessingTo] = useState(false);
	const [checkoutError, setCheckoutError] = useState();

	const stripe = useStripe();
	const elements = useElements();

	const cardStyle = {
		style: {
			base: {
				color: "#32325d",
				fontFamily: "Arial, sans-serif",
				fontSmoothing: "antialiased",
				fontSize: "16px",
				"::placeholder": {
					color: "#32325d",
				},
			},
			invalid: {
				color: "#fa755a",
				iconColor: "#fa755a",
			},
		},
		hidePostalCode: true,
	};
	const handleFormSubmit = async (ev) => {
		ev.preventDefault();

		const billingDetails = {
			name: user.name,
			email: user.email,
			address: shippingAddress,
		};

		setProcessingTo(true);

		const cardElement = elements.getElement("card");

		try {
			const { data: clientSecret } = await http.post("/api/payment_intents", {
				amount: Math.ceil(price * 100),
			});
			const paymentMethodReq = await stripe.createPaymentMethod({
				type: "card",
				card: cardElement,
			});

			if (paymentMethodReq.error) {
				setCheckoutError(paymentMethodReq.error.message);
				setProcessingTo(false);
				return;
			}

			const { error, paymentIntent } = await stripe.confirmCardPayment(
				clientSecret,
				{
					payment_method: paymentMethodReq.paymentMethod.id,
				}
			);
			console.log(paymentIntent);
			console.log(paymentIntent.id);
			if (error) {
				setCheckoutError(error.message);
				setProcessingTo(false);
				return;
			}
			console.log(checkoutError);

			onSuccessfulCheckout();
		} catch (err) {
			setCheckoutError(err.message);
		}
	};

	return (
		<form onSubmit={handleFormSubmit}>
			<Grid container spacing={2}>
				<Grid item xs={10} md={9}>
					<Box
						sx={{
							border: "1px solid grey",
							borderRadius: "5px",
							padding: "10px",
						}}
					>
						<CardElement options={cardStyle} />
					</Box>
					{checkoutError && (
						<Typography variant="body2" color="error">
							{checkoutError}
						</Typography>
					)}
				</Grid>
				<Grid item xs={10} md={3}>
					<Button
						// disabled={isProcessing || !stripe}
						variant="contained"
						type="submit"
					>
						{isProcessing ? "Processing..." : `Pay ${price} EGP`}
					</Button>
				</Grid>
			</Grid>
		</form>
	);
};

export default StripeCard;
