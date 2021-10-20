import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import ImageUploading from "react-images-uploading";
import ProductImageBox from "./ProductImageBox";

const ImageUpload = ({ uploadImage, token, alreadyExistedImage }) => {
	const [images, setImages] = React.useState([]);
	const maxNumber = 1;
	const acceptedTypes = ["jpg", "jpeg", "png"];

	const [displayedImage, setDisplayedImage] = useState(
		alreadyExistedImage || null
	);
	const onChange = async (imageList, addUpdateIndex) => {
		// data for submit
		console.log(imageList, addUpdateIndex);
		setImages(imageList);
		setDisplayedImage(imageList[0]["data_url"]);
		await uploadImage({ file: imageList[0].file, token });
	};

	return (
		<ImageUploading
			value={images}
			onChange={onChange}
			maxNumber={maxNumber}
			dataURLKey="data_url"
			maxFileSize="5242880" //5MB
			acceptType={acceptedTypes}
		>
			{({
				imageList,
				onImageUpload,
				onImageRemoveAll,
				onImageUpdate,
				onImageRemove,
				isDragging,
				dragProps,
			}) => (
				<Grid container>
					<Grid item xs={10} md={5}>
						<label htmlFor="icon-button-file">
							{!displayedImage ? (
								<Button
									startIcon={<PhotoCamera />}
									variant="contained"
									component="span"
									onClick={onImageUpload}
								>
									Upload Image
								</Button>
							) : (
								<Button
									startIcon={<PhotoCamera />}
									variant="contained"
									component="span"
									onClick={() => onImageUpdate(0)}
								>
									Change Image
								</Button>
							)}
						</label>
					</Grid>
					<Grid item xs={10} md={7}>
						{!displayedImage ? (
							<ProductImageBox
								onClick={onImageUpload}
								{...dragProps}
								productImage={displayedImage}
							/>
						) : (
							<ProductImageBox
								onClick={() => onImageUpdate(0)}
								{...dragProps}
								productImage={displayedImage}
							/>
						)}
					</Grid>
				</Grid>
			)}
		</ImageUploading>
	);
};

export default ImageUpload;
