import {
	Button,
	Divider,
	Grid,
	List,
	ListItem,
	ListItemText,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import React from "react";
import CartItemsTable from "../components/CartItemsTable";

const CartScreen = () => {
	const cart = useSelector((state) => state.cartState);
	const { cartItems } = cart;

	return (
		<Box paddingTop={3}>
			<NavLink to="/">
				<Button variant="contained" startIcon={<ArrowBackIosIcon />}>
					Continue Shopping
				</Button>
			</NavLink>
			<Typography variant="h4" component="h1" mt={3}>
				Your Shopping Cart
			</Typography>
			<Grid
				container
				justifyContent="center"
				// alignItems="center"
				textAlign="center"
				rowSpacing={3}
				spacing={2}
				mt={3}
			>
				<Grid item xs={10} md={8}>
					<CartItemsTable cartItems={cartItems} />
				</Grid>
				<Grid item xs={10} md={4}>
					<Box sx={{ border: "1.5px solid #e0e0e0", borderRadius: "5px" }}>
						<List>
							<ListItem>
								<ListItemText>
									<Typography
										variant="h6"
										component="h3"
										sx={{ display: "inline" }}
									>
										Subtotal (
										{cartItems.reduce((acc, item) => acc + item.qty, 0)} items)
										{":"}
										{" " +
											cartItems
												.reduce((acc, item) => acc + item.qty * item.price, 0)
												.toFixed(2)}{" "}
										EGP
									</Typography>
								</ListItemText>
							</ListItem>
							<Divider />

							<ListItem component={NavLink} to="/login?redirect=shipping">
								<Button fullWidth variant="contained" disableElevation>
									Proceed To Checkout
								</Button>
							</ListItem>
						</List>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
};

export default CartScreen;
