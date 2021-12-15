import { Alert, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useDeleteReview } from "../../Queries/ReviewsQueries";
import DisplayReviewBox from "./DisplayReviewBox";

const ProductListReviews = ({ reviews }) => {
	const { t } = useTranslation();
	const { id } = useParams();
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const [deleteReview, isDeleteLoading] = useDeleteReview();

	const DeleteReviewHandler = async (reviewId) => {
		console.log(id, reviewId);
		await deleteReview({ productId: id, reviewId, token: userInfo.token });
	};

	return (
		<div>
			<Typography variant="h5">{t("CUSTOMERREVIEWS")}</Typography>

			{reviews.length === 0 && <Alert severity="info">{t("noReviews")}</Alert>}

			{React.Children.toArray(
				reviews.map((review) => (
					<DisplayReviewBox
						reviewer={review.name}
						time={review.updatedAt.substring(0, 10)}
						rating={review.rating}
						comment={review.comment}
						manage={userInfo && userInfo._id === review.user ? true : false}
						reviewId={review._id}
						DeleteReviewHandler={DeleteReviewHandler}
					/>
				))
			)}
		</div>
	);
};

export default ProductListReviews;
