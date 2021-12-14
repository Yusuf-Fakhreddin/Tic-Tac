import { Alert, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import DisplayReviewBox from "./DisplayReviewBox";

const ProductListReviews = ({ reviews }) => {
	const { t } = useTranslation();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	return (
		<div>
			<Typography variant="h5">{t("CUSTOMERREVIEWS")}</Typography>

			{reviews.length === 0 && <Alert severity="info">{t("noReviews")}</Alert>}

			{React.Children.toArray(
				reviews.map((review) => (
					<DisplayReviewBox
						reviewer={review.name}
						time={review.createdAt.substring(0, 10)}
						rating={review.rating}
						comment={review.comment}
						manage={userInfo && userInfo._id === review.user ? true : false}
					/>
				))
			)}
		</div>
	);
};

export default ProductListReviews;
