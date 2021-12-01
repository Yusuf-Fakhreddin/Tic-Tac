import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import i18next from "i18next";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import languages from "../../languages.js";

const LanguageMenu = () => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = (code) => {
		setAnchorEl(null);
	};
	const handleChange = (code) => {
		setAnchorEl(null);
		i18next.changeLanguage(code);
		window.location.reload();
	};

	const currentLanguageCode = localStorage.getItem("i18nextLng") || "en";
	const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
	const { t } = useTranslation();

	useEffect(() => {
		document.body.dir = currentLanguage.dir || "ltr";
	}, [currentLanguage, t]);

	return (
		<div>
			<Button
				color="inherit"
				id="fade-button"
				aria-controls="fade-menu"
				aria-haspopup="true"
				aria-expanded={open ? "true" : undefined}
				onClick={handleClick}
				endIcon={<KeyboardArrowDownIcon />}
			>
				<span
					className={`flag-icon flag-icon-${currentLanguage.country_code}`}
				></span>{" "}
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
				{React.Children.toArray(
					languages.map(({ code, name, country_code }) => (
						<MenuItem onClick={() => handleChange(code)}>
							{" "}
							<span
								className={`flag-icon flag-icon-${country_code} mx-2`}
								style={{
									opacity: currentLanguageCode === code ? 0.5 : 1,
								}}
							></span>
							{name}
						</MenuItem>
					))
				)}
			</Menu>
		</div>
	);
};

export default LanguageMenu;
