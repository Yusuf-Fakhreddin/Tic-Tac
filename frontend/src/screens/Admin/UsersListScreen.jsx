import {
	Button,
	Grid,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableFooter,
	TableHead,
	TablePagination,
	TableRow,
	Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ClearTwoToneIcon from "@mui/icons-material/ClearTwoTone";
import { NavLink } from "react-router-dom";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { useDeleteUser, useListOfUsers } from "../../Queries/UserQueries";
import CheckIcon from "@mui/icons-material/Check";
import { useHistory } from "react-router";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TablePaginationActions from "../../components/TablePaginationActions";
import AdminNavigationBox from "../../components/Admin/AdminNavigationBox";
import CenteredCircularProgress from "../../components/CenteredCircularProgress";
import ConfirmationDialog from "../../components/Dialogs/ConfirmationDialog";
const UsersListScreen = () => {
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	const history = useHistory();

	const [pageNumber, setpageNumber] = useState(1);
	const [data, isLoadingUsers] = useListOfUsers(pageNumber, userInfo.token);
	const [deleteUser, isDeleteLoading] = useDeleteUser();
	useEffect(() => {
		if (!userInfo || !userInfo.isAdmin) {
			history.push("/");
		}
	}, [history, userInfo, data]);

	const DeleteUserHandler = async (id) => {
		await deleteUser({ id: id, token: userInfo.token, pageNumber });
	};

	// Avoid a layout jump when reaching the last page with empty rows.
	// const emptyRows = data.page > 0 ? Math.max(0, (1 + data.page) * 10 - data.count) : 0;

	const handleChangePage = (event, newPage) => {
		setpageNumber(newPage + 1);
	};

	return (
		<Grid container spacing={2}>
			<Grid item md={2}>
				<AdminNavigationBox />
			</Grid>
			<Grid item md={10}>
				{isLoadingUsers || !data.users ? (
					<CenteredCircularProgress />
				) : (
					<Box mt={3}>
						<Typography variant="h3">All Users</Typography>
						<TableContainer component={Paper}>
							<Table sx={{ minWidth: "100%" }} aria-label="simple table">
								<TableHead>
									<TableRow sx={{ backgroundColor: "lightGray" }}>
										<TableCell align="left">ID</TableCell>
										<TableCell align="center">Name</TableCell>
										<TableCell align="center">Email</TableCell>
										<TableCell align="center">Admin</TableCell>
										<TableCell align="center"></TableCell>
										<TableCell align="center"></TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{React.Children.toArray(
										data.users.map((row) => (
											<TableRow
												hover
												sx={{
													"&:last-child td, &:last-child th": { border: 0 },
												}}
											>
												<TableCell component="th" scope="row">
													{row._id}
												</TableCell>
												<TableCell align="center" component="th" scope="row">
													{row.name}
												</TableCell>
												<TableCell align="center">
													{" "}
													<a href={`mailto:${row.email}`}>{row.email}</a>
												</TableCell>

												<TableCell align="center">
													{row.isAdmin ? (
														<CheckIcon color="success" />
													) : (
														<ClearTwoToneIcon color="error" />
													)}
												</TableCell>
												<TableCell align="center">
													<NavLink to={`/admin/edituser/${row._id}`}>
														<Button color="info" variant="contained">
															{" "}
															<EditIcon />
														</Button>
													</NavLink>
												</TableCell>
												<TableCell align="center">
													<ConfirmationDialog
														buttonLabel={<DeleteIcon />}
														action={DeleteUserHandler}
														id={row._id}
													/>
												</TableCell>
											</TableRow>
										))
									)}
								</TableBody>
								<TableFooter>
									<TableRow>
										<TablePagination
											colSpan={5}
											count={data.count}
											page={data.page - 1}
											rowsPerPage={10}
											labelDisplayedRows={({ from, to, count }) => {
												return `Total Number of Users = ${count}`;
											}}
											labelRowsPerPage=""
											rowsPerPageOptions={[]}
											onPageChange={handleChangePage}
											ActionsComponent={TablePaginationActions}
										/>
									</TableRow>
								</TableFooter>
							</Table>
						</TableContainer>
					</Box>
				)}{" "}
			</Grid>
		</Grid>
	);
};

export default UsersListScreen;
