import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";

import {
	Alert,
	CircularProgress,
	Grid,
	Stack,
	Typography,
} from "@mui/material";

import { Box } from "@mui/system";

import {
	useListProductDetailsById,
	useUpdateProduct,
} from "../../Queries/ProductsQueries";
import { useUploadProductImage } from "../../Queries/UploadQueries";

import CenteredCircularProgress from "../../components/CenteredCircularProgress";
import ProductForm from "../../components/Product/ProductForm";

const AdminEditProduct = () => {
	const history = useHistory();
	const { id } = useParams();
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	const [product, productDetailsLoading, productDetailsSuccess] =
		useListProductDetailsById(id, userInfo.token);
	const [uploadImage, isUploadLoading, imageUrl] = useUploadProductImage();

	console.log(product);

	const [
		AdminEditProduct,
		adminUpdateLoading,
		adminUpdateSuccess,
		editIsError,
		editError,
	] = useUpdateProduct();
	const onSubmit = async (data) => {
		console.log(data);
		await AdminEditProduct({
			id,
			product: { ...data, image: imageUrl || (product && product.image) },
			token: userInfo.token,
		});
	};

	useEffect(() => {
		if (adminUpdateSuccess) {
			history.push("/admin/products");
		} else if (product) {
			if (product.name && product._id === id) {
				document.title = product.name;
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
						uploadImage={uploadImage}
						isUploadLoading={isUploadLoading}
					/>
				</Box>
			)}
		</Box>
	);
};

export default AdminEditProduct;
