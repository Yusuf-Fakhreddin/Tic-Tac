import {
	Divider,
	List,
	ListItem,
	ListItemText,
	Rating,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useTranslation } from "react-i18next";

const ProductInfo = ({ product }) => {
	const { t } = useTranslation();

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
						value={product.rating}
					/>{" "}
				</Typography>
				<Typography variant="body2" component="div">
					{product.numReviews} {t("reviews")}{" "}
				</Typography>
			</Box>
			<Divider />
			<ListItem>
				<ListItemText>
					<Typography variant="subtitle2">{product.category}</Typography>
				</ListItemText>
			</ListItem>
			<Divider />

			<ListItem>
				<ListItemText>
					<Typography variant="body2">{product.description}</Typography>
				</ListItemText>
			</ListItem>
		</List>
	);
};

export default ProductInfo;
