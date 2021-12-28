import { Box } from "@mui/system";

const ProductImageBox = ({ productImage, dragProps, ...props }) => {
	return (
		<Box
			{...props}
			component="img"
			sx={{
				// maxWidth: "100%",
				// maxHegiht: "100%",
				width: "100%",
				// height: "70%",
				// height: 233,
				// width: 350,
				// maxHeight: { xs: 233, md: 167 },
				// maxWidth: { xs: 350, md: 250 },
			}}
			alt="Product"
			src={productImage}
		></Box>
	);
};

export default ProductImageBox;
