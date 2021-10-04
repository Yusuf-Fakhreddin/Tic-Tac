import {
	Button,
	Grid,
	InputAdornment,
	TextField,
	Typography,
} from "@mui/material";

import { Box } from "@mui/system";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useHistory } from "react-router-dom";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingScreen = () => {
	const dispatch = useDispatch();

	const history = useHistory();
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const cart = useSelector((state) => state.cartState);
	const { shippingAddress } = cart;

	const validationSchema = Yup.object({
		address: Yup.string().required("Required"),
		city: Yup.string().required("Required"),
		mobileNumber: Yup.string()
			.required("Required")
			.matches(/(01)[0-9]{9}/, "Please enter a valid egyptian mobile number"),
		country: Yup.string().required("Required"),
	});

	const { register, handleSubmit, errors } = useForm({
		mode: "onBlur",
		resolver: yupResolver(validationSchema),
		defaultValues: {
			mobileNumber: shippingAddress.mobileNumber
				? shippingAddress.mobileNumber
				: "",
			address: shippingAddress.address ? shippingAddress.address : "",
			city: shippingAddress.city ? shippingAddress.city : "",
			country: shippingAddress.country ? shippingAddress.country : "",
		},
	});

	useEffect(() => {
		document.title = "Shipping";
		if (!userInfo) history.push("/login?redirect=shipping");
	}, [userInfo, history]);

	const onSubmit = (data) => {
		console.log(data);
		let { address, city, mobileNumber, country } = data;
		dispatch(saveShippingAddress({ address, city, mobileNumber, country }));
		history.push("/paymentmethod");
	};

	return (
		<Box
			mt={3}
			sx={{
				// border: "1.5px solid #e0e0e0",
				borderRadius: "5px",
				padding: "15px",
				width: "100%",
				margin: "25px auto",
			}}
		>
			<Box marginY={3}>
				<CheckoutSteps Shipping />
				<Typography variant="h4" component="h1" marginY={2}>
					Shipping
				</Typography>
				<form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmit)}>
					<Grid
						container
						justifyContent="center"
						textAlign="left"
						rowSpacing={3}
						spacing={2}
					>
						{" "}
						<Grid item xs={10} md={10}>
							<TextField
								fullWidth
								inputRef={register}
								error={errors.mobileNumber ? true : false}
								label="Mobile Number"
								name="mobileNumber"
								id="mobileNumber"
								// defaultValue="Hello World"
								helperText={
									errors.mobileNumber ? errors.mobileNumber.message : null
								}
								variant="filled"
								startAdornment={
									<InputAdornment position="start">Hello</InputAdornment>
								}
							/>
						</Grid>
						<Grid item xs={10} md={10}>
							<TextField
								fullWidth
								inputRef={register}
								error={errors.address ? true : false}
								label="Address"
								name="address"
								id="address"
								// defaultValue="Hello World"
								helperText={errors.address ? errors.address.message : null}
								variant="filled"
							/>
						</Grid>
						<Grid item xs={10} md={10}>
							<TextField
								fullWidth
								inputRef={register}
								error={errors.city ? true : false}
								label="City"
								name="city"
								id="city"
								// defaultValue="Hello World"
								helperText={errors.city ? errors.city.message : null}
								variant="filled"
							/>
						</Grid>
						<Grid item xs={10} md={10}>
							<TextField
								fullWidth
								inputRef={register}
								error={errors.country ? true : false}
								label="Country"
								name="country"
								id="country"
								// defaultValue="Hello World"
								helperText={errors.country ? errors.country.message : null}
								variant="filled"
							/>
						</Grid>
						<Grid item xs={10} md={10}>
							<Button variant="contained" type="submit">
								Continue
							</Button>{" "}
						</Grid>
					</Grid>
				</form>
			</Box>
		</Box>
	);
};

export default ShippingScreen;
