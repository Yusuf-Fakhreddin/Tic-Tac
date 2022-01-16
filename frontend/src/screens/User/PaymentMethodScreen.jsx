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
import { savePaymentMethod } from "../../actions/cartActions";
import CheckoutSteps from "../../components/Order/CheckoutSteps";
import PaymentAnimation from "../../components/Animations/PaymentAnimation";
import ReactHookFormRadio from "../../components/Form/ReactHookFormRadio";

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
			paymentMethod: paymentMethod ? paymentMethod : "Credit/Debit Card",
		},
	});
	let values = getValues();
	useEffect(() => {
		document.title = "Payment Method";
		if (!userInfo) history.push("/login?redirect=paymentmethod");
	}, [userInfo, history, values.paymentMethod]);

	const onSubmit = (data) => {
		let { paymentMethod } = data;
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
						<Grid item xs={10} md={6}>
							<ReactHookFormRadio
								initialValue={
									paymentMethod ? paymentMethod : "Credit/Debit Card"
								}
								error={errors.paymentMethod}
								name="paymentMethod"
								control={control}
								radioLabel="Select a method"
								options={["Credit/Debit Card", "Cash On Delivery"]}
							/>
							<Button
								variant="contained"
								type="submit"
								sx={{ display: "block" }}
							>
								Continue
							</Button>{" "}
						</Grid>
						<Grid item display={{ xs: "none", lg: "block" }} md={6}>
							<PaymentAnimation />
						</Grid>
					</Grid>
				</form>
			</Box>
		</Box>
	);
};

export default PaymentMethodScreen;
