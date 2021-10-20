import { Button, Grid, Typography } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from "react-router-dom";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import StripeCard from "../components/StripeCard";

const PaymentMethodScreen = () => {
	const dispatch = useDispatch();

	const history = useHistory();
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const cart = useSelector((state) => state.cartState);
	const { shippingAddress, paymentMethod } = cart;

	if (!shippingAddress) {
		history.push("/shipping");
	}

	const validationSchema = Yup.object({
		paymentMethod: Yup.string().required("Required"),
	});

	const { register, handleSubmit, errors, control, getValues } = useForm({
		mode: "onBlur",
		resolver: yupResolver(validationSchema),
		defaultValues: {
			// address: shippingAddress.address ? shippingAddress.address : "",
			paymentMethod: paymentMethod ? paymentMethod : "card",
		},
	});
	let values = getValues();
	useEffect(() => {
		document.title = "Payment Method";
		if (!userInfo) history.push("/login?redirect=paymentmethod");
		console.log(values.paymentMethod);
	}, [userInfo, history, values.paymentMethod]);

	const onSubmit = (data) => {
		console.log(data);
		let { paymentMethod } = data;
		// console.log(paymentMethod);
		dispatch(savePaymentMethod(paymentMethod));
		history.push("/placeorder");
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
				<CheckoutSteps Payment />
				<Typography variant="h4" component="h1" marginY={2}>
					Payment Method
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
							<Controller
								control={control}
								name="paymentMethod"
								as={
									<FormControl
										// sx={{ m: 3 }}
										component="fieldset"
										error={errors.paymentMethod ? true : false}
										variant="standard"
									>
										<FormLabel component="legend">Select a Method</FormLabel>
										<RadioGroup
											defaultValue={paymentMethod ? paymentMethod : "card"}
										>
											<FormControlLabel
												value="Credit/Debit Card"
												control={<Radio />}
												label="Credit/Debit Card"
											/>
											<FormControlLabel
												value="Cash On Delivery"
												control={<Radio />}
												label="Cash On Delivery"
											/>
										</RadioGroup>
										<FormHelperText>
											{errors.paymentMethod ? errors.paymentMethod.message : ""}
										</FormHelperText>
									</FormControl>
								}
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

export default PaymentMethodScreen;
