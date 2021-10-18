import React, { useEffect } from "react";
import {
	CircularProgress,
	Grid,
	Pagination,
	PaginationItem,
	Typography,
} from "@mui/material";
import Product from "../components/Product";
import { useListOfProducts } from "../Queries/ProductsQueries";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";

const HomeScreen = () => {
	const { keyword, pageNumber } = useParams();
	const [data, isLoading, fetchPrdoucts, isFetching] = useListOfProducts(
		keyword,
		pageNumber
	);
	console.log(data);
	useEffect(() => {
		document.title = "Caribbean";

		console.log(keyword ? true : false, pageNumber);
		fetchPrdoucts();
	}, [keyword, pageNumber]);

	if (isLoading || isFetching)
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
			<>
				{keyword && data && data.products.length === 0 && (
					<Typography variant="h3" marginY="10px">
						Sorry no results for {keyword}
					</Typography>
				)}
				<Typography variant="h3" marginY="10px">
					Latest Products
				</Typography>
				<Grid container rowSpacing={2} spacing={2} justifyContent="center">
					{data &&
						React.Children.toArray(
							data.products.map((product) => (
								<Grid item xs={10} sm="auto">
									{" "}
									<Product product={product} />
								</Grid>
							))
						)}
					<Grid item xs={10}>
						{keyword && data && data.pages > 1 && (
							<Pagination
								count={data.pages}
								page={data.page}
								renderItem={(item) => (
									<PaginationItem
										component={NavLink}
										to={`/search/${keyword}/${item.page}`}
										{...item}
										shape="rounded"
									/>
								)}
							/>
						)}
					</Grid>
				</Grid>
			</>
		);
};

export default HomeScreen;
