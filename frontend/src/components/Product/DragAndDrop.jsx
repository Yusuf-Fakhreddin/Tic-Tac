import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const DragAndDrop = ({ dragProps, ...props }) => {
	return (
		<Box
			{...props}
			sx={{
				// maxWidth: "100%",
				// maxHegiht: "100%",
				width: "100%",
				height: "250px",
				// height: 233,
				// width: 350,
				// maxHeight: { xs: 233, md: 167 },
				// maxWidth: { xs: 350, md: 250 },
				backgroundColor: "#fafafaf",
				border: "5px dashed grey",
				color: "grey",
				cursor: "pointer",
				display: "grid",
				placeItems: "center",
			}}
			alt="Product"
		>
			<Typography variant="h5">Drag and Drop Here</Typography>
		</Box>
	);
};

export default DragAndDrop;
