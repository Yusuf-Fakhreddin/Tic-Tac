import {
	Alert,
	Button,
	CircularProgress,
	Divider,
	Grid,
	Stack,
	TextField,
	Typography,
} from "@mui/material";

import { Box } from "@mui/system";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { register as signUp } from "../actions/authActions";
import { NavLink, useLocation, useHistory } from "react-router-dom";
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
		postalCode: Yup.string().required("Required"),
		country: Yup.string().required("Required"),
	});

	const { register, handleSubmit, errors } = useForm({
		mode: "onBlur",
		resolver: yupResolver(validationSchema),
		defaultValues: {
			address: shippingAddress.address ? shippingAddress.address : "",
			city: shippingAddress.city ? shippingAddress.city : "",
			postalCode: shippingAddress.postalCode ? shippingAddress.postalCode : "",
			country: shippingAddress.country ? shippingAddress.country : "",
		},
	});

	useEffect(() => {
		document.title = "Shipping";
		if (!userInfo) history.push("/login?redirect=shipping");
	}, [userInfo, history]);

	const onSubmit = (data) => {
		console.log(data);
		let { address, city, postalCode, country } = data;
		dispatch(saveShippingAddress({ address, city, postalCode, country }));
		history.push("/payment");
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
								error={errors.postalCode ? true : false}
								label="Postal Code"
								name="postalCode"
								id="postalCode"
								// defaultValue="Hello World"
								helperText={
									errors.postalCode ? errors.postalCode.message : null
								}
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
