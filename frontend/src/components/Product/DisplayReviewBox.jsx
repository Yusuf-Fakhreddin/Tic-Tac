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

const DisplayReviewBox = ({ reviewer, time, rating, comment, manage }) => {
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
						<Typography variant="subtitle2">{reviewer}</Typography>
						<Typography variant="caption">{time}</Typography>
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
							defaultValue={rating}
						/>{" "}
						<Typography variant="body1">{comment}</Typography>
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
								<Button>Delete Confirmation Dialog</Button>
								<Button>Edit Dialog</Button>
							</ButtonGroup>
						</ListItem>
					</>
				)}
			</List>
		</Box>
	);
};

export default DisplayReviewBox;
