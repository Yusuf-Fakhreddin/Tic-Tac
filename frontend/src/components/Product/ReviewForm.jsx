import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { Button, DialogActions, Rating, TextField } from "@mui/material";
import { Box } from "@mui/system";

const ReviewForm = ({ onSubmit, initialValues, close }) => {
	const { t } = useTranslation();

	const labels = {
		1: t("poor"),
		2: t("fair"),
		3: t("good"),
		4: t("veryGood"),
		5: t("excellent"),
	};
	const [ratingValue, setRatingValue] = React.useState(1);
	const [hover, setHover] = React.useState(-1);
	const { register, handleSubmit } = useForm({
		mode: "onBlur",
		defaultValues: initialValues
			? {
					comment: initialValues.comment,
			  }
			: { comment: "" },
	});
	useEffect(() => {
		setRatingValue(initialValues ? initialValues.rating : 1);
	}, []);
	return (
		<form
			autoComplete="off"
			onSubmit={handleSubmit((data) =>
				onSubmit({ ...data, rating: ratingValue })
			)}
		>
			<Box
				sx={{
					width: 250,
					display: "flex",
					alignItems: "center",
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
					<Box sx={{ ml: 1 }}>{labels[hover !== -1 ? hover : ratingValue]}</Box>
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
			{/* <Button variant="contained" type="submit" sx={{ marginTop: "15px" }}>
				{initialValues ? t("editReview") : t("submitReview")}
			</Button> */}
			<DialogActions>
				<Button onClick={close}>Cancel</Button>
				<Button type="submit">
					{" "}
					{initialValues ? t("editReview") : t("submitReview")}
				</Button>
			</DialogActions>
		</form>
	);
};

export default ReviewForm;
