import React from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

const DashboardCountBox = ({ label, count }) => {
	return (
		<Box
			sx={{
				border: "1.5px solid #e0e0e0",
				padding: "15px",
				borderRadius: "5px",
			}}
		>
			{label && (
				<Typography variant="body1" sx={{ display: "inline-block", mr: "5px" }}>
					{label}
				</Typography>
			)}
			<Typography variant="h6" sx={{ display: "inline-block" }}>
				{count}
			</Typography>
		</Box>
	);
};

export default DashboardCountBox;
