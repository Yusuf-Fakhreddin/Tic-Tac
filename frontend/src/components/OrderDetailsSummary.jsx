import { Box } from "@mui/system";
import {
	Button,
	CircularProgress,
	Divider,
	List,
	ListItem,
	ListItemText,
	Typography,
} from "@mui/material";
import { useCreateOrder, useDeliverOrder } from "../Queries/OrderQueries";
import { useEffect } from "react";
import { useHistory } from "react-router";

const OrderDetailsSummary = ({ order, userInfo }) => {
	let shippingAddress, paymentMethod, cartItems;
	shippingAddress = order.shippingAddress;
	paymentMethod = order.paymentMethod;
	cartItems = order.orderItems;

	const addDecimals = (num) => {
		return (Math.round(num * 100) / 100).toFixed(2);
	};

	let itemsPrice = addDecimals(
		cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
	);
	let shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 20);
	let totalPrice = (Number(itemsPrice) + Number(shippingPrice)).toFixed(2);

	const [deliverOrder, deliverOrderLoading] = useDeliverOrder();
	const deliverOrderHandler = async () => {
		console.log(
			cartItems,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			shippingPrice,
			totalPrice
		);
		await deliverOrder({
			orderId: order._id,
			token: userInfo.token,
		});
	};

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
				{order && userInfo && userInfo.isAdmin && (
					<>
						<Divider />
						<ListItem>
							<Button
								fullWidth
								variant="contained"
								disableElevation
								onClick={deliverOrderHandler}
								disabled={order.isDelivered}
							>
								{order.isDelivered ? "Delivered" : "Mark As Delivered"}
							</Button>
						</ListItem>
					</>
				)}
				{deliverOrderLoading && <CircularProgress />}
			</List>
		</Box>
	);
};

export default OrderDetailsSummary;
