import React from "react";
import { Grid, Typography } from "@mui/material";
import Product from "../components/Product";
import products from "../products";

const HomeScreen = () => {
	return (
		<>
			<Typography variant="h3" marginY="10px">
				Latest Products
			</Typography>
			<Grid container rowSpacing={2} spacing={2} justifyContent="center">
				{React.Children.toArray(
					products.map((product) => (
						<Grid item xs={10} sm="auto">
							{" "}
							<Product product={product} />
						</Grid>
					))
				)}
			</Grid>
		</>
	);
};

export default HomeScreen;
