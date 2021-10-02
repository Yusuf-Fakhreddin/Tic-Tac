import React, { useEffect } from "react";
import { CircularProgress, Grid, Typography } from "@mui/material";
import Product from "../components/Product";
import { useListOfProducts } from "../Queries/ProductsQueries";

const HomeScreen = () => {
	const [data, isLoading] = useListOfProducts("", "");
	useEffect(() => {
		document.title = "Caribbean";
	}, []);

	if (isLoading)
		return (
			<div className="flex">
				<CircularProgress
					size="3.2em"
					sx={{
						margin: "15px auto",
					}}
				/>
			</div>
		);
	else
		return (
			<>
				<Typography variant="h3" marginY="10px">
					Latest Products
				</Typography>
				<Grid container rowSpacing={2} spacing={2} justifyContent="center">
					{React.Children.toArray(
						data.products.map((product) => (
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
