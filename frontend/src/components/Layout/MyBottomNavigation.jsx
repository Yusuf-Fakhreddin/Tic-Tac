import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalShippingTwoToneIcon from "@mui/icons-material/LocalShippingTwoTone";
import { NavLink } from "react-router-dom";

const MyBottomNavigation = () => {
	return (
		<Box
			sx={{
				display: { xs: "block", md: "none" },
				position: "fixed",
				bottom: "0",
				width: "100%",
				backgroundColor: "white",
				zIndex: "10",
			}}
		>
			<BottomNavigation showLabels>
				<BottomNavigationAction
					component={NavLink}
					to="/"
					label="Home"
					icon={<HomeIcon />}
				/>
				<BottomNavigationAction
					component={NavLink}
					to="/cart"
					label="Cart"
					icon={<ShoppingCartIcon />}
				/>
				<BottomNavigationAction
					label="My Orders"
					component={NavLink}
					to="/myorders"
					icon={<LocalShippingTwoToneIcon />}
				/>
			</BottomNavigation>
		</Box>
	);
};

export default MyBottomNavigation;
