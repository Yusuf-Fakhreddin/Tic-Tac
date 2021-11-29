import {
	Alert,
	Button,
	Divider,
	Grid,
	List,
	ListItem,
	ListItemText,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import React, { useEffect, useState } from "react";
import CartItemsTable from "../components/CartItemsTable";
import { removeFromCart } from "../actions/cartActions";
import { useListProductDetailsById } from "../Queries/ProductsQueries";
const CartScreen = () => {
	const cart = useSelector((state) => state.cartState);
	const { cartItems } = cart;
	console.log(cartItems);
	const [currentID, setcurrentID] = useState();
	const [product, isLoading, isSuccess, refetch] =
		useListProductDetailsById(currentID);
	const dispatch = useDispatch();

	const [removedItems, setremovedItems] = useState([]);

	useEffect(() => {
		const check = async () => {
			console.log("executing");
			for (let i = 0; i < cartItems.length; i++) {
				setcurrentID(cartItems[i].product);
				await refetch();
				while (isLoading) {
					return;
				}
				if (product && product.countInStock === 0) {
					dispatch(removeFromCart(cartItems[i].product));
					setremovedItems([...removedItems, cartItems[i].name]);
				}
			}
		};
		check();
	}, []);

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
			{removedItems.length > 0 && (
				<Alert severity="warning">
					One or more products were removed from your cart as they went out of
					stock
				</Alert>
			)}
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

							<ListItem>
								<Button
									component={NavLink}
									to="/login?redirect=shipping"
									disabled={cartItems === 0}
									fullWidth
									variant="contained"
									disableElevation
								>
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
