import {
	Button,
	FormControl,
	MenuItem,
	Paper,
	Select,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import React from "react";
import ProductImageBox from "./ProductImageBox";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { NavLink } from "react-router-dom";
const CartItemsTable = ({ cartItems, order }) => {
	const dispatch = useDispatch();

	const removeFromCartHandler = (id) => {
		dispatch(removeFromCart(id));
	};

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: "100%" }} aria-label="simple table">
				<TableHead>
					<TableRow sx={{ backgroundColor: "primary.dark" }}>
						<TableCell sx={{ color: "white" }} align="center">
							Product Image
						</TableCell>
						<TableCell sx={{ color: "white" }} align="center">
							Product Name
						</TableCell>
						<TableCell sx={{ color: "white" }} align="center">
							Price (EGP)
						</TableCell>
						<TableCell sx={{ color: "white" }} align="center">
							Quantity
						</TableCell>
						{!order && (
							<TableCell sx={{ color: "white" }} align="center">
								Remove
							</TableCell>
						)}
					</TableRow>
				</TableHead>
				<TableBody>
					{React.Children.toArray(
						cartItems.map((row) => (
							<TableRow
								hover
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
								<TableCell align="center" component="th" scope="row">
									<NavLink to={`/product/${row.product}`}>{row.name}</NavLink>
								</TableCell>
								<TableCell align="center">{row.price}</TableCell>
								<TableCell align="center">
									{" "}
									<FormControl>
										<Select
											value={row.qty}
											onChange={(e) =>
												dispatch(addToCart(row.product, Number(e.target.value)))
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
								{!order && (
									<TableCell align="center">
										{" "}
										<Button
											sx={{ padding: "0", margin: "0" }}
											color="error"
											onClick={() => removeFromCartHandler(row.product)}
										>
											<RemoveShoppingCartIcon />{" "}
										</Button>
									</TableCell>
								)}
							</TableRow>
						))
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default CartItemsTable;
