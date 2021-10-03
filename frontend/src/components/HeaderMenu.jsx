import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { useDispatch } from "react-redux";
import ListItemIcon from "@mui/material/ListItemIcon";

import { NavLink } from "react-router-dom";
import { logout } from "../actions/authActions";
import { Divider } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginIcon from "@mui/icons-material/Login";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box } from "@mui/system";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
const HeaderMenu = ({ userInfo }) => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	let open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const dispatch = useDispatch();

	const logoutHandler = () => {
		setAnchorEl(null);
		dispatch(logout());
	};

	return (
		<Box className="flex" sx={{ display: { xs: "none", md: "flex" } }}>
			{userInfo && (
				<div>
					<Button
						color="inherit"
						id="fade-button"
						disableRipple
						aria-controls="fade-menu"
						aria-haspopup="true"
						aria-expanded={open ? "true" : undefined}
						onClick={handleClick}
						endIcon={<KeyboardArrowDownIcon />}
					>
						{userInfo.name}
					</Button>
					<Menu
						id="fade-menu"
						MenuListProps={{
							"aria-labelledby": "fade-button",
						}}
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						TransitionComponent={Fade}
					>
						<NavLink to="/profile">
							<MenuItem sx={{ width: "180px" }} onClick={handleClose}>
								<ListItemIcon>
									<AccountCircleIcon />{" "}
								</ListItemIcon>
								Profile
							</MenuItem>
						</NavLink>
						<MenuItem sx={{ width: "180px" }} onClick={logoutHandler}>
							<ListItemIcon>
								<LogoutIcon />{" "}
							</ListItemIcon>
							Logout
						</MenuItem>
						{userInfo.isAdmin && (
							<>
								<Divider sx={{ my: 0.5 }} />
								<NavLink to="/admin/userlist">
									<MenuItem onClick={handleClose}>Manage Users</MenuItem>
								</NavLink>
								<NavLink to="/admin/productlist">
									<MenuItem onClick={handleClose}>Manage Products</MenuItem>
								</NavLink>
							</>
						)}
					</Menu>
				</div>
			)}
			{!userInfo && (
				<NavLink to="/login">
					<Button color="inherit" startIcon={<LoginIcon />}>
						Login
					</Button>
				</NavLink>
			)}
			<NavLink to="/cart">
				<Button color="inherit" startIcon={<ShoppingCartIcon />}>
					Cart
				</Button>
			</NavLink>
		</Box>
	);
};

export default HeaderMenu;
