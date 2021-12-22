import { Alert, Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import {
	useListOrderDetailsById,
	usePayOrder,
} from "../../Queries/OrderQueries";
import OrderDetailsSummary from "../../components/Order/OrderDetailsSummary";
import StripeCard from "../../components/Form/StripeCard";
import CenteredCircularProgress from "../../components/CenteredCircularProgress";
import OrderItemsTable from "../../components/Order/OrderItemsTable";

const OrderDetailsScreen = () => {
	const history = useHistory();
	const { id } = useParams();
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const [orderDetails, orderDetailsLoading] = useListOrderDetailsById(
		id,
		userInfo.token
	);
	useEffect(() => {
		document.title = "Order";
		if (!userInfo) history.push(`/login?redirect=orderdetails/${id}`);
		else if (orderDetails && userInfo._id !== orderDetails.user._id)
			history.push(`/`);
	}, [userInfo, history, id, orderDetails]);

	const [payOrder, isPayOrderLoading] = usePayOrder();
	const onSuccessfulCheckout = async () => {
		await payOrder({ orderId: id, token: userInfo.token });
	};
	if (orderDetailsLoading) return <CenteredCircularProgress />;
	else if (orderDetails)
		return (
			<Box
				mt={3}
				sx={{
					borderRadius: "5px",
					padding: "15px",
					width: "100%",
					margin: "25px auto",
				}}
			>
				{" "}
				<Box marginY={3}>
					<Grid
						container
						justifyContent="center"
						textAlign="left"
						rowSpacing={3}
						spacing={2}
					>
						<Grid item xs={10} md={9}>
							{orderDetails.paymentMethod === "Credit/Debit Card" &&
								!orderDetails.isPaid &&
								orderDetails.user &&
								orderDetails.user._id === userInfo._id && (
									<div>
										<Typography variant="h6" component="h1" marginY={2}>
											Card Payment
										</Typography>
										<StripeCard
											onSuccessfulCheckout={onSuccessfulCheckout}
											price={orderDetails.totalPrice}
											user={orderDetails.user}
											shippingAddress={orderDetails.shippingAddress}
										/>
									</div>
								)}
							{isPayOrderLoading && <CenteredCircularProgress />}
							<Typography variant="h6" component="h1" marginY={2}>
								Shipping
							</Typography>
							<Typography variant="subtitle1">
								Name: {orderDetails.user && orderDetails.user.name}
							</Typography>
							<Typography variant="subtitle1">
								Email:{" "}
								<a
									href={`mailto:${
										orderDetails.user && orderDetails.user.email
									}`}
								>
									{orderDetails.user && orderDetails.user.email}
								</a>
							</Typography>
							<Typography variant="subtitle1">
								Mobile Number: {orderDetails.shippingAddress.mobileNumber}
							</Typography>
							<Typography variant="subtitle1">
								Address: {orderDetails.shippingAddress.address},{" "}
								{orderDetails.shippingAddress.city},{" "}
								{orderDetails.shippingAddress.country}
							</Typography>

							{orderDetails.isShipping && !orderDetails.isDelivered ? (
								<Stack sx={{ width: "100%" }} spacing={2}>
									<Alert severity="success">
										Shipped at {orderDetails.shippedAt.substring(0, 10)}
									</Alert>
								</Stack>
							) : (
								<Stack sx={{ width: "100%" }} spacing={2}>
									<Alert severity="error">Not Shipped</Alert>
								</Stack>
							)}
							{orderDetails.isDelivered && (
								<Stack sx={{ width: "100%" }} spacing={2}>
									<Alert severity="success">
										Delivered at {orderDetails.deliveredAt.substring(0, 10)}
									</Alert>
								</Stack>
							)}
							<Typography variant="h6" component="h1" marginY={2}>
								Payment Method
							</Typography>
							<Typography variant="subtitle1">
								{orderDetails.paymentMethod}
							</Typography>
							{orderDetails.isPaid ? (
								<Stack sx={{ width: "100%" }} spacing={2}>
									<Alert severity="success">
										Paid at {orderDetails.paidAt.substring(0, 10)}
									</Alert>
								</Stack>
							) : (
								<Stack sx={{ width: "100%" }} spacing={2}>
									<Alert severity="error">Not Paid</Alert>
								</Stack>
							)}
							<Typography variant="h6" component="h1" marginY={2}>
								Order Items
							</Typography>
							<OrderItemsTable orderItems={orderDetails.orderItems} />
						</Grid>{" "}
						<Grid item xs={10} md={3}>
							<OrderDetailsSummary order={orderDetails} userInfo={userInfo} />
						</Grid>
					</Grid>
				</Box>{" "}
			</Box>
		);
};

export default OrderDetailsScreen;
