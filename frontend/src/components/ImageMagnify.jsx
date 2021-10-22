import React from "react";
import ReactImageMagnify from "react-image-magnify";
import Magnifier from "react-magnifier";

const ImageMagnify = ({ image }) => {
	// return (
	// 	<ReactImageMagnify
	// 		enlargedImagePosition="over"
	// 		{...{
	// 			smallImage: {
	// 				alt: "Wristwatch by Ted Baker London",
	// 				isFluidWidth: true,
	// 				src: image,
	// 			},
	// 			largeImage: {
	// 				src: image,
	// 				width: 1200,
	// 				height: 1800,
	// 			},
	// 		}}
	// 	/>
	// );
	return <Magnifier zoomFactor="1" src={image} />;
};

export default ImageMagnify;
