import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const ConfirmationDialog = ({ buttonLabel, action, id }) => {
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleConfirmation = () => {
		setOpen(false);
		action(id);
	};

	return (
		<div>
			<Button variant="contained" color="error" onClick={handleClickOpen}>
				{buttonLabel}
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					Are you sure you want to delete ?
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Once it's deleted it can not be restored
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button variant="text" onClick={handleClose}>
						Cancel
					</Button>
					<Button
						variant="contained"
						color="error"
						onClick={handleConfirmation}
						autoFocus
					>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default ConfirmationDialog;
