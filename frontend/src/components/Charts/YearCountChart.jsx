import { CircularProgress } from "@mui/material";
import React from "react";
import Chart from "react-google-charts";

const YearCountChart = ({ products, users, orders }) => {
	let monthNames = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];

	const d = new Date();
	let currentMonth = d.getMonth() + 1;
	let array = [["Month", "Users", "Products", "Orders"]];
	for (let i = 1; i <= currentMonth; i++) {
		let productCount = 0,
			usersCount = 0,
			ordersCount = 0;

		for (let j = 0; j < products.length; j++) {
			if (products[j]._id.month === i) {
				productCount = products[j].count;
				break;
			}
		}
		for (let j = 0; j < users.length; j++) {
			if (users[j]._id.month === i) {
				usersCount = users[j].count;
				break;
			}
		}
		for (let j = 0; j < orders.length; j++) {
			if (orders[j]._id.month === i) {
				ordersCount = orders[j].count;
				break;
			}
		}
		let newDate = new Date(
			d.getFullYear(),
			d.getMonth() - (currentMonth - i),
			1
		);
		let month = monthNames[newDate.getMonth()];
		array.push([month, usersCount, productCount, ordersCount]);
	}
	return (
		<Chart
			width={"900px"}
			height={"400px"}
			chartType="LineChart"
			loader={<CircularProgress />}
			data={array}
			options={{
				title:
					"New Users, Products and Orders count in each of the last 12 Months",
				// hAxis: {
				// 	title: "Months",
				// 	format: "0",
				// },
				vAxis: {
					title: "Count",
					format: "0",
				},
				legend: { position: "bottom" },
				// curveType: "function",
				// 		series: {
				//   0: { curveType: 'function' },
				//   1: { curveType: 'function' },
				//   2: { curveType: 'function' },
				// },
			}}
			rootProps={{ "data-testid": "1" }}
		/>
	);
};

export default YearCountChart;
