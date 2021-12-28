import {
	ADD_TO_IMAGES,
	INITIAL_IMAGES,
	REMOVE_FROM_IMAGES,
	RESET_ALL_IMAGES,
	UPDATE_TO_IMAGES,
} from "../constants/imageConstants";

export const resetImages = () => (dispatch) => {
	dispatch({
		type: RESET_ALL_IMAGES,
	});
};
export const initialImages = (images) => (dispatch) => {
	console.log(images);
	dispatch({
		type: INITIAL_IMAGES,
		payload: images,
	});
};

export const addToImages = (imageUrl) => (dispatch) => {
	console.log(imageUrl);
	dispatch({
		type: ADD_TO_IMAGES,
		payload: imageUrl,
	});
};

export const updateToImages = (index, imageUrl) => (dispatch) => {
	dispatch({
		type: UPDATE_TO_IMAGES,
		payload: { index, imageUrl },
	});
};

export const removeFromImages = (index) => (dispatch) => {
	dispatch({
		type: REMOVE_FROM_IMAGES,
		payload: index,
	});
};
