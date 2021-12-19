import React from "react";
import {
	Button,
	ButtonGroup,
	Divider,
	List,
	ListItem,
	ListItemText,
	Rating,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmationDialog from "../Dialogs/ConfirmationDialog";
import FormDialog from "../Dialogs/FormDialog";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useDeleteReview, useUpdateReview } from "../../Queries/ReviewsQueries";

const DisplayReviewBox = ({ review, manage }) => {
	const { id } = useParams();
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const [deleteReview, isDeleteLoading] = useDeleteReview();
	const [updateReview, isUpdateLoading] = useUpdateReview();

	const DeleteReviewHandler = async (reviewId) => {
		await deleteReview({ productId: id, reviewId, token: userInfo.token });
	};
	const UpdateReviewHandler = async (reviewId, review) => {
		console.log(id, reviewId);
		await updateReview({
			productId: id,
			reviewId,
			review,
			token: userInfo.token,
		});
	};

	return (
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
							{review.updatedAt.substring(0, 10)}
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
							value={review.rating}
						/>{" "}
						<Typography variant="body1">{review.comment}</Typography>
					</ListItemText>
				</ListItem>
				{/* Put Section List Item for buttons delete and edit if admin or review owner */}
				{manage && (
					<>
						{" "}
						<Divider />
						<ListItem>
							<ButtonGroup
								variant="outlined"
								aria-label="outlined button group"
							>
								<ConfirmationDialog
									buttonLabel={<DeleteIcon />}
									action={DeleteReviewHandler}
									id={review._id}
								/>
								<FormDialog
									buttonLabel={<EditIcon />}
									action={UpdateReviewHandler}
									id={review._id}
									initialValues={{
										comment: review.comment,
										rating: review.rating,
									}}
								/>
							</ButtonGroup>
						</ListItem>
					</>
				)}
			</List>
		</Box>
	);
};

export default DisplayReviewBox;
