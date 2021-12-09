import React, { useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import ProductCard from "../components/Product/ProductCard";
import { useTranslation } from "react-i18next";
import CenteredCircularProgress from "../components/CenteredCircularProgress";
import { useTopProducts } from "../Queries/ProductsQueries";

const HomeScreen = () => {
	const { t } = useTranslation();

	const [products, isLoading] = useTopProducts();
	useEffect(() => {
		document.title = "Caribbean";
	}, []);

	if (!products) return <CenteredCircularProgress />;
	else
		return (
			<>
				<Typography variant="h3" marginY="10px">
					{t("topProducts")}
				</Typography>
				<Grid container rowSpacing={2} spacing={2} justifyContent="center">
					{React.Children.toArray(
						products.map((product) => (
							<Grid item xs={10} sm="auto">
								{" "}
								<ProductCard product={product} />
							</Grid>
						))
					)}
				</Grid>
			</>
		);
};

export default HomeScreen;
