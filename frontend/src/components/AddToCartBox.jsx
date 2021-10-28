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
import { useTranslation } from "react-i18next";

const AddToCartBox = ({ product }) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const { t } = useTranslation();

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
						{t("price")}:
						<Typography variant="h6" component="h3" sx={{ display: "inline" }}>
							{" " + product.price} {t("egp")}
						</Typography>
					</ListItemText>
				</ListItem>
				<Divider />
				<ListItem>
					<ListItemText>
						{t("status")}:
						<Typography variant="h6" component="h3" sx={{ display: "inline" }}>
							{product.countInStock > 0 ? t("inStock") : t("outOfStock")}
						</Typography>
					</ListItemText>
				</ListItem>
				{product.countInStock ? (
					<>
						<Divider />
						<ListItem>
							<FormControl sx={{ m: 1, minWidth: 120, marginX: "0" }}>
								<InputLabel>{t("quantity")}</InputLabel>

								<Select
									label={t("quantity")}
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
								{t("addToCart")}
							</Button>
						</ListItem>
					</>
				) : null}
			</List>
		</Box>
	);
};

export default AddToCartBox;
