import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button, Grid } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/system";
import { NavLink } from "react-router-dom";
import { useParams, useHistory } from "react-router";
import React, { useEffect, useState } from "react";
import {
	useDeleteProduct,
	useListProductDetailsById,
} from "../Queries/ProductsQueries";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import PendingIcon from "@mui/icons-material/Pending";
import CenteredCircularProgress from "../components/CenteredCircularProgress";
import ProductInfo from "../components/Product/ProductInfo";
import ProductImageBox from "../components/Product/ProductImageBox";
import AddToCartBox from "../components/Order/AddToCartBox";
import ProductListReviews from "../components/Product/ProductListReviews";
import CreateReviewBox from "../components/Product/CreateReviewBox";
import ProductImagesCarousel from "../components/Product/ProductImagesCarousel";

const ProductScreen = ({ match }) => {
	const { id } = useParams();
	const [product, isLoading, isSuccess] = useListProductDetailsById(id);
	const [deleteProduct, isDeleteLoading, isDeleteSuccess] = useDeleteProduct();
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const { t } = useTranslation();
	const history = useHistory();
	let alreadyReviewed = false;
	if (product && product.reviews.some((e) => e.user === userInfo._id)) {
		alreadyReviewed = true;
	} else {
		alreadyReviewed = false;
	}

	useEffect(() => {
		if (!isSuccess) document.title = "Product Details";
		else document.title = product.name;

		if (isDeleteSuccess) history.goBack();
	}, [isSuccess, isDeleteSuccess]);

	const DeleteProductHandler = async (id) => {
		await deleteProduct({ id: id, token: userInfo.token });
	};
	if (isLoading) return <CenteredCircularProgress />;
	else
		return (
			<Box paddingTop={3}>
				<Box sx={{ display: "flex", justifyContent: "space-between" }}>
					<Button
						// component={NavLink}
						// to="/"
						onClick={() => history.goBack()}
						variant="contained"
						startIcon={<ArrowBackIosIcon />}
					>
						{t("back")}
					</Button>
					{userInfo && userInfo.isAdmin && (
						<Box sx={{ marginTop: "5px" }}>
							<Button
								sx={{ marginRight: "5px" }}
								variant="contained"
								onClick={() => DeleteProductHandler(id)}
								startIcon={isDeleteLoading ? <PendingIcon /> : <DeleteIcon />}
							>
								{t("deleteProduct")}
							</Button>
							<Button
								component={NavLink}
								to={`/admin/editproduct/${id}`}
								variant="contained"
								startIcon={<EditIcon />}
							>
								{t("editProduct")}
							</Button>{" "}
						</Box>
					)}
				</Box>

				<Grid
					container
					justifyContent="center"
					rowSpacing={3}
					spacing={2}
					mt={3}
				>
					<Grid item xs={10} md={6}>
						{" "}
						{/* <ProductImageBox productImage={product.image} /> */}
						<ProductImagesCarousel images={product.images} />
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
						{userInfo && !alreadyReviewed && (
							<CreateReviewBox productId={id} token={userInfo.token} />
						)}
					</Grid>
				</Grid>
			</Box>
		);
};

export default ProductScreen;
