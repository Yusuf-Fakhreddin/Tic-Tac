import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { useDispatch } from "react-redux";
import ListItemIcon from "@mui/material/ListItemIcon";
import LocalShippingTwoToneIcon from "@mui/icons-material/LocalShippingTwoTone";
import { NavLink } from "react-router-dom";
import { logout } from "../../actions/authActions";
import { Divider } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginIcon from "@mui/icons-material/Login";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box } from "@mui/system";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useTranslation } from "react-i18next";

const HeaderMenu = ({ userInfo }) => {
	const { t } = useTranslation();

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
		<Box className="flex" sx={{ display: { xs: "none", lg: "flex" } }}>
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
								{t("profile")}
							</MenuItem>
						</NavLink>
						<NavLink to="/myorders">
							<MenuItem sx={{ width: "180px" }} onClick={handleClose}>
								<ListItemIcon>
									<LocalShippingTwoToneIcon />{" "}
								</ListItemIcon>
								{t("myOrders")}
							</MenuItem>
						</NavLink>
						<MenuItem sx={{ width: "180px" }} onClick={logoutHandler}>
							<ListItemIcon>
								<LogoutIcon />{" "}
							</ListItemIcon>
							{t("logout")}
						</MenuItem>
						{userInfo.isAdmin && (
							<div>
								<Divider sx={{ my: 0.5 }} />
								<NavLink to="/createproduct">
									<MenuItem onClick={handleClose}>Create Product</MenuItem>
								</NavLink>
								<NavLink to="/admin/dashboard">
									<MenuItem onClick={handleClose}>Dashboard</MenuItem>
								</NavLink>
								<NavLink to="/admin/users">
									<MenuItem onClick={handleClose}>Manage Users</MenuItem>
								</NavLink>
								<NavLink to="/admin/products">
									<MenuItem onClick={handleClose}>Manage Products</MenuItem>
								</NavLink>
								<NavLink to="/admin/orders">
									<MenuItem onClick={handleClose}>Manage Orders</MenuItem>
								</NavLink>
							</div>
						)}
					</Menu>
				</div>
			)}
			{!userInfo && (
				<NavLink to="/login">
					<Button color="inherit" startIcon={<LoginIcon />}>
						{t("login")}
					</Button>
				</NavLink>
			)}
			<NavLink to="/cart">
				<Button color="inherit" startIcon={<ShoppingCartIcon />}>
					{t("cart")}
				</Button>
			</NavLink>
		</Box>
	);
};

export default HeaderMenu;
