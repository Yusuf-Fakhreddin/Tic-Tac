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

import { login } from "../actions/authActions";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LoginCartAnimation from "../components/Animations/LoginCartAnimation";
import { addItemsToBackendCart } from "../actions/cartActions.js";
const LoginScreen = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const redirect = location.search ? location.search.split("=")[1] : "/";
	const history = useHistory();
	const { t } = useTranslation();

	const userLogin = useSelector((state) => state.userLogin);
	const { loading, error, userInfo } = userLogin;

	const validationSchema = Yup.object({
		email: Yup.string().email("Invalid email format").required("Required"),
		password: Yup.string().required("Required"),
	});

	const { register, handleSubmit, errors } = useForm({
		mode: "onBlur",
		resolver: yupResolver(validationSchema),
	});

	const cart = useSelector((state) => state.cartState);
	const { cartItems } = cart;

	useEffect(() => {
		document.title = "Login";
		if (userInfo) {
			//  mutate adding LS items to backend
			dispatch(addItemsToBackendCart(cartItems));
			history.replace(redirect);
		}
	}, [userInfo, history, redirect]);

	const onSubmit = (data) => {
		let { email, password } = data;
		dispatch(login(email, password));
	};

	return (
		<Box
			mt={3}
			sx={{
				// border: "1.5px solid #e0e0e0",
				borderRadius: "5px",
				padding: "15px 0",
				width: "600",
				maxWidth: "100%",
				textAlign: "center",
				margin: "25px auto",
			}}
		>
			{loading && <CircularProgress />}
			{error && (
				<Stack sx={{ width: "100%" }} spacing={2}>
					<Alert severity="error">{error}</Alert>
				</Stack>
			)}
			<Grid
				container
				justifyContent="center"
				textAlign="left"
				rowSpacing={3}
				spacing={2}
			>
				{" "}
				<Grid item md={6}>
					<LoginCartAnimation />
				</Grid>
				<Grid item align="center" xs={11} md={6}>
					<Box marginY={3}>
						<form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
							<Grid
								container
								justifyContent="center"
								textAlign="left"
								rowSpacing={3}
								spacing={2}
							>
								<Grid item xs={11} md={10}>
									<Typography variant="h4" align="left" component="h1" mt={3}>
										{t("login")}
									</Typography>
								</Grid>
								<Grid item xs={11} md={10}>
									<TextField
										required
										fullWidth
										inputRef={register}
										error={errors.email ? true : false}
										label="Email"
										name="email"
										id="email"
										// defaultValue="Hello World"
										helperText={errors.email && errors.email.message}
										variant="filled"
									/>
								</Grid>
								<Grid item xs={11} md={10}>
									<TextField
										required
										name="password"
										inputRef={register}
										id="password"
										label="Password"
										variant="filled"
										fullWidth
										type="password"
										error={errors.password ? true : false}
										helperText={errors.password && errors.password.message}
									/>
								</Grid>
								<Grid item xs={11} md={10}>
									<Button variant="contained" type="submit">
										{t("login")}
									</Button>
								</Grid>
							</Grid>
						</form>
					</Box>
					<Divider />
					<Box marginY={3}>
						<Typography variant="h5">{t("doesn'tHaveAccount")}</Typography>
						<NavLink to={`/register` + location.search}>
							<Button sx={{ marginTop: "15px" }} variant="outlined">
								{t("register")}
							</Button>
						</NavLink>
					</Box>
				</Grid>
			</Grid>{" "}
		</Box>
	);
};

export default LoginScreen;
