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
import { useDispatch } from "react-redux";
import { useCreateOrder } from "../Queries/OrderQueries";
import { useEffect } from "react";
import { useHistory } from "react-router";

const OrderSummary = ({ cart, order, token }) => {
	let shippingAddress, paymentMethod, cartItems;
	if (order) {
		shippingAddress = order.shippingAddress;
		paymentMethod = order.paymentMethod;
		cartItems = order.orderItems;
	} else {
		shippingAddress = cart.shippingAddress;
		paymentMethod = cart.paymentMethod;
		cartItems = cart.orderItems;
	}
	const addDecimals = (num) => {
		return (Math.round(num * 100) / 100).toFixed(2);
	};

	let itemsPrice = addDecimals(
		cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
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
							Order Summary
						</Typography>
					</ListItemText>
				</ListItem>
				<Divider />
				<ListItem>
					<ListItemText>
						Items Cost:
						<Typography variant="h6" component="h3" sx={{ display: "inline" }}>
							{" " + itemsPrice} EGP
						</Typography>
					</ListItemText>
				</ListItem>
				<Divider />
				<ListItem>
					<ListItemText>
						Shipping Cost:
						<Typography variant="h6" component="h3" sx={{ display: "inline" }}>
							{" " + shippingPrice} EGP
						</Typography>
					</ListItemText>
				</ListItem>
				<Divider />
				<ListItem>
					<ListItemText>
						Total Cost:
						<Typography variant="h6" component="h3" sx={{ display: "inline" }}>
							{" " + totalPrice} EGP
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
								Place Order
							</Button>
						</ListItem>
					</>
				)}
			</List>
		</Box>
	);
};

export default OrderSummary;
