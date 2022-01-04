import { Button, Grid, Rating, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HeroProduct = ({ product }) => {
	const { t } = useTranslation();

	return (
		<Grid container sx={{ marginTop: "30px" }}>
			<Grid item align="center" xs={12} md={6}>
				<Box
					component="img"
					sx={{
						maxWidth: "100%",
						// maxHegiht: "100%",
						width: "350px",
						height: "650px",
						// height: 233,
						// width: 350,
						// maxHeight: { xs: 233, md: 167 },
						// maxWidth: { xs: 350, md: 250 },
						cursor: "pointer",
						objectFit: "contain",
					}}
					alt="Product Image"
					src={product.images[0]}
				></Box>
			</Grid>
			<Grid item xs={12} md={6}>
				<Typography variant="h2">{product.name}</Typography>
				<Typography variant="h5">
					For {product.category === "Men" ? "Him" : "Her"}
				</Typography>
				<Box className="flex">
					<Typography variant="body2" component="div">
						<Rating
							name="size-medium"
							precision={0.5}
							readOnly
							value={product.rating}
						/>{" "}
					</Typography>
					<Typography variant="body2" component="div">
						{product.numReviews} {t("reviews")}{" "}
					</Typography>
				</Box>
				<Button
					variant="outlined"
					component={NavLink}
					to={`/product/${product._id}`}
					sx={{ marginTop: "15px" }}
				>
					Check Out
				</Button>
			</Grid>
		</Grid>
	);
};

export default HeroProduct;
