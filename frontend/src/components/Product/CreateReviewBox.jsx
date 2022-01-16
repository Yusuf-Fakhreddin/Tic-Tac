import { Typography } from "@mui/material";
import React from "react";
import { Box } from "@mui/system";
import { useCreateReview } from "../../Queries/ReviewsQueries";
import { useTranslation } from "react-i18next";
import ReviewForm from "./ReviewForm";

const CreateReviewBox = ({ productId, token }) => {
	const { t } = useTranslation();

	const [createReview, createReviewLoading] = useCreateReview();
	const onSubmit = (data) => {
		createReview({
			productId,
			review: { ...data },
			token,
		});
	};

	return (
		<Box
			sx={{
				border: "1.5px solid #e0e0e0",
				borderRadius: "5px",
				padding: "15px",
				// marginTop: "15px",
			}}
		>
			<Typography variant="h5" textTransform>
				{t("REVIEWTHISPRODUCT")}
			</Typography>
			<ReviewForm onSubmit={onSubmit} isSubmitLoading={createReviewLoading} />
		</Box>
	);
};

export default CreateReviewBox;
