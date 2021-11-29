import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button, CircularProgress, Grid } from "@mui/material";
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
import ProductInfo from "../components/ProductInfo";
import ProductImageBox from "../components/ProductImageBox";
import AddToCartBox from "../components/AddToCartBox";
import ProductListReviews from "../components/ProductListReviews";
import CreateReviewBox from "../components/CreateReviewBox";
import { useSelector } from "react-redux";
import CenteredCircularProgress from "../components/CenteredCircularProgress";
import { useTranslation } from "react-i18next";
import PendingIcon from "@mui/icons-material/Pending";

const ProductScreen = ({ match }) => {
	const { id } = useParams();
	const [product, isLoading, isSuccess] = useListProductDetailsById(id);
	const [deleteProduct, isDeleteLoading, isDeleteSuccess] = useDeleteProduct();
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	const [alreadyReviewed, setAlreadyReviewed] = useState(false);

	const { t } = useTranslation();
	const history = useHistory();

	useEffect(() => {
		if (!isSuccess) document.title = "Product Details";
		else document.title = product.name;
		if (product)
			if (product.reviews.some((e) => e.user === userInfo._id)) {
				setAlreadyReviewed(true);
			} else setAlreadyReviewed(false);
		if (isDeleteSuccess) history.goBack();
	}, [isSuccess, isDeleteSuccess]);

	const DeleteProductHandler = async (id) => {
		console.log(id);
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
						{userInfo && !alreadyReviewed && (
							<CreateReviewBox productId={id} token={userInfo.token} />
						)}
					</Grid>
				</Grid>
			</Box>
		);
};

export default ProductScreen;
