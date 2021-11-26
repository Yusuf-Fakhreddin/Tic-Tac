import { Alert, Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import CartItemsTable from "../components/CartItemsTable";
import OrderDetailsSummary from "../components/OrderDetailsSummary";
import { useListOrderDetailsById, usePayOrder } from "../Queries/OrderQueries";
import StripeCard from "../components/StripeCard";
import CenteredCircularProgress from "../components/CenteredCircularProgress";

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
		console.log(orderDetails);
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
					// border: "1.5px solid #e0e0e0",
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
							{orderDetails.isDelivered ? (
								<Stack sx={{ width: "100%" }} spacing={2}>
									<Alert severity="success">Delivered</Alert>
								</Stack>
							) : (
								<Stack sx={{ width: "100%" }} spacing={2}>
									<Alert severity="error">Not Delivered</Alert>
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
									<Alert severity="success">Paid</Alert>
								</Stack>
							) : (
								<Stack sx={{ width: "100%" }} spacing={2}>
									<Alert severity="error">Not Paid</Alert>
								</Stack>
							)}
							<Typography variant="h6" component="h1" marginY={2}>
								Order Items
							</Typography>
							<CartItemsTable order cartItems={orderDetails.orderItems} />
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
