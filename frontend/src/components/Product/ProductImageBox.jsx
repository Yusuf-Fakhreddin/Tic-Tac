import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import ImageMagnify from "./ImageMagnify";

const ProductImageBox = ({ productImage, dragProps, ...props }) => {
	if (productImage)
		return (
			<Box
				{...props}
				// component="img"
				sx={{
					// maxWidth: "100%",
					// maxHegiht: "100%",
					width: "50%",
					// height: "70%",
					// height: 233,
					// width: 350,
					// maxHeight: { xs: 233, md: 167 },
					// maxWidth: { xs: 350, md: 250 },
				}}
				alt="Product"
				// src={productImage}
			>
				<ImageMagnify image={productImage} />
			</Box>
		);
	else
		return (
			<Box
				{...props}
				sx={{
					// maxWidth: "100%",
					// maxHegiht: "100%",
					width: "100%",
					height: "250px",
					// height: 233,
					// width: 350,
					// maxHeight: { xs: 233, md: 167 },
					// maxWidth: { xs: 350, md: 250 },
					backgroundColor: "#fafafaf",
					border: "5px dashed grey",
					color: "grey",
					cursor: "pointer",
					display: "grid",
					placeItems: "center",
				}}
				alt="Product"
			>
				<Typography variant="h5">Drag and Drop Here</Typography>
			</Box>
		);
};

export default ProductImageBox;
