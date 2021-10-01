import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button, CircularProgress, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router";
import { useEffect } from "react";
import { useListProductDetailsById } from "../Queries/ProductsQueries";
import ProductInfo from "../components/ProductInfo";
import ProductImageBox from "../components/ProductImageBox";
import AddToCartBox from "../components/AddToCartBox";
const ProductScreen = ({ match }) => {
	// const product = products.find((p) => p._id === match.params.id);
	const { id } = useParams();
	const [product, isLoading] = useListProductDetailsById(id);

	useEffect(() => {
		console.log(product, isLoading);
	}, [product]);

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
			<Box paddingTop={3}>
				<NavLink to="/">
					<Button variant="contained" startIcon={<ArrowBackIosIcon />}>
						Back
					</Button>
				</NavLink>
				<Grid
					container
					justifyContent="center"
					rowSpacing={3}
					spacing={2}
					mt={3}
				>
					<Grid item xs={10} md={6}>
						{" "}
						<ProductImageBox productImage={product.image} />
					</Grid>
					<Grid item xs={10} md={3}>
						<ProductInfo product={product} />
					</Grid>
					<Grid item xs={10} md={3}>
						<AddToCartBox product={product} />
					</Grid>
				</Grid>
			</Box>
		);
};

export default ProductScreen;
