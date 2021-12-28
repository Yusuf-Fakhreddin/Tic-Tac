import React from "react";
import { Box } from "@mui/system";

const ProductTableImage = ({ productImage }) => {
	return (
		<Box
			component="img"
			sx={{
				// maxWidth: "100%",
				// maxHegiht: "100%",
				width: "50%",
				margin: "auto",
				// height: "70%",
				// height: 233,
				// width: 350,
				// maxHeight: { xs: 233, md: 167 },
				// maxWidth: { xs: 350, md: 250 },
			}}
			alt="Product"
			src={productImage}
		/>
	);
};

export default ProductTableImage;
