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

const LoginScreen = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const redirect = location.search ? location.search.split("=")[1] : "/";

	const history = useHistory();
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
	useEffect(() => {
		document.title = "Login";
		if (userInfo) {
			history.push(redirect);
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
				border: "1.5px solid #e0e0e0",
				borderRadius: "5px",
				padding: "15px",
				maxWidth: "60%",
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
			<Box marginY={3}>
				<form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
					<Grid container justifyContent="center" rowSpacing={3} spacing={2}>
						<Grid item xs={10} md={10}>
							<TextField
								fullWidth
								inputRef={register}
								error={errors.email ? true : false}
								label="Email"
								name="email"
								id="email"
								// defaultValue="Hello World"
								helperText={errors.email && errors.email.message}
								variant="standard"
							/>
						</Grid>
						<Grid item xs={10} md={10}>
							<TextField
								name="password"
								inputRef={register}
								id="password"
								label="Password"
								variant="standard"
								fullWidth
								type="password"
								error={errors.password ? true : false}
								helperText={errors.password && errors.password.message}
							/>
						</Grid>
						<Grid item xs={10} md={10}>
							<Button variant="contained" type="submit">
								Login
							</Button>
						</Grid>
					</Grid>
				</form>
			</Box>
			<Divider />
			<Box marginY={3}>
				<Typography variant="h5">Does not have an account ?</Typography>
				<NavLink to={`/register` + location.search}>
					<Button sx={{ marginTop: "15px" }} variant="outlined">
						Register
					</Button>
				</NavLink>
			</Box>
		</Box>
	);
};

export default LoginScreen;
