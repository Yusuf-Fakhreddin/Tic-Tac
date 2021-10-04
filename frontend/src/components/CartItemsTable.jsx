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
const CartItemsTable = ({ cartItems }) => {
	const dispatch = useDispatch();

	const removeFromCartHandler = (id) => {
		dispatch(removeFromCart(id));
	};

	return (
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
	);
};

export default CartItemsTable;
