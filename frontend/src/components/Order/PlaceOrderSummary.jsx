import { Box } from "@mui/system";
import {
	Button,
	Divider,
	List,
	ListItem,
	ListItemText,
	Typography,
} from "@mui/material";
import { useCreateOrder } from "../../Queries/OrderQueries";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";

const PlaceOrderSummary = ({ cart, token }) => {
	const { t } = useTranslation();

	let shippingAddress, paymentMethod, cartItems;

	shippingAddress = cart.shippingAddress;
	paymentMethod = cart.paymentMethod;
	cartItems = cart.cartItems;

	const addDecimals = (num) => {
		return (Math.round(num * 100) / 100).toFixed(2);
	};

	let itemsPrice = addDecimals(
		cartItems.reduce((acc, item) => acc + item.product.price * item.qty, 0)
	);
	let shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 20);
	let totalPrice = (Number(itemsPrice) + Number(shippingPrice)).toFixed(2);

	const [createOrder, createOrderLoading, createOrderSuccess, createdOrder] =
		useCreateOrder();
	const placeOrderHandler = async () => {
		console.log(
			cartItems,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			shippingPrice,
			totalPrice
		);
		await createOrder({
			order: {
				orderItems: cartItems,
				shippingAddress: shippingAddress,
				paymentMethod: paymentMethod,
				itemsPrice: itemsPrice,
				shippingPrice: shippingPrice,
				totalPrice: totalPrice,
			},
			token: token,
		});
	};
	const history = useHistory();

	useEffect(() => {
		if (createOrderSuccess) history.push(`/order/${createdOrder._id}`);
	}, [createOrderSuccess, history]);
	return (
		<Box
			sx={{
				border: "1.5px solid #e0e0e0",
				borderRadius: "5px",
				marginTop: "15px",
			}}
		>
			<List>
				<ListItem>
					<ListItemText>
						<Typography variant="h6" component="h3">
							{t("orderSummary")}
						</Typography>
					</ListItemText>
				</ListItem>
				<Divider />
				<ListItem>
					<ListItemText>
						{t("itemsCost")}:
						<Typography variant="h6" component="h3" sx={{ display: "inline" }}>
							{" " + itemsPrice} {t("egp")}
						</Typography>
					</ListItemText>
				</ListItem>
				<Divider />
				<ListItem>
					<ListItemText>
						{t("shippingCost")}:
						<Typography variant="h6" component="h3" sx={{ display: "inline" }}>
							{" " + shippingPrice} {t("egp")}
						</Typography>
					</ListItemText>
				</ListItem>
				<Divider />
				<ListItem>
					<ListItemText>
						{t("totalCost")}:
						<Typography variant="h6" component="h3" sx={{ display: "inline" }}>
							{" " + totalPrice} {t("egp")}
						</Typography>
					</ListItemText>
				</ListItem>
				{cart && (
					<>
						<Divider />
						<ListItem>
							<Button
								fullWidth
								variant="contained"
								disableElevation
								onClick={placeOrderHandler}
								disabled={cartItems === 0}
							>
								{t("placeOrder")}
							</Button>
						</ListItem>
					</>
				)}
			</List>
		</Box>
	);
};

export default PlaceOrderSummary;
