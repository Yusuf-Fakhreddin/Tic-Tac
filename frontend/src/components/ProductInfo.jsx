import {
	Divider,
	List,
	ListItem,
	ListItemText,
	Rating,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";

const ProductInfo = ({ product }) => {
	return (
		<List>
			<ListItem>
				<ListItemText>
					<Typography variant="h5" component="h1">
						{product.name}
					</Typography>
				</ListItemText>
			</ListItem>
			<Divider />
			{/* <ListItem>
				<ListItemText>
					<Typography variant="h6" component="h3">
						{product.price} EGP
					</Typography>
				</ListItemText>
			</ListItem>
			<Divider /> */}
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
	);
};

export default ProductInfo;