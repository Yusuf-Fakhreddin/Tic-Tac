import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { Button, Grid, LinearProgress } from "@mui/material";
import React, { useEffect } from "react";
import ImageUploading from "react-images-uploading";
import DragAndDrop from "./DragAndDrop";
import ProductImageBox from "./ProductImageBox";
import { useUploadProductImage } from "../../Queries/UploadQueries.js";
import { useDispatch, useSelector } from "react-redux";
import { addToImages, removeFromImages } from "../../actions/imageActions";

const ImageUpload = () => {
	// const [images, setImages] = useState([]);
	const maxNumber = 10;
	const acceptedTypes = ["jpg", "jpeg", "png"];

	const uploadImagesState = useSelector((state) => state.uploadImagesState);
	const { images } = uploadImagesState;
	console.log({ images });

	const [uploadImage, isUploadLoading, imageUrl] = useUploadProductImage();
	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const handleUploadImage = async (imageFile) => {
		await uploadImage({
			file: imageFile,
			token: userInfo.token,
		});
	};

	useEffect(() => {
		if (imageUrl) dispatch(addToImages(imageUrl));
	}, [imageUrl]);

	const onChange = async (imageList, addUpdateIndex) => {
		// data for submit
		console.log(imageList, addUpdateIndex);
		// setImages(imageList);
		// await uploadImage({
		// 	file: imageList[addUpdateIndex].file,
		// 	token: userInfo.token,
		// });
		handleUploadImage(imageList[addUpdateIndex].file);
	};

	const handleImageDelete = (index) => {
		console.log(index);
		dispatch(removeFromImages(index));
	};

	return (
		<>
			{isUploadLoading && <LinearProgress sx={{ marginBottom: "10px" }} />}

			<ImageUploading
				value={images}
				onChange={onChange}
				maxNumber={maxNumber}
				dataURLKey="data_url"
				maxFileSize="5242880" //5MB
				acceptType={acceptedTypes}
				multiple={true}
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
								<Button
									startIcon={<PhotoCamera />}
									variant="contained"
									component="span"
									onClick={onImageUpload}
								>
									Upload Image
								</Button>
							</label>
						</Grid>

						<Grid item xs={10} md={6}>
							<DragAndDrop onClick={onImageUpload} {...dragProps} />
						</Grid>

						<Grid item xs={10} md={6}>
							{images.length > 0 &&
								React.Children.toArray(
									images.map((image, index) => (
										<>
											<ProductImageBox productImage={image} />
											<Button
												variant="contained"
												color="error"
												onClick={() => handleImageDelete(index)}
											>
												Delete
											</Button>
										</>
									))
								)}
						</Grid>
					</Grid>
				)}
			</ImageUploading>
		</>
	);
};

export default ImageUpload;
