import {
	Button,
	CircularProgress,
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
	Grid,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

import TablePaginationActions from "../../components/TablePaginationActions";
import ClearTwoToneIcon from "@mui/icons-material/ClearTwoTone";
import AdminNavigationBox from "../../components/Admin/AdminNavigationBox";

import { useListOfOrders } from "../../Queries/OrderQueries";
const OrdersListScreen = () => {
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	const history = useHistory();

	const [pageNumber, setpageNumber] = useState(1);
	const [data, isLoadingOrders] = useListOfOrders(userInfo.token, pageNumber);
	useEffect(() => {
		if (!userInfo || !userInfo.isAdmin) {
			history.push("/");
		}
		if (data) console.log(data);
	}, [history, userInfo, data]);

	// const DeleteProductHandler = async (id) => {
	// 	console.log(id);
	// 	await deleteProduct({ id: id, token: userInfo.token, pageNumber });
	// };

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
				{isLoadingOrders ? (
					<div className="flex">
						<CircularProgress
							size="3.2em"
							sx={{
								margin: "15px auto",
							}}
						/>
					</div>
				) : (
					<Box mt={3}>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
							}}
						>
							<Typography variant="h3" sx={{ display: "inline" }}>
								All Orders
							</Typography>

							<NavLink to="/createproduct">
								<Button variant="outlined">Create Product</Button>
							</NavLink>
						</Box>
						<TableContainer component={Paper}>
							<Table sx={{ minWidth: "100%" }} aria-label="simple table">
								<TableHead>
									<TableRow sx={{ backgroundColor: "lightGray" }}>
										<TableCell align="left">ID</TableCell>
										<TableCell align="center">USER</TableCell>
										<TableCell align="center">DATE</TableCell>
										<TableCell align="center">TOTAL (EGP)</TableCell>
										<TableCell align="center">PAID</TableCell>
										<TableCell align="center">SHIPPED</TableCell>
										<TableCell align="center">DELIVERED</TableCell>
										<TableCell align="center"></TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{data &&
										data.orders &&
										React.Children.toArray(
											data.orders.map((row) => (
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
														{row.user && row.user.name}
													</TableCell>
													<TableCell align="center" component="th" scope="row">
														{row.createdAt.substring(0, 10)}{" "}
													</TableCell>
													<TableCell align="center" component="th" scope="row">
														{row.totalPrice}{" "}
													</TableCell>

													<TableCell align="center">
														{row.isPaid ? (
															row.paidAt.substring(0, 10)
														) : (
															<ClearTwoToneIcon color="error" />
														)}
													</TableCell>
													<TableCell align="center">
														{row.isShipped ? (
															row.isShipped.substring(0, 10)
														) : (
															<ClearTwoToneIcon color="error" />
														)}
													</TableCell>
													<TableCell align="center">
														{row.isDelivered ? (
															row.deliveredAt.substring(0, 10)
														) : (
															<ClearTwoToneIcon color="error" />
														)}
													</TableCell>
													<TableCell align="center">
														<NavLink to={`/order/${row._id}`}>
															<Button variant="contained">DETAILS</Button>
														</NavLink>
													</TableCell>
												</TableRow>
											))
										)}
								</TableBody>
								{data && data.orders && (
									<TableFooter>
										<TableRow>
											<TablePagination
												colSpan={5}
												count={data.count}
												page={data.page - 1}
												rowsPerPage={10}
												labelDisplayedRows={({ from, to, count }) => {
													return `Total Number of Orders = ${count}`;
												}}
												labelRowsPerPage=""
												rowsPerPageOptions={[]}
												onPageChange={handleChangePage}
												ActionsComponent={TablePaginationActions}
											/>
										</TableRow>
									</TableFooter>
								)}
							</Table>
						</TableContainer>
					</Box>
				)}
			</Grid>
		</Grid>
	);
};

export default OrdersListScreen;
