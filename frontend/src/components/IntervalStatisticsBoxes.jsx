import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const IntervalStatisticsBoxes = ({ data }) => {
	return (
		<Box mt={3}>
			{data.newUsersCount ? (
				<Grid container spacing={2} my={2} rowSpacing={2}>
					<Grid item md={4}>
						<Box
							sx={{
								border: "1.5px solid #e0e0e0",
								padding: "15px",
								borderRadius: "5px",
							}}
						>
							<Typography
								variant="body1"
								sx={{ display: "inline-block", mr: "5px" }}
							>
								New Users Count:
							</Typography>
							<Typography variant="h6" sx={{ display: "inline-block" }}>
								{data.newUsersCount}
							</Typography>
						</Box>
					</Grid>
				</Grid>
			) : (
				<Typography variant="h4" mb={2}>
					No New Users
				</Typography>
			)}

			{
				<Typography variant="h4" mb={2}>
					{data.products.length > 0 ? "Products" : "No New Products"}
				</Typography>
			}
			<Grid container spacing={2} mb={2} rowSpacing={2}>
				{React.Children.toArray(
					data.products.map((category) => (
						<Grid item md={4}>
							<Box
								sx={{
									border: "1.5px solid #e0e0e0",
									padding: "15px",
									borderRadius: "5px",
								}}
							>
								<Typography variant="body1">{category._id}</Typography>
								<Typography variant="h6">
									New Products Count: {category.productsCount}
								</Typography>
							</Box>
						</Grid>
					))
				)}{" "}
			</Grid>

			{
				<Typography variant="h4" mb={2}>
					{data.orders.length > 0 ? "Orders" : "No New Orders"}
				</Typography>
			}
			<Grid container spacing={2} rowSpacing={2}>
				{React.Children.toArray(
					data.orders.map((condition) => (
						<Grid item md={4}>
							<Box
								sx={{
									padding: "15px",
									border: "1.5px solid #e0e0e0",
									borderRadius: "5px",
								}}
							>
								<Typography variant="body1">
									Paid: {condition._id.isPaid ? "True" : "False"}
								</Typography>
								<Typography variant="body1">
									Delivered: {condition._id.isDelivered ? "True" : "False"}
								</Typography>
								<Typography variant="body1">
									Count: {condition.ordersCount}
								</Typography>
								<Typography variant="h6">
									Total: {condition.totalPriceSum} EGP
								</Typography>
							</Box>
						</Grid>
					))
				)}
			</Grid>
		</Box>
	);
};

export default IntervalStatisticsBoxes;
