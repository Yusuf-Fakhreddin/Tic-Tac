import { Alert, AlertTitle } from "@mui/material";
import React, { useEffect } from "react";
import Stack from "@mui/material/Stack";

//  USE WHEN LS and backend carts are properly in sync
const CartScreenDifferences = ({ cartItems, userInfo, backendCart }) => {
	console.log(backendCart);
	let alerts = [];
	if (backendCart) {
		for (let i = 0; i < backendCart.length; i++) {
			if (backendCart[i].product.countInStock === 0) {
				alerts.push({
					label: "Item Removed",
					name: backendCart[i].product.name,
					condition: "Removed from your cart as it went out of stock",
				});
			} else {
				const idx = cartItems.findIndex(
					(x) => x.product._id === backendCart[i].product._id
				);
				if (idx) {
					if (cartItems[idx].product.price !== backendCart[i].product.price) {
						alerts.push({
							label: "Price Changed",
							name: backendCart[i].product.name,
							condition: `Price changed as it went from ${cartItems[idx].product.price} to ${backendCart[i].product.price}`,
						});
					}
				}
			}
		}
	}
	useEffect(() => {
		// save backendCart to local storage cartItems after displaying the differences
		// Differences if it went out of stock or price changed
		// effect
	}, []);

	return (
		<Stack sx={{ width: "100%" }} spacing={2}>
			{React.Children.toArray(
				alerts.map((alert) => (
					<Alert severity="info">
						<AlertTitle>{alert.label}</AlertTitle>
						{alert.name} {alert.condition}
					</Alert>
				))
			)}
		</Stack>
	);
};

export default CartScreenDifferences;
