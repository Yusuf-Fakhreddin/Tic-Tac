import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Rating } from "@mui/material";
import { NavLink } from "react-router-dom";

const Product = ({ product }) => {
	return (
		<NavLink to={`/product/${product._id}`}>
			<Card variant="outlined" sx={{ maxWidth: 345 }}>
				<CardActionArea>
					<CardMedia
						component="img"
						height="250"
						image={product.image}
						alt={product.name}
						variant="top"
					/>
					<CardContent>
						<Typography gutterBottom variant="h5" component="div">
							{product.name}
						</Typography>
						{/* <Typography variant="body2" color="text.secondary">
							Lizards are a widespread group of squamate reptiles, with over
							6,000 species, ranging across all continents except Antarctica
						</Typography> */}
						<div className="flex">
							<Typography variant="body2" component="div">
								<Rating
									name="size-medium"
									precision={0.5}
									readOnly
									defaultValue={product.rating}
								/>{" "}
							</Typography>
							<Typography variant="body2" component="div">
								{product.numReviews} Reviews{" "}
							</Typography>
						</div>
						<Typography gutterBottom variant="h6" component="div">
							{product.price} EGP
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</NavLink>
	);
};

export default Product;
