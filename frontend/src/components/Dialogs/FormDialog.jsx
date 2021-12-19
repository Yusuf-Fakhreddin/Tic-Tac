import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ReviewForm from "../Product/ReviewForm";

const FormDialog = ({ buttonLabel, initialValues, action, id }) => {
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const handleSubmit = (review) => {
		action(id, review);
		setOpen(false);
	};

	return (
		<div>
			<Button variant="outlined" onClick={handleClickOpen}>
				{buttonLabel}
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Edit Review</DialogTitle>
				<DialogContent>
					<ReviewForm
						initialValues={initialValues}
						onSubmit={handleSubmit}
						close={handleClose}
						reviewId={id}
					/>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default FormDialog;
