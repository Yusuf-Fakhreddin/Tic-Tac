import { Box } from "@mui/system";
import { Button, Divider, List, ListItem } from "@mui/material";
import {
	useDeliverOrder,
	usePayOrder,
	useShipOrder,
	useDeleteOrder,
} from "../../Queries/OrderQueries";
import CenteredCircularProgress from "../CenteredCircularProgress";
import PricesSummary from "./PricesSummary";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const OrderDetailsSummary = ({ order, userInfo }) => {
	let paymentMethod = order.paymentMethod;

	const [deliverOrder, deliverOrderLoading] = useDeliverOrder();
	const [payOrder, isPayOrderLoading] = usePayOrder();
	const [shipOrder, isShipOrderLoading] = useShipOrder();
	const [deleteOrder, isDeleteOrderLoading, isDeleteOrderSuccess] =
		useDeleteOrder();

	const history = useHistory();

	const deliverOrderHandler = async () => {
		if (paymentMethod === "Cash On Delivery") {
			await payOrder({ orderId: order._id, token: userInfo.token });
		}
		await deliverOrder({
			orderId: order._id,
			token: userInfo.token,
		});
	};
	const shipOrderHandler = async () => {
		await shipOrder({
			orderId: order._id,
			token: userInfo.token,
		});
	};
	const cancelOrderHandler = async () => {
		await deleteOrder({
			orderId: order._id,
			token: userInfo.token,
		});
	};
	useEffect(() => {
		if (isDeleteOrderSuccess) history.goBack();
	}, [isDeleteOrderSuccess]);
	return (
		<Box
			sx={{
				border: "1.5px solid #e0e0e0",
				borderRadius: "5px",
				marginTop: "15px",
			}}
		>
			<List>
				<PricesSummary
					totalPrice={order.totalPrice}
					itemsPrice={order.itemsPrice}
					shippingPrice={order.shippingPrice}
				/>

				{order && !order.isShipped && (
					<>
						<Divider />
						<ListItem>
							<Button
								fullWidth
								variant="contained"
								disableElevation
								onClick={cancelOrderHandler}
							>
								Cancel Order
							</Button>
						</ListItem>
					</>
				)}

				{order && userInfo && userInfo.isAdmin && !order.isShipped && (
					<>
						<Divider />
						<ListItem>
							<Button
								fullWidth
								variant="contained"
								disableElevation
								onClick={shipOrderHandler}
								disabled={
									paymentMethod === "Credit/Debit Card" && !order.isPaid
								}
							>
								{paymentMethod === "Credit/Debit Card" && !order.isPaid
									? "Not Paid"
									: "Mark As Shipped"}
							</Button>
						</ListItem>
					</>
				)}
				{order &&
					userInfo &&
					userInfo.isAdmin &&
					order.isShipped &&
					!order.isDelivered && (
						<>
							<Divider />
							<ListItem>
								<Button
									fullWidth
									variant="contained"
									disableElevation
									onClick={deliverOrderHandler}
								>
									Mark As Delivered
								</Button>
							</ListItem>
						</>
					)}

				{(deliverOrderLoading ||
					isDeleteOrderLoading ||
					isPayOrderLoading ||
					isShipOrderLoading) && <CenteredCircularProgress />}
			</List>
		</Box>
	);
};

export default OrderDetailsSummary;
