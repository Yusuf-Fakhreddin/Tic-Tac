import {
	Divider,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { NavLink } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import PersonIcon from "@mui/icons-material/Person";
import AssessmentIcon from "@mui/icons-material/Assessment";
import StoreIcon from "@mui/icons-material/Store";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
const AdminNavigationBox = () => {
	return (
		<Box
			sx={{
				border: "1.5px solid #e0e0e0",
				borderRadius: "5px",
				marginTop: "15px",
				textAlign: "center",
			}}
		>
			<List>
				<NavLink to="/admin/dashboard">
					<ListItem fullWidth sx={{ width: "100%" }}>
						<ListItemIcon
							sx={{
								marginRight: "15px",
								minWidth: "0px",
							}}
						>
							<DashboardIcon />
						</ListItemIcon>
						<ListItemText sx={{ display: "inline-block" }}>
							<Typography variant="body1">Dashboard</Typography>
						</ListItemText>
					</ListItem>
				</NavLink>
				<Divider />
				<NavLink to="/admin/dashboard/today">
					<ListItem fullWidth sx={{ width: "100%" }}>
						<ListItemIcon
							sx={{
								marginRight: "15px",
								minWidth: "0px",
							}}
						>
							<QueryStatsIcon />
						</ListItemIcon>
						<ListItemText sx={{ display: "inline-block" }}>
							<Typography variant="body1">Statistics</Typography>
						</ListItemText>
					</ListItem>
				</NavLink>
				<Divider />
				<NavLink to="/admin/products">
					<ListItem>
						<ListItemIcon sx={{ marginRight: "15px", minWidth: "0px" }}>
							<StoreIcon />
						</ListItemIcon>
						<ListItemText sx={{ display: "inline-block" }}>
							<Typography variant="body1">Products</Typography>
						</ListItemText>
					</ListItem>
				</NavLink>
				<Divider />
				<NavLink to="/admin/orders">
					<ListItem>
						<ListItemIcon sx={{ marginRight: "15px", minWidth: "0px" }}>
							<LocalShippingIcon />
						</ListItemIcon>
						<ListItemText sx={{ display: "inline-block" }}>
							<Typography variant="body1">Orders</Typography>
						</ListItemText>
					</ListItem>
				</NavLink>
				<Divider />
				<NavLink to="/admin/users">
					<ListItem>
						<ListItemIcon sx={{ marginRight: "15px", minWidth: "0px" }}>
							<PersonIcon />
						</ListItemIcon>
						<ListItemText sx={{ display: "inline-block" }}>
							<Typography variant="body1">Users</Typography>
						</ListItemText>
					</ListItem>
				</NavLink>
			</List>
		</Box>
	);
};

export default AdminNavigationBox;
