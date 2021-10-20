import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
	Button,
	CircularProgress,
	Grid,
	LinearProgress,
	MenuItem,
	TextField,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import ImageUpload from "../components/ImageUpload";
import { useUploadProductImage } from "../Queries/UploadQueries";
import { useCreateProduct } from "../Queries/ProductsQueries";
import ReactHookFormSelect from "../components/ReactHookFormSelect";

const ProductCreateScreen = () => {
	const history = useHistory();
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

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

	const [uploadImage, isUploadLoading, imageUrl] = useUploadProductImage();
	const [createProduct, createProductLoading, createProductSuccess] =
		useCreateProduct();

	const onSubmit = async (data) => {
		console.log("hello World");
		console.log(data);
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
			// component={Paper}
			sx={{
				// border: "1.5px solid #e0e0e0",
				borderRadius: "5px",
				padding: "15px 0",
				width: "600px",
				maxWidth: "100%",
				textAlign: "center",
				margin: "25px auto",
			}}
		>
			{/* {adminEditLoading && <CircularProgress />}
			{editIsError && (
				<Stack sx={{ width: "100%" }} spacing={2}>
					<Alert severity="error">{editError.message}</Alert>
				</Stack>
			)}
			{editSuccess && (
				<Stack sx={{ width: "100%" }} spacing={2}>
					<Alert severity="success">
						Your profile information was successfuly updated
					</Alert>
				</Stack>
			)} */}
			<Typography variant="h4" component="h1" textAlign="left" mt={3}>
				Create Product{" "}
			</Typography>
			<Box marginY={3}>
				<form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmit)}>
					<Grid container justifyContent="center" rowSpacing={3} spacing={2}>
						<Grid item xs={10} md={10}>
							<TextField
								fullWidth
								required
								inputRef={register}
								error={errors.name ? true : false}
								label="Product Name"
								name="name"
								id="name"
								helperText={errors.name ? errors.name.message : null}
								variant="filled"
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
							/>
						</Grid>
						<Grid item xs={10} align="left" md={10}>
							{/* <label htmlFor="icon-button-file">
								<Input accept="image/*" id="icon-button-file" type="file" />
								<Button
									startIcon={<PhotoCamera />}
									variant="contained"
									component="span"
								>
									Upload Image
								</Button>
							</label> */}
							{isUploadLoading && (
								<LinearProgress sx={{ marginBottom: "10px" }} />
							)}
							<ImageUpload uploadImage={uploadImage} token={userInfo.token} />
						</Grid>

						<Grid item xs={10} md={10}>
							<Button variant="contained" type="submit">
								Create Product
							</Button>
						</Grid>
					</Grid>
				</form>
			</Box>
			{createProductLoading && <CircularProgress />}
		</Box>
	);
};

export default ProductCreateScreen;
