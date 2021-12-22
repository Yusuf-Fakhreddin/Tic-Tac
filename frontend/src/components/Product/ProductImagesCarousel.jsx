import React from "react";
import ImageGallery from "react-image-gallery";
import { Box } from "@mui/material";

const ProductImagesCarousel = ({ images }) => {
	return (
		<Box sx={{ marginTop: "25px", width: "80%", marginX: " auto" }}>
			<ImageGallery
				items={images}
				// showThumbnails={false}
				// showPlayButton={false}
				// showBullets={true}
				// showFullscreenButton={false}
				// autoPlay={true}
			/>
		</Box>
	);
};

export default ProductImagesCarousel;
