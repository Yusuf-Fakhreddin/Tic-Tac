import { Button, ButtonGroup } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { NavLink } from "react-router-dom";

const DashboardIntervalButtons = () => {
	return (
		<Box mt={3}>
			<ButtonGroup
				variant="contained"
				color="primary"
				aria-label="text button group"
			>
				<Button component={NavLink} to="/admin/dashboard/today">
					Today
				</Button>
				<Button component={NavLink} to="/admin/dashboard/week">
					Week
				</Button>
				<Button component={NavLink} to="/admin/dashboard/month">
					Month
				</Button>
				<Button component={NavLink} to="/admin/dashboard/year">
					Year
				</Button>
			</ButtonGroup>
		</Box>
	);
};

export default DashboardIntervalButtons;
