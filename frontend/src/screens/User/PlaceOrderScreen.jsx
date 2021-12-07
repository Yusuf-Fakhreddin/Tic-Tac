import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getCartFromBackend } from "../../actions/cartActions";
import CartItemsTable from "../../components/Order/CartItemsTable";
import CheckoutSteps from "../../components/Order/CheckoutSteps";
import PlaceOrderSummary from "../../components/Order/PlaceOrderSummary";

const PlaceOrderScreen = () => {
	const history = useHistory();

	const cart = useSelector((state) => state.cartState);
	const { shippingAddress, paymentMethod, cartItems } = cart;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	const dispatch = useDispatch();

	useEffect(() => {
		document.title = "Place Order";
		if (!userInfo) history.push("/login?redirect=placeorder");
		else dispatch(getCartFromBackend());

		if (!shippingAddress) {
			history.push("/shipping");
		} else if (!paymentMethod) {
			history.push("/paymentmethod");
		}
	}, [userInfo, history, shippingAddress, paymentMethod]);
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
						<PlaceOrderSummary cart={cart} token={userInfo.token} />
					</Grid>
				</Grid>
			</Box>{" "}
		</Box>
	);
};

export default PlaceOrderScreen;
