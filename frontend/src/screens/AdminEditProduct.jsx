import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";

import {
	Alert,
	Button,
	Checkbox,
	CircularProgress,
	FormControlLabel,
	Grid,
	LinearProgress,
	MenuItem,
	Stack,
	TextField,
	Typography,
} from "@mui/material";

import { Box } from "@mui/system";
import {
	useAdminUpdateUser,
	useListUserDetailsById,
} from "../Queries/UserQueries";
import {
	useListProductDetailsById,
	useUpdateProduct,
} from "../Queries/ProductsQueries";
import { useUploadProductImage } from "../Queries/UploadQueries";
import ImageUpload from "../components/ImageUpload";
import ReactHookFormSelect from "../components/ReactHookFormSelect";

const AdminEditProduct = () => {
	const history = useHistory();
	const { id } = useParams();
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	const [product, productDetailsLoading, productDetailsSuccess] =
		useListProductDetailsById(id, userInfo.token);
	const [uploadImage, isUploadLoading, imageUrl] = useUploadProductImage();

	console.log(product);
	const validationSchema = Yup.object({
		name: Yup.string().required("Required"),
		// brand: Yup.string().required("Required"),
		// category: Yup.string().required("Required"),
		// countInStock: Yup.string().required("Required"),
		price: Yup.number()
			.typeError("Price must be a number")
			.required("Required"),
		// description: Yup.string().required("Required"),
	});
	const { register, handleSubmit, errors, setValue, control } = useForm({
		mode: "onBlur",
		resolver: yupResolver(validationSchema),
	});
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
				setValue("name", product.name);
				setValue("brand", product.brand);
				setValue("category", product.category);
				setValue("price", product.price);
				setValue("countInStock", product.countInStock);
				setValue("description", product.description);
			}
		}
	}, [userInfo, history, id, adminUpdateSuccess, productDetailsSuccess]);

	return (
		<Box
			mt={3}
			// component={Paper}
			sx={{
				// border: "1.5px solid #e0e0e0",
				borderRadius: "5px",
				padding: "15px 0",
				width: "600px",
				maxWidth: "100%",
				// textAlign: "center",
				margin: "25px auto",
			}}
		>
			{adminUpdateLoading && <CircularProgress />}
			{editIsError && (
				<Stack sx={{ width: "100%" }} spacing={2}>
					<Alert severity="error">{editError.message}</Alert>
				</Stack>
			)}
			{adminUpdateSuccess && (
				<Stack sx={{ width: "100%" }} spacing={2}>
					<Alert severity="success">Product was successfuly updated</Alert>
				</Stack>
			)}
			<Typography variant="h4" component="h1" mt={3}>
				Edit User{" "}
			</Typography>
			<Box marginY={3}>
				<form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmit)}>
					<Grid container justifyContent="center" rowSpacing={3} spacing={2}>
						<Grid item xs={10} md={10}>
							<TextField
								fullWidth
								inputRef={register}
								error={errors.name ? true : false}
								label="Product Name"
								name="name"
								id="name"
								helperText={errors.name ? errors.name.message : null}
								variant="filled"
								defaultValue="Product Name"
							/>
						</Grid>
						<Grid item xs={10} md={10}>
							<TextField
								fullWidth
								inputRef={register}
								// error={errors.price ? true : false}
								label="Brand"
								name="brand"
								id="brand"
								defaultValue="Brand"
								// helperText={errors.price ? errors.price.message : null}
								variant="filled"
							/>
						</Grid>
						<Grid item xs={10} md={10}>
							<ReactHookFormSelect
								name="category"
								label="Category"
								control={control}
								variant="filled"
							>
								<MenuItem value="Technology">Technology</MenuItem>
								<MenuItem value="Vehicles">Vehicles</MenuItem>
								<MenuItem value="Home">Home</MenuItem>
								<MenuItem value="Pets">Pets</MenuItem>
								<MenuItem value="Fashion">Fashion</MenuItem>
								<MenuItem value="Other">Other</MenuItem>
							</ReactHookFormSelect>
						</Grid>
						<Grid item xs={10} md={10}>
							<TextField
								fullWidth
								required
								inputRef={register}
								error={errors.price ? true : false}
								label="Price (EGP)"
								name="price"
								id="price"
								type="number"
								onWheel={(e) => e.target.blur()}
								helperText={errors.price ? errors.price.message : null}
								variant="filled"
								defaultValue={0}
							/>
						</Grid>
						<Grid item xs={10} md={10}>
							<TextField
								fullWidth
								required
								inputRef={register}
								error={errors.countInStock ? true : false}
								label="Count In Stock"
								name="countInStock"
								id="countInStock"
								type="number"
								onWheel={(e) => e.target.blur()}
								helperText={
									errors.countInStock ? errors.countInStock.message : null
								}
								variant="filled"
								defaultValue={0}
							/>
						</Grid>
						<Grid item xs={10} md={10}>
							<TextField
								fullWidth
								inputRef={register}
								// error={errors.price ? true : false}
								label="Description"
								name="description"
								id="description"
								multiline
								// helperText={errors.price ? errors.price.message : null}
								variant="filled"
								defaultValue="Description"
							/>
						</Grid>
						<Grid item xs={10} align="left" md={10}>
							{isUploadLoading && (
								<LinearProgress sx={{ marginBottom: "10px" }} />
							)}
							<ImageUpload
								alreadyExistedImage={product && product.image}
								uploadImage={uploadImage}
								token={userInfo.token}
							/>
						</Grid>
						<Grid item xs={10} md={10} align="center">
							<Button variant="contained" type="submit">
								Update Product
							</Button>
						</Grid>
					</Grid>
				</form>
			</Box>
		</Box>
	);
};

export default AdminEditProduct;
