import { Button, Rating, TextField, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { Box } from "@mui/system";
import { useCreateReview } from "../Queries/ProductsQueries";

const labels = {
	1: "Poor",
	2: "Fair",
	3: "Good",
	4: "Very Good",
	5: "Excellent",
};
const CreateReviewBox = ({ productId, token }) => {
	const [ratingValue, setRatingValue] = React.useState(1);
	const [hover, setHover] = React.useState(-1);

	const { register, handleSubmit, errors } = useForm({
		mode: "onBlur",
	});
	const [createReview, createReviewLoading] = useCreateReview();
	const onSubmit = (data) => {
		console.log(data);
		createReview({
			productId,
			review: { ...data, rating: ratingValue },
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
			<Typography variant="h5">REVIEW THIS PRODUCT</Typography>
			<form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
				<Box
					sx={{
						width: 250,
						display: "flex",
						alignItems: "center",
						marginTop: "20px",
						marginBottom: "15px",
					}}
				>
					<Rating
						name="simple-controlled"
						value={ratingValue}
						onChange={(event, newValue) => {
							setRatingValue(newValue);
						}}
						onChangeActive={(event, newHover) => {
							setHover(newHover);
						}}
					/>{" "}
					{ratingValue !== null && (
						<Box sx={{ ml: 1 }}>
							{labels[hover !== -1 ? hover : ratingValue]}
						</Box>
					)}
				</Box>
				<TextField
					name="comment"
					inputRef={register}
					id="comment"
					label="Comment"
					variant="outlined"
					fullWidth
					multiline
					minRows={2}
				/>
				<Button variant="contained" type="submit" sx={{ marginTop: "15px" }}>
					Submit Review
				</Button>
			</form>
		</Box>
	);
};

export default CreateReviewBox;
