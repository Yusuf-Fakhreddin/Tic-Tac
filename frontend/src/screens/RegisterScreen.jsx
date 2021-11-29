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
import { useTranslation } from "react-i18next";
import RegisterUserAnimation from "../components/Animations/RegisterUserAnimation";

const RegisterScreen = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const redirect = location.search ? location.search.split("=")[1] : "/";

	const { t } = useTranslation();

	const history = useHistory();
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userRegister = useSelector((state) => state.userRegister);
	const { loading, error } = userRegister;

	const validationSchema = Yup.object({
		name: Yup.string()
			.required("Required")
			.matches(/^[^\s]+( [^\s]+)+$/, "Please enter a proper fullname"),
		email: Yup.string().email("Invalid email format").required("Required"),
		password: Yup.string().required("Required"),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref("password"), ""], "Passwords must match")
			.required("Required"),
	});

	const { register, handleSubmit, errors } = useForm({
		mode: "onBlur",
		resolver: yupResolver(validationSchema),
	});

	useEffect(() => {
		document.title = "Sign Up";
		if (userInfo) {
			history.replace(redirect);
		}
	}, [userInfo, history, redirect]);

	const onSubmit = (data) => {
		console.log(data);
		let { name, email, password } = data;
		dispatch(signUp(name, email, password));
	};

	return (
		<Box
			mt={3}
			sx={{
				borderRadius: "5px",
				padding: "15px 0",
				width: "600",
				maxWidth: "100%",
				textAlign: "left",
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
				<Grid item align="center" xs={11} md={6}>
					<Box marginY={3}>
						<form
							autoComplete="off"
							noValidate
							onSubmit={handleSubmit(onSubmit)}
						>
							<Grid
								container
								justifyContent="center"
								textAlign="center"
								rowSpacing={3}
								spacing={2}
							>
								<Grid item xs={11} md={10}>
									<Typography align="left" variant="h4" component="h1" mt={3}>
										{t("register")}
									</Typography>
								</Grid>
								<Grid item xs={11} md={10}>
									<TextField
										fullWidth
										inputRef={register}
										error={errors.name ? true : false}
										label="Full Name"
										name="name"
										id="name"
										// defaultValue="Hello World"
										helperText={errors.name ? errors.name.message : null}
										variant="filled"
									/>
								</Grid>
								<Grid item xs={11} md={10}>
									<TextField
										fullWidth
										inputRef={register}
										error={errors.email ? true : false}
										label="Email"
										name="email"
										id="email"
										// defaultValue="Hello World"
										helperText={errors.email ? errors.email.message : null}
										variant="filled"
									/>
								</Grid>
								<Grid item xs={11} md={10}>
									<TextField
										name="password"
										inputRef={register}
										id="password"
										label="Password"
										variant="filled"
										fullWidth
										type="password"
										error={errors.password ? true : false}
										helperText={errors.password ? errors.password.message : ""}
									/>
								</Grid>
								<Grid item xs={11} md={10}>
									<TextField
										name="confirmPassword"
										inputRef={register}
										id="confirmPassword"
										label="Confirm Password"
										variant="filled"
										fullWidth
										type="password"
										error={errors.confirmPassword ? true : false}
										helperText={
											errors.confirmPassword
												? errors.confirmPassword.message
												: ""
										}
									/>
								</Grid>
								<Grid item xs={11} md={10}>
									<Button variant="contained" type="submit">
										{t("register")}
									</Button>
								</Grid>
							</Grid>
						</form>
					</Box>
					<Divider />
					<Box marginY={3}>
						<Typography variant="h5">{t("alreadyHaveAccount")}</Typography>
						<NavLink to="/login">
							<Button sx={{ marginTop: "15px" }} variant="outlined">
								{t("login")}
							</Button>
						</NavLink>
					</Box>{" "}
				</Grid>
				<Grid item md={6}>
					<RegisterUserAnimation />
				</Grid>
			</Grid>{" "}
		</Box>
	);
};

export default RegisterScreen;
