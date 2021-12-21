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
import { useDeliverOrder, usePayOrder } from "../../Queries/OrderQueries";
import { useTranslation } from "react-i18next";

const OrderDetailsSummary = ({ order, userInfo }) => {
	const { t } = useTranslation();

	let shippingAddress, paymentMethod, cartItems;
	shippingAddress = order.shippingAddress;
	paymentMethod = order.paymentMethod;
	cartItems = order.orderItems;

	const [deliverOrder, deliverOrderLoading] = useDeliverOrder();
	const [payOrder, isPayOrderLoading] = usePayOrder();

	const deliverOrderHandler = async () => {
		console.log(cartItems, shippingAddress, paymentMethod);
		if (paymentMethod === "Cash On Delivery") {
			await payOrder({ orderId: order._id, token: userInfo.token });
		}
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
							{t("orderSummary")}
						</Typography>
					</ListItemText>
				</ListItem>
				<Divider />
				<ListItem>
					<ListItemText>
						{t("itemsCost")}:
						<Typography variant="h6" component="h3" sx={{ display: "inline" }}>
							{" " + order.itemsPrice} {t("egp")}
						</Typography>
					</ListItemText>
				</ListItem>
				<Divider />
				<ListItem>
					<ListItemText>
						{t("shippingCost")}:
						<Typography variant="h6" component="h3" sx={{ display: "inline" }}>
							{" " + order.shippingPrice} {t("egp")}
						</Typography>
					</ListItemText>
				</ListItem>
				<Divider />
				<ListItem>
					<ListItemText>
						{t("totalCost")}:
						<Typography variant="h6" component="h3" sx={{ display: "inline" }}>
							{" " + order.totalPrice} {t("egp")}
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
