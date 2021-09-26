import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginIcon from "@mui/icons-material/Login";
import { NavLink } from "react-router-dom";
import SearchInput from "./SearchInput";
import { useEffect, useState } from "react";
import { Fab } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import {
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import React from "react";
import ScrollTop from "./BackToTop";

let list = [
	{ label: "Cart", href: "/cart", icon: <ShoppingCartIcon /> },
	{ label: "Login", href: "/login", icon: <LoginIcon /> },
];

const Header = () => {
	const [displayDrawer, setdisplayDrawer] = useState(false);

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
								onClick={() => setdisplayDrawer(false)}
							>
								<ListItemIcon>{item.icon}</ListItemIcon>
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

						<Box className="flex" sx={{ display: { xs: "none", md: "flex" } }}>
							{/* to divide into two sides */}
							<Box sx={{ flexGrow: 1 }} />
							<NavLink to="/cart">
								<Button color="inherit" startIcon={<ShoppingCartIcon />}>
									Cart
								</Button>
							</NavLink>
							<NavLink to="/login">
								<Button startIcon={<LoginIcon />} color="inherit">
									Login
								</Button>
							</NavLink>
						</Box>
					</Toolbar>
				</AppBar>
			</Box>
			{/* to drop content down after the navbar */}
			<Toolbar id="back-to-top-anchor" />
		</header>
	);
};

export default Header;
