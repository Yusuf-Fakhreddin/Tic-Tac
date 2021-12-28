import React from "react";
import ImageGallery from "react-image-gallery";
import { Box } from "@mui/material";

const ProductImagesCarousel = ({ images }) => {
	let newImages = images.map((image) => {
		return {
			original: image,
			originalHeight: "100%",
		};
	});
	return (
		<Box
			sx={{
				// marginTop: "25px",
				marginX: "auto",
			}}
		>
			<ImageGallery
				items={newImages}
				// showThumbnails={false}
				// showPlayButton={false}
				showBullets={true}
				showFullscreenButton={true}
				// autoPlay={true}
				lazyLoad={true}
				wid
			/>
		</Box>
	);
};

export default ProductImagesCarousel;
