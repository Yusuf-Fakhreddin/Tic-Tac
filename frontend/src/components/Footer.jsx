import { Container, Grid } from "@mui/material";

import React from "react";

const Footer = () => {
	return (
		<footer>
			<Container>
				<Grid container>
					<Grid item textAlign="center" xs={12}>
						Copyright &copy; Caribbean
					</Grid>
				</Grid>
			</Container>
		</footer>
	);
};

export default Footer;
