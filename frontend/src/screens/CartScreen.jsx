import {
	Button,
	Divider,
	FormControl,
	Grid,
	List,
	ListItem,
	ListItemText,
	MenuItem,
	Paper,
	Select,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import React from "react";
import ProductImageBox from "../components/ProductImageBox";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { addToCart, removeFromCart } from "../actions/cartActions";
const CartScreen = () => {
	const history = useHistory();
	const cart = useSelector((state) => state.cartState);
	const { cartItems } = cart;
	const dispatch = useDispatch();

	const removeFromCartHandler = (id) => {
		dispatch(removeFromCart(id));
	};
	const checkoutHandler = () => {
		history.push("/login?redirect=shipping");
	};

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
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: "100%" }} aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell align="right">Product Image</TableCell>
									<TableCell>Product Name</TableCell>
									<TableCell align="right">Price (EGP)</TableCell>
									<TableCell align="right">Quantity</TableCell>
									<TableCell align="right">Remove</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{cartItems.map((row) => (
									<TableRow
										key={row.name}
										sx={{
											"&:last-child td, &:last-child th": { border: 0 },
										}}
									>
										<TableCell
											sx={{ maxHeight: "50px", maxWidth: "50px" }}
											component="th"
											scope="row"
										>
											<ProductImageBox productImage={row.image} />
										</TableCell>
										<TableCell component="th" scope="row">
											{row.name}
										</TableCell>
										<TableCell align="right">{row.price}</TableCell>
										<TableCell align="right">
											{" "}
											<FormControl>
												<Select
													value={row.qty}
													onChange={(e) =>
														dispatch(
															addToCart(row.product, Number(e.target.value))
														)
													}
													displayEmpty
												>
													{React.Children.toArray(
														[...Array(row.countInStock).keys()].map((x) => (
															<MenuItem value={x + 1}>{x + 1}</MenuItem>
														))
													)}
												</Select>
											</FormControl>{" "}
										</TableCell>
										<TableCell align="right">
											{" "}
											<Button
												sx={{ padding: "0", margin: "0" }}
												color="error"
												onClick={() => removeFromCartHandler(row.product)}
											>
												<RemoveShoppingCartIcon />{" "}
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
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
									fullWidth
									variant="contained"
									disableElevation
									onClick={checkoutHandler}
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
