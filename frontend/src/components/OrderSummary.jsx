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

const OrderSummary = ({ cart }) => {
	const { shippingAddress, paymentMethod, cartItems } = cart;

	const addDecimals = (num) => {
		return (Math.round(num * 100) / 100).toFixed(2);
	};

	let itemsPrice = addDecimals(
		cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
	);
	let shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 20);
	let totalPrice = (Number(itemsPrice) + Number(shippingPrice)).toFixed(2);

	const dispatch = useDispatch();
	const placeOrderHandler = () => {
		// dispatch(
		// 	createOrder({
		// 		orderItems: cartItems,
		// 		shippingAddress: shippingAddress,
		// 		paymentMethod: paymentMethod,
		// 		itemsPrice: itemsPrice,
		// 		shippingPrice: shippingPrice,
		// 		totalPrice: totalPrice,
		// 	})
		// );
		console.log(
			cartItems,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			shippingPrice,
			totalPrice
		);
	};

	return (
		<Box sx={{ border: "1.5px solid #e0e0e0", borderRadius: "5px" }}>
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
			</List>
		</Box>
	);
};

export default OrderSummary;
