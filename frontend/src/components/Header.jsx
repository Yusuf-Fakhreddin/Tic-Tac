import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { NavLink } from "react-router-dom";
import SearchInput from "./SearchInput";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import React from "react";
import HeaderMenu from "./HeaderMenu";
import { logout } from "../actions/authActions";

const Header = () => {
	const dispatch = useDispatch();

	const [displayDrawer, setdisplayDrawer] = useState(false);
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	const [list, setList] = useState([]);
	useEffect(() => {
		if (!userInfo) {
			setList([
				{ label: "Cart", href: "/cart", icon: <ShoppingCartIcon /> },
				{ label: "Login", href: "/login", icon: <LoginIcon /> },
			]);
		} else {
			setList([
				{ label: "Profile", href: "/profile", icon: <AccountCircleIcon /> },
				{ label: "Cart", href: "/cart", icon: <ShoppingCartIcon /> },
				{ label: "Logout", href: "/", icon: <LogoutIcon /> },
			]);
		}
	}, [userInfo]);

	return (
		<header>
			{/* Drawer */}
			<Drawer open={displayDrawer} onClose={() => setdisplayDrawer(false)}>
				{" "}
				<List>
					{React.Children.toArray(
						list.map((item) => (
							<ListItem
								button
								component={NavLink}
								to={item.href}
								onClick={() => {
									setdisplayDrawer(false);
									if (item.label === "Logout") dispatch(logout());
								}}
							>
								{item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
								<ListItemText primary={item.label} />
							</ListItem>
						))
					)}
				</List>{" "}
			</Drawer>

			{/* AppBar */}
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="fixed">
					<Toolbar>
						<IconButton
							size="large"
							edge="start"
							color="inherit"
							aria-label="menu"
							sx={{ display: { xs: "block", lg: "none" } }}
							onClick={() => setdisplayDrawer(true)}
						>
							<MenuIcon />
						</IconButton>
						<NavLink to="/">
							<Typography variant="h6" component="div" sx={{ mr: 2 }}>
								Caribbean
							</Typography>
						</NavLink>
						<SearchInput />
						<Box sx={{ flexGrow: 1 }} />

						<HeaderMenu userInfo={userInfo} />
					</Toolbar>
				</AppBar>
			</Box>
			{/* to drop content down after the navbar */}
			<Toolbar id="back-to-top-anchor" />
		</header>
	);
};

export default Header;
