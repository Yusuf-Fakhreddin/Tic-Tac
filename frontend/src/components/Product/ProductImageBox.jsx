import { Box } from "@mui/system";
import Zoom from "react-medium-image-zoom";

const ProductImageBox = ({ productImage, dragProps, ...props }) => {
	return (
		<Zoom>
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
					cursor: "pointer",
				}}
				alt="Product"
				src={productImage}
			></Box>
		</Zoom>
	);
};

export default ProductImageBox;
