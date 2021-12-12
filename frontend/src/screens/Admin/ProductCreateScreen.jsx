import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { CircularProgress, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useUploadProductImage } from "../../Queries/UploadQueries";
import { useCreateProduct } from "../../Queries/ProductsQueries";
import ProductForm from "../../components/Product/ProductForm";

const ProductCreateScreen = () => {
	const history = useHistory();
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const [uploadImage, isUploadLoading, imageUrl] = useUploadProductImage();
	const [createProduct, createProductLoading, createProductSuccess] =
		useCreateProduct();

	const onSubmit = async (data) => {
		console.log("hello World");
		console.log(data);
		console.log(imageUrl);
		await createProduct({
			product: { ...data, image: imageUrl },
			token: userInfo.token,
		});
	};

	useEffect(() => {
		if (createProductSuccess) history.push("/admin/products");
		if (!userInfo || !userInfo.isAdmin) history.push("/");
		document.title = "New Product";
	}, [userInfo, history, createProductSuccess]);

	return (
		<Box
			mt={3}
			sx={{
				borderRadius: "5px",
				padding: "15px 0",
				width: "600px",
				maxWidth: "100%",
				textAlign: "left",
				margin: "25px auto",
			}}
		>
			<Typography variant="h4" component="h1" mt={3}>
				Create Product{" "}
			</Typography>
			<Box marginY={3}>
				<ProductForm
					onSubmit={onSubmit}
					userInfo={userInfo}
					isUploadLoading={isUploadLoading}
					uploadImage={uploadImage}
				/>
			</Box>
			{createProductLoading && <CircularProgress />}
		</Box>
	);
};

export default ProductCreateScreen;
