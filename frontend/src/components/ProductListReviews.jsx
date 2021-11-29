import {
	Alert,
	Divider,
	List,
	ListItem,
	ListItemText,
	Rating,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useTranslation } from "react-i18next";

const ProductListReviews = ({ reviews }) => {
	const { t } = useTranslation();

	return (
		<div>
			<Typography variant="h5">{t("CUSTOMERREVIEWS")}</Typography>

			{reviews.length === 0 && <Alert severity="info">{t("noReviews")}</Alert>}

			{React.Children.toArray(
				reviews.map((review) => (
					<Box
						sx={{
							border: "1.5px solid #e0e0e0",
							borderRadius: "5px",
							marginTop: "15px",
						}}
					>
						<List>
							<ListItem
								sx={{
									marginY: 0,
									paddingY: 0,
								}}
							>
								<ListItemText>
									<Typography variant="subtitle2">{review.name}</Typography>
									<Typography variant="caption">
										{review.createdAt.substring(0, 10)}
									</Typography>
								</ListItemText>
							</ListItem>

							<Divider />
							<ListItem>
								<ListItemText>
									{" "}
									<Rating
										size="small"
										precision={0.5}
										readOnly
										defaultValue={review.rating}
									/>{" "}
									<Typography variant="body1">{review.comment}</Typography>
								</ListItemText>
							</ListItem>
						</List>
					</Box>
				))
			)}
		</div>
	);
};

export default ProductListReviews;
