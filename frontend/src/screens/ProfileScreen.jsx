import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
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

const ProfileScreen = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

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
	useEffect(() => {
		if (!userInfo) {
			history.push("/login?redirectTo=profile");
		}
	}, [userInfo, history, dispatch]);

	const { register, handleSubmit, errors } = useForm({
		mode: "onBlur",
		resolver: yupResolver(validationSchema),
	});

	const onSubmit = (data) => {
		console.log(data);
		let { name, email, password } = data;
		dispatch(updateUserProfile({ name, email, password }));
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
			<Typography variant="h4" component="h1" mt={3}>
				Update Your Profile{" "}
			</Typography>
			<Box marginY={3}>
				<form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmit)}>
					<Grid container justifyContent="center" rowSpacing={3} spacing={2}>
						<Grid item xs={10} md={10}>
							<TextField
								fullWidth
								inputRef={register}
								error={errors.name ? true : false}
								label="Full Name"
								name="name"
								id="name"
								defaultValue={userInfo ? userInfo.name : null}
								helperText={errors.name ? errors.name.message : null}
								variant="standard"
							/>
						</Grid>
						<Grid item xs={10} md={10}>
							<TextField
								fullWidth
								inputRef={register}
								error={errors.email ? true : false}
								label="Email"
								name="email"
								id="email"
								defaultValue={userInfo ? userInfo.email : null}
								helperText={errors.email ? errors.email.message : null}
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
								helperText={errors.password ? errors.password.message : ""}
							/>
						</Grid>
						<Grid item xs={10} md={10}>
							<TextField
								name="confirmPassword"
								inputRef={register}
								id="confirmPassword"
								label="Confirm Password"
								variant="standard"
								fullWidth
								type="password"
								error={errors.confirmPassword ? true : false}
								helperText={
									errors.confirmPassword ? errors.confirmPassword.message : ""
								}
							/>
						</Grid>
						<Grid item xs={10} md={10}>
							<Button variant="contained" type="submit">
								Update
							</Button>
						</Grid>
					</Grid>
				</form>
			</Box>
		</Box>
	);
};

export default ProfileScreen;
