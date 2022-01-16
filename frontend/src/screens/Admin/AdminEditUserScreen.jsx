import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";

import {
	Alert,
	Button,
	Checkbox,
	CircularProgress,
	FormControlLabel,
	Grid,
	Stack,
	TextField,
	Typography,
} from "@mui/material";

import { Box } from "@mui/system";
import {
	useAdminUpdateUser,
	useListUserDetailsById,
} from "../../Queries/UserQueries";

const AdminEditUserScreen = () => {
	const history = useHistory();
	const { id } = useParams();
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	const [user, userDetailsLoading, userDetailsSuccess] = useListUserDetailsById(
		id,
		userInfo.token
	);

	const validationSchema = Yup.object({
		name: Yup.string()
			.required("Required")
			.matches(/^[^\s]+( [^\s]+)+$/, "Please enter a proper fullname"),
		email: Yup.string().email("Invalid email format").required("Required"),
	});

	const { register, handleSubmit, errors, setValue, control } = useForm({
		mode: "onBlur",
		resolver: yupResolver(validationSchema),
	});
	const [AdminEditUser, adminEditLoading, editSuccess, editIsError, editError] =
		useAdminUpdateUser();
	const onSubmit = async (data) => {
		await AdminEditUser({ id, user: data, token: userInfo.token });
	};

	const [admin, setadmin] = useState(false);
	useEffect(() => {
		if (editSuccess) {
			history.push("/admin/users");
		} else if (user) {
			if (user.name && user._id === id) {
				setValue("name", user.name);
				setValue("email", user.email);
				setadmin(user.isAdmin);
			}
		}
	}, [userInfo, history, id, editSuccess, userDetailsSuccess]);

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
				// textAlign: "center",
				margin: "25px auto",
			}}
		>
			{adminEditLoading && <CircularProgress />}
			{editIsError && (
				<Stack sx={{ width: "100%" }} spacing={2}>
					<Alert severity="error">{editError.message}</Alert>
				</Stack>
			)}
			{editSuccess && (
				<Stack sx={{ width: "100%" }} spacing={2}>
					<Alert severity="success">
						Your profile information was successfuly updated
					</Alert>
				</Stack>
			)}
			<Typography variant="h4" component="h1" mt={3}>
				Edit User{" "}
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
								helperText={errors.name ? errors.name.message : null}
								variant="filled"
								defaultValue="Full Name"
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
								placeholder="Email"
								defaultValue="Email"
								helperText={errors.email ? errors.email.message : null}
								variant="filled"
							/>
						</Grid>
						<Grid item xs={10} key={10}>
							<FormControlLabel
								value={true}
								control={<Checkbox />}
								label="Admin?"
								name="isAdmin"
								inputRef={register}
								checked={admin}
								onChange={() => setadmin(!admin)}
								defaultValue={admin}
							/>
						</Grid>

						<Grid item xs={10} md={10} align="center">
							<Button variant="contained" type="submit">
								Edit
							</Button>
						</Grid>
					</Grid>
				</form>
			</Box>
		</Box>
	);
};

export default AdminEditUserScreen;
