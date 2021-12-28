import {
	Button,
	CircularProgress,
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
import { Box } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import {
	useDeleteProduct,
	useListOfProducts,
} from "../../Queries/ProductsQueries";
import TablePaginationActions from "../../components/TablePaginationActions";
import ProductTableImage from "../../components/Product/ProductTableImage";
import AdminNavigationBox from "../../components/Admin/AdminNavigationBox";
import ConfirmationDialog from "../../components/Dialogs/ConfirmationDialog";

const ProductListScreen = () => {
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	const history = useHistory();

	const [pageNumber, setpageNumber] = useState(1);
	const [data, isLoadingProducts] = useListOfProducts("", pageNumber);
	const [deleteProduct, isDeleteLoading] = useDeleteProduct();
	useEffect(() => {
		document.title = "All Products";

		if (!userInfo || !userInfo.isAdmin) {
			history.push("/");
		}
	}, [history, userInfo]);

	const DeleteProductHandler = async (id) => {
		console.log(id);
		await deleteProduct({ id: id, token: userInfo.token, pageNumber });
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
				{isLoadingProducts || !data.products ? (
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
								All Products
							</Typography>

							<NavLink to="/createproduct">
								<Button variant="contained">Create Product</Button>
							</NavLink>
						</Box>
						<TableContainer component={Paper}>
							<Table sx={{ minWidth: "100%" }} aria-label="simple table">
								<TableHead>
									<TableRow sx={{ backgroundColor: "lightGray" }}>
										<TableCell align="left">ID</TableCell>
										<TableCell align="left">ProductImage</TableCell>
										<TableCell align="center">NAME</TableCell>
										<TableCell align="center">PRICE</TableCell>
										<TableCell align="center">CATEGORY</TableCell>
										<TableCell align="center">BRAND</TableCell>
										<TableCell align="center"></TableCell>
										<TableCell align="center"></TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{React.Children.toArray(
										data.products.map((row) => (
											<TableRow
												hover
												sx={{
													"&:last-child td, &:last-child th": { border: 0 },
												}}
											>
												{" "}
												<TableCell
													sx={{ maxHeight: "50px", maxWidth: "50px" }}
													component="th"
													scope="row"
												>
													<Zoom>
														<ProductTableImage productImage={row.images[0]} />{" "}
													</Zoom>
												</TableCell>
												<TableCell component="th" scope="row">
													<NavLink to={`/product/${row._id}`}>
														{row._id}
													</NavLink>
												</TableCell>
												<TableCell align="center" component="th" scope="row">
													<NavLink to={`/product/${row._id}`}>
														{row.name}
													</NavLink>
												</TableCell>
												<TableCell align="center" component="th" scope="row">
													{row.price}
												</TableCell>
												<TableCell align="center" component="th" scope="row">
													{row.price}
												</TableCell>
												<TableCell align="center">
													<NavLink to={`/admin/editproduct/${row._id}`}>
														<Button color="info" variant="contained">
															{" "}
															<EditIcon />
														</Button>
													</NavLink>
												</TableCell>
												<TableCell align="center">
													<ConfirmationDialog
														buttonLabel={<DeleteIcon />}
														action={DeleteProductHandler}
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
												return `Total Number of Products = ${count}`;
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
				)}
			</Grid>
		</Grid>
	);
};

export default ProductListScreen;
