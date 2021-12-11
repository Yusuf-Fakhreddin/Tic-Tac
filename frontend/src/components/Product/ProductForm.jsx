import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import {
	Button,
	Grid,
	LinearProgress,
	MenuItem,
	TextField,
} from "@mui/material";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ReactHookFormSelect from "../Form/ReactHookFormSelect";
import { useUploadProductImage } from "../../Queries/UploadQueries";
import ImageUpload from "./ImageUpload";

const ProductForm = ({
	onSubmit,
	userInfo,
	initialValues,
	alreadyExistedImage,
}) => {
	const validationSchema = Yup.object({
		name: Yup.string().required("Required"),
		brand: Yup.string().required("Required"),
		category: Yup.string().required("Required"),
		countInStock: Yup.string().required("Required"),
		price: Yup.number()
			.typeError("Price must be a number")
			.required("Required"),
		// description: Yup.string().required("Required"),
	});

	const { register, handleSubmit, errors, setValue, control } = useForm({
		mode: "onBlur",
		resolver: yupResolver(validationSchema),
		defaultValues: {
			name: initialValues.name,
			category: initialValues.category,
			brand: initialValues.brand,
			price: initialValues.price,
			description: initialValues.description,
			countInStock: initialValues.countInStock,
		},
	});
	console.log(initialValues);
	const [uploadImage, isUploadLoading, imageUrl] = useUploadProductImage();

	return (
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
						error={errors.brand ? true : false}
						label="Brand"
						name="brand"
						id="brand"
						helperText={errors.brand ? errors.brand.message : null}
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
						<MenuItem value="Men">Men</MenuItem>
						<MenuItem value="Women">Women</MenuItem>
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
						type="numeric"
						// onWheel={(e) => e.target.blur()}
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
						type="numeric"
						// onWheel={(e) => e.target.blur()}
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
						label="Description"
						name="description"
						id="description"
						multiline
						variant="filled"
					/>
				</Grid>
				<Grid item xs={10} align="left" md={10}>
					{isUploadLoading && <LinearProgress sx={{ marginBottom: "10px" }} />}
					<ImageUpload
						uploadImage={uploadImage}
						token={userInfo.token}
						alreadyExistedImage={initialValues && initialValues.image}
					/>
				</Grid>

				<Grid item align="center" xs={10} md={10}>
					<Button variant="contained" type="submit">
						{initialValues ? "Edit" : "Create"} Product
					</Button>
				</Grid>
			</Grid>
		</form>
	);
};

export default ProductForm;
