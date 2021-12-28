import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";

import { Alert, CircularProgress, Stack, Typography } from "@mui/material";

import { Box } from "@mui/system";

import {
	useListProductDetailsById,
	useUpdateProduct,
} from "../../Queries/ProductsQueries";

import CenteredCircularProgress from "../../components/CenteredCircularProgress";
import ProductForm from "../../components/Product/ProductForm";
import { resetImages, initialImages } from "../../actions/imageActions";

const AdminEditProduct = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const { id } = useParams();
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	const [product, productDetailsLoading, productDetailsSuccess] =
		useListProductDetailsById(id, userInfo.token);

	console.log(product);
	const [
		AdminEditProduct,
		adminUpdateLoading,
		adminUpdateSuccess,
		editIsError,
		editError,
	] = useUpdateProduct();

	const uploadImagesState = useSelector((state) => state.uploadImagesState);
	const { images } = uploadImagesState;

	const onSubmit = async (data) => {
		console.log(data);
		console.log(images);

		await AdminEditProduct({
			id,
			product: {
				...data,
				images: images,
			},
			token: userInfo.token,
		});
		dispatch(resetImages());
	};

	useEffect(() => {
		if (adminUpdateSuccess) {
			history.push("/admin/products");
		} else if (product) {
			if (product.name && product._id === id) {
				document.title = product.name;
				dispatch(initialImages(product.images));
			}
		}
	}, [userInfo, history, id, adminUpdateSuccess, productDetailsSuccess]);

	return (
		<Box
			mt={3}
			sx={{
				borderRadius: "5px",
				padding: "15px 0",
				width: "600px",
				maxWidth: "100%",
				margin: "25px auto",
			}}
		>
			{adminUpdateLoading && <CircularProgress />}
			{editIsError && (
				<Stack sx={{ width: "100%" }} spacing={2}>
					<Alert severity="error">{editError.message}</Alert>
				</Stack>
			)}

			<Typography variant="h4" component="h1" mt={3}>
				Edit Product{" "}
			</Typography>
			{productDetailsLoading ? (
				<CenteredCircularProgress />
			) : (
				<Box marginY={3}>
					<ProductForm
						onSubmit={onSubmit}
						initialValues={product}
						userInfo={userInfo}
					/>
				</Box>
			)}
		</Box>
	);
};

export default AdminEditProduct;
