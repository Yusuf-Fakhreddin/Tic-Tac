import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
	Button,
	CircularProgress,
	Container,
	Divider,
	Grid,
	List,
	ListItem,
	ListItemText,
	Rating,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { NavLink } from "react-router-dom";
import products from "../products";
import { useParams } from "react-router";
import { useEffect } from "react";
import { useListProductDetailsById } from "../Queries/ProductsQueries";
const ProductScreen = ({ match }) => {
	// const product = products.find((p) => p._id === match.params.id);
	const { id } = useParams();
	const [product, isLoading] = useListProductDetailsById(id);

	useEffect(() => {
		console.log(product, isLoading);
	}, [product]);

	if (isLoading)
		return (
			<div className="flex">
				<CircularProgress
					size="3.2em"
					sx={{
						margin: "15px auto",
					}}
				/>
			</div>
		);
	else
		return (
			<Box paddingTop={3}>
				<NavLink to="/">
					<Button variant="contained" startIcon={<ArrowBackIosIcon />}>
						Back
					</Button>
				</NavLink>
				<Grid
					container
					justifyContent="center"
					rowSpacing={3}
					spacing={2}
					mt={3}
				>
					<Grid item xs={10} md={6}>
						{" "}
						<Box
							component="img"
							sx={{
								maxWidth: "100%",
								// height: 233,
								// width: 350,
								// maxHeight: { xs: 233, md: 167 },
								// maxWidth: { xs: 350, md: 250 },
							}}
							alt="The house from the offer."
							src={product.image}
						/>{" "}
					</Grid>
					<Grid item xs={10} md={6}>
						<List>
							<ListItem>
								<ListItemText>
									<Typography variant="h5" component="h1">
										{product.name}
									</Typography>
								</ListItemText>
							</ListItem>
							<Divider />
							<ListItem>
								<ListItemText>
									<Typography variant="h6" component="h3">
										{product.price} EGP
									</Typography>
								</ListItemText>
							</ListItem>
							<Divider />
							<Box className="flex" padding={1.5}>
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
							</Box>
							<Divider />

							<ListItem>
								<ListItemText primary={product.description} />
							</ListItem>
						</List>
					</Grid>
				</Grid>
			</Box>
		);
};

export default ProductScreen;
