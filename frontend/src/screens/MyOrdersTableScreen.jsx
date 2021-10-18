import {
	Button,
	CircularProgress,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import React from "react";
import ClearTwoToneIcon from "@mui/icons-material/ClearTwoTone";
import { NavLink } from "react-router-dom";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { useListOfUserOrders } from "../Queries/OrderQueries";
const MyOrdersTable = () => {
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	const [orders, isLoadingMyOrders] = useListOfUserOrders(userInfo.token);

	if (isLoadingMyOrders)
		return (
			<div className="flex">
				<CircularProgress
					size="3.2em"
					sx={{
						margin: "15px auto",
					}}
				/>
			</div>
		);
	else
		return (
			<Box mt={3}>
				<Typography variant="h3">Your Orders</Typography>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: "100%" }} aria-label="simple table">
						<TableHead>
							<TableRow sx={{ backgroundColor: "lightGray" }}>
								<TableCell align="left">ID</TableCell>
								<TableCell align="center">Date Ordered</TableCell>
								<TableCell align="center">Total Price (EGP)</TableCell>
								<TableCell align="center">Paid</TableCell>
								<TableCell align="center">Delivered</TableCell>
								<TableCell align="center"></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{orders &&
								React.Children.toArray(
									orders.map((row) => (
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
												{row.createdAt.substring(0, 10)}
											</TableCell>
											<TableCell align="center">{row.totalPrice}</TableCell>
											<TableCell align="center">
												{row.isPaid ? (
													row.paidAt.substring(0, 10)
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
													<Button variant="contained">Details</Button>
												</NavLink>
											</TableCell>
										</TableRow>
									))
								)}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
		);
};

export default MyOrdersTable;
