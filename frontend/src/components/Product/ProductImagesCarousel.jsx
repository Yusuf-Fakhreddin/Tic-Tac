import React from "react";
import ImageGallery from "react-image-gallery";
import { Box } from "@mui/material";

const ProductImagesCarousel = ({ images }) => {
	let newImages = images.map((image) => {
		return {
			original: image,
		};
	});
	return (
		<Box>
			<ImageGallery
				items={newImages}
				// showThumbnails={false}
				// showPlayButton={false}
				showBullets={true}
				showFullscreenButton={true}
				// autoPlay={true}
				lazyLoad={true}
			/>
		</Box>
	);
};

export default ProductImagesCarousel;
