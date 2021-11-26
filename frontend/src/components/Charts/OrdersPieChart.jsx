import React from "react";
import Chart from "react-google-charts";
import { CircularProgress } from "@mui/material";

const OrdersPieChart = ({ orders }) => {
	let array = [["Orders", "Status"]];

	for (let i = 0; i < orders.length; i++) {
		let delivered = orders[i]._id.isDelivered ? "Delivered" : "Not Delivered";
		let paid = orders[i]._id.isPaid ? "Paid" : "Not Paid";
		let status = `${delivered} & ${paid}`;
		array.push([status, orders[i].ordersCount]);
	}

	return (
		<Chart
			width={"500px"}
			height={"300px"}
			chartType="PieChart"
			loader={<CircularProgress />}
			data={array}
			options={{
				title: "New Orders Status",
			}}
			rootProps={{ "data-testid": "1" }}
		/>
	);
};

export default OrdersPieChart;
