import { Box } from "@mui/system";
import Zoom from "react-medium-image-zoom";

const ProductImageBox = ({ productImage, dragProps, ...props }) => {
	return (
		<Zoom>
			<Box
				{...props}
				component="img"
				sx={{
					maxWidth: "100%",
					// maxHegiht: "100%",
					width: "350px",
					height: "450px",
					// height: 233,
					// width: 350,
					// maxHeight: { xs: 233, md: 167 },
					// maxWidth: { xs: 350, md: 250 },
					cursor: "pointer",
					objectFit: "contain",
				}}
				alt="Product Image"
				src={productImage}
			></Box>
		</Zoom>
	);
};

export default ProductImageBox;
