import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
	Button,
	CircularProgress,
	Divider,
	Grid,
	List,
	ListItem,
	ListItemText,
	Rating,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router";
import React, { useEffect, useState } from "react";
import { useListProductDetailsById } from "../Queries/ProductsQueries";
import ProductInfo from "../components/ProductInfo";
import ProductImageBox from "../components/ProductImageBox";
import AddToCartBox from "../components/AddToCartBox";
import ProductListReviews from "../components/ProductListReviews";
import CreateReviewBox from "../components/CreateReviewBox";
import { useSelector } from "react-redux";
const ProductScreen = ({ match }) => {
	// const product = products.find((p) => p._id === match.params.id);
	const { id } = useParams();
	const [product, isLoading, isSuccess] = useListProductDetailsById(id);

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	const [alreadyReviewed, setAlreadyReviewed] = useState(false);
	const checkIfAlreadyReviewed = () => {
		console.log("check");
		if (product)
			if (product.reviews.some((e) => e.user === userInfo._id)) {
				return true;
			} else return false;
	};

	useEffect(() => {
		if (!isSuccess) document.title = "Product Details";
		else document.title = product.name;
		if (product)
			if (product.reviews.some((e) => e.user === userInfo._id)) {
				setAlreadyReviewed(true);
			} else setAlreadyReviewed(false);
	}, [isSuccess]);

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
				<Grid
					container
					justifyContent="center"
					rowSpacing={3}
					spacing={2}
					mt={1}
				>
					<Grid item xs={10} md={6}>
						<ProductListReviews reviews={product.reviews} />
					</Grid>
					<Grid item xs={10} md={6}>
						{!alreadyReviewed && (
							<CreateReviewBox productId={id} token={userInfo.token} />
						)}
					</Grid>
				</Grid>
			</Box>
		);
};

export default ProductScreen;
