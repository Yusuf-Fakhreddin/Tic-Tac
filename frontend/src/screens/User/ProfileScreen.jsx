import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
	Alert,
	Button,
	CircularProgress,
	Grid,
	Stack,
	TextField,
	Typography,
} from "@mui/material";

import { Box } from "@mui/system";
import { useUpdateUserProfile } from "../../Queries/UserQueries";
import ProfileAnimation from "../../components/Animations/ProfileAnimation";

const ProfileScreen = () => {
	const dispatch = useDispatch();
	const history = useHistory();

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
		document.title = userInfo.name;
	}, [userInfo, history, dispatch]);

	const { register, handleSubmit, errors } = useForm({
		mode: "onBlur",
		resolver: yupResolver(validationSchema),
	});
	const [
		updateUserProfile,
		updateLoading,
		updateSuccess,
		updateIsError,
		updateError,
	] = useUpdateUserProfile();
	const onSubmit = async (data) => {
		console.log(data);
		// let { name, email, password } = data;
		// dispatch(updateUserProfile({ name, email, password }));
		await updateUserProfile({ user: data, token: userInfo.token });
	};
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
			{updateLoading && <CircularProgress />}
			{updateIsError && (
				<Stack sx={{ width: "100%" }} spacing={2}>
					<Alert severity="error">{updateError.message}</Alert>
				</Stack>
			)}
			{updateSuccess && (
				<Stack sx={{ width: "100%" }} spacing={2}>
					<Alert severity="success">
						Your profile information was successfuly updated
					</Alert>
				</Stack>
			)}
			<ProfileAnimation />
			<Box marginY={3}>
				<form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmit)}>
					<Grid container justifyContent="center" rowSpacing={3} spacing={2}>
						<Grid item xs={11} md={10}>
							<Typography variant="h4" align="left" component="h1" mt={3}>
								Update Your Profile{" "}
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
								defaultValue={userInfo ? userInfo.name : null}
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
								defaultValue={userInfo ? userInfo.email : null}
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
									errors.confirmPassword ? errors.confirmPassword.message : ""
								}
							/>
						</Grid>
						<Grid item xs={11} md={10}>
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
