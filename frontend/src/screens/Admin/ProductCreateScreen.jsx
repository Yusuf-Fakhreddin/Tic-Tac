import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useCreateProduct } from "../../Queries/ProductsQueries";
import ProductForm from "../../components/Product/ProductForm";
import { resetImages } from "../../actions/imageActions";

const ProductCreateScreen = () => {
	const history = useHistory();
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const [createProduct, createProductLoading, createProductSuccess] =
		useCreateProduct();

	const uploadImagesState = useSelector((state) => state.uploadImagesState);
	const { images } = uploadImagesState;

	const onSubmit = async (data) => {
		await createProduct({
			product: { ...data, images: images },
			token: userInfo.token,
		});
	};
	const dispatch = useDispatch();

	useEffect(() => {
		if (createProductSuccess) {
			dispatch(resetImages());
			history.push("/admin/products");
		}
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
				<ProductForm onSubmit={onSubmit} userInfo={userInfo} />
			</Box>
			{createProductLoading && <CircularProgress />}
		</Box>
	);
};

export default ProductCreateScreen;
