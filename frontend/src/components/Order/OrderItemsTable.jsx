import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import React from "react";
import ProductTableImage from "../Product/ProductTableImage";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const OrderItemsTable = ({ orderItems }) => {
	const { t } = useTranslation();
	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: "100%" }} aria-label="simple table">
				<TableHead>
					<TableRow sx={{ backgroundColor: "primary.dark" }}>
						<TableCell sx={{ color: "white" }} align="center">
							{t("productImage")}
						</TableCell>
						<TableCell sx={{ color: "white" }} align="center">
							{t("productName")}
						</TableCell>
						<TableCell sx={{ color: "white" }} align="center">
							{t("price(egp)")}
						</TableCell>
						<TableCell sx={{ color: "white" }} align="center">
							{t("quantity")}
						</TableCell>
						<TableCell sx={{ color: "white" }} align="center">
							{t("totalPrice")}
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{React.Children.toArray(
						orderItems.map((row) => (
							<TableRow
								hover
								sx={{
									"&:last-child td, &:last-child th": { border: 0 },
								}}
							>
								<TableCell
									sx={{ maxHeight: "50px", maxWidth: "50px" }}
									component="th"
									scope="row"
								>
									<ProductTableImage productImage={row.product.images[0]} />
								</TableCell>
								<TableCell align="center" component="th" scope="row">
									<NavLink to={`/product/${row.product.productId}`}>
										{row.product.name}
									</NavLink>
								</TableCell>
								<TableCell align="center">{row.product.price}</TableCell>
								<TableCell align="center">{row.qty}</TableCell>
								<TableCell align="center">
									{row.product.price * row.qty}
								</TableCell>
							</TableRow>
						))
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default OrderItemsTable;
