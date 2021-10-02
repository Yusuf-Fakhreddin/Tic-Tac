import { Box } from "@mui/system";
import {
	Button,
	Divider,
	FormControl,
	InputLabel,
	List,
	ListItem,
	ListItemText,
	MenuItem,
	Select,
	Typography,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { addToCart } from "../actions/cartActions";

const AddToCartBox = ({ product }) => {
	const history = useHistory();
	const dispatch = useDispatch();

	const [qty, setQty] = useState(1);

	const addToCartHandler = () => {
		dispatch(addToCart(product._id, qty));
		history.push(`/cart`);
	};
	return (
		<Box sx={{ border: "1.5px solid #e0e0e0", borderRadius: "5px" }}>
			<List>
				<ListItem>
					<ListItemText>
						Price:
						<Typography variant="h6" component="h3" sx={{ display: "inline" }}>
							{" " + product.price} EGP
						</Typography>
					</ListItemText>
				</ListItem>
				<Divider />
				<ListItem>
					<ListItemText>
						Status:
						<Typography variant="h6" component="h3" sx={{ display: "inline" }}>
							{product.countInStock > 0 ? " In Stock" : " Out Of Stock"}
						</Typography>
					</ListItemText>
				</ListItem>
				{product.countInStock ? (
					<>
						<Divider />
						<ListItem>
							<FormControl sx={{ m: 1, minWidth: 120, marginX: "0" }}>
								<InputLabel>Quantity</InputLabel>

								<Select
									label="Quantity"
									value={qty}
									onChange={(e) => setQty(e.target.value)}
									displayEmpty
								>
									{React.Children.toArray(
										[...Array(product.countInStock).keys()].map((x) => (
											<MenuItem value={x + 1}>{x + 1}</MenuItem>
										))
									)}
								</Select>
							</FormControl>
						</ListItem>
						<Divider />
						<ListItem>
							<Button
								fullWidth
								variant="contained"
								disableElevation
								onClick={addToCartHandler}
								disabled={product.countInStock === 0}
								startIcon={<AddShoppingCartIcon />}
							>
								Add To Cart
							</Button>
						</ListItem>
					</>
				) : null}
			</List>
		</Box>
	);
};

export default AddToCartBox;
