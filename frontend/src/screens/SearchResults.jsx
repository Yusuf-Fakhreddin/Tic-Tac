import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import CenteredCircularProgress from "../components/CenteredCircularProgress";
import { useListOfProducts } from "../Queries/ProductsQueries";
import { Grid, Pagination, PaginationItem, Typography } from "@mui/material";
import ProductCard from "../components/Product/ProductCard";
import { useTranslation } from "react-i18next";

const SearchResults = () => {
	const { t } = useTranslation();

	const { keyword, pageNumber } = useParams();
	const [data, isLoading, fetchPrdoucts, isFetching] = useListOfProducts(
		keyword,
		pageNumber
	);
	useEffect(() => {
		fetchPrdoucts();
	}, [keyword, pageNumber]);

	if (!data) return <CenteredCircularProgress />;
	else if (keyword && data && data.products.length === 0)
		return (
			<Typography variant="h3" marginY="10px">
				{t("noResults")}
				{keyword}
			</Typography>
		);
	return (
		<>
			<Typography variant="h3" marginY="10px">
				{t("searchResults")}
				{keyword}{" "}
			</Typography>
			<Grid container rowSpacing={2} spacing={2} justifyContent="center">
				{data &&
					React.Children.toArray(
						data.products.map((product) => (
							<Grid item xs={10} sm="auto">
								{" "}
								<ProductCard product={product} />
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

export default SearchResults;
