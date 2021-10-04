import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import CartItemsTable from "../components/CartItemsTable";
import CheckoutSteps from "../components/CheckoutSteps";
import OrderSummary from "../components/OrderSummary";

const PlaceOrderScreen = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const cart = useSelector((state) => state.cartState);
	const { shippingAddress, paymentMethod, cartItems } = cart;

	if (!shippingAddress) {
		history.push("/shipping");
	} else if (!paymentMethod) {
		history.push("/paymentmethod");
	}
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		document.title = "Place Order";
		if (!userInfo) history.push("/login?redirect=placeorder");
	}, [userInfo, history]);
	return (
		<Box
			mt={3}
			sx={{
				// border: "1.5px solid #e0e0e0",
				borderRadius: "5px",
				padding: "15px",
				width: "100%",
				margin: "25px auto",
			}}
		>
			{" "}
			<Box marginY={3}>
				<CheckoutSteps Order />
				<Grid
					container
					justifyContent="center"
					textAlign="left"
					rowSpacing={3}
					spacing={2}
				>
					<Grid item xs={10} md={9}>
						<Typography variant="h6" component="h1" marginY={2}>
							Shipping
						</Typography>
						<Typography variant="subtitle1">
							Mobile Number: {cart.shippingAddress.mobileNumber}
						</Typography>
						<Typography variant="subtitle1">
							Address: {cart.shippingAddress.address},{" "}
							{cart.shippingAddress.city}, {cart.shippingAddress.country}
						</Typography>
						<Typography variant="h6" component="h1" marginY={2}>
							Payment Method
						</Typography>
						<Typography variant="subtitle1">{cart.paymentMethod}</Typography>
						<Typography variant="h6" component="h1" marginY={2}>
							Order Items
						</Typography>
						<CartItemsTable cartItems={cartItems} />
					</Grid>{" "}
					<Grid item xs={10} md={3}>
						<OrderSummary cart={cart} token={userInfo.token} />
					</Grid>
				</Grid>
			</Box>{" "}
		</Box>
	);
};

export default PlaceOrderScreen;
