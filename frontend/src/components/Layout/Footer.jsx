import {
	Box,
	Button,
	ButtonGroup,
	Container,
	Grid,
	IconButton,
	Tooltip,
	Typography,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
const Footer = () => {
	return (
		<Box
			bgColor="secondary.main"
			sx={{ marginTop: "80px", paddingY: "25px", backgroundColor: "#3C85FC" }}
		>
			<footer>
				<Container>
					<Grid container>
						<Grid item textAlign="left" xs={12} md={6}>
							<Typography color="white" variant="h5">
								This is a demo project
							</Typography>
							<Typography color="white" variant="h6">
								Please Don't enter any real payment card information
							</Typography>
						</Grid>
						<Grid item textAlign="center" xs={12} md={6}>
							<Tooltip title="yusuffakhreddin@gmail.com" placement="top">
								<Button
									variant="contained"
									disableElevation
									startIcon={<EmailIcon />}
								>
									Contact The Developer
								</Button>
							</Tooltip>
							<Typography sx={{ marginTop: "10px" }} color="white" variant="h5">
								More About The Developer
							</Typography>
							<ButtonGroup disableElevation variant="contained">
								<Button
									target="_blank "
									href="https://github.com/Yusuf-Fakhreddin"
								>
									<GitHubIcon />
								</Button>
								<Button
									target="_blank"
									href="https://www.linkedin.com/in/yusuf-fakhreddin-a89343211/"
								>
									<LinkedInIcon />
								</Button>
							</ButtonGroup>
						</Grid>
					</Grid>
				</Container>
			</footer>
		</Box>
	);
};

export default Footer;
