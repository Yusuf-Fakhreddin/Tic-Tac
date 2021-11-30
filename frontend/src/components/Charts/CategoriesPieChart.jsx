import React from "react";
import Chart from "react-google-charts";
import { CircularProgress } from "@mui/material";

const CategoriesPieChart = ({ products }) => {
	let array = [["Category", "Number of new products"]];

	for (let i = 0; i < products.length; i++) {
		array.push([products[i]._id, products[i].productsCount]);
	}

	return (
		<Chart
			width={"500px"}
			height={"300px"}
			chartType="PieChart"
			loader={<CircularProgress />}
			data={array}
			options={{
				title: "Products Categories",
			}}
			rootProps={{ "data-testid": "1" }}
		/>
	);
};

export default CategoriesPieChart;
