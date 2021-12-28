import {
	ADD_TO_IMAGES,
	INITIAL_IMAGES,
	REMOVE_FROM_IMAGES,
	RESET_ALL_IMAGES,
	UPDATE_TO_IMAGES,
} from "../constants/imageConstants";

export const imagesReducer = (state = { images: [] }, action) => {
	switch (action.type) {
		case ADD_TO_IMAGES:
			// check if the item already exist

			const image = action.payload;
			const existItem = state.images.find((x) => x === image);

			console.log(existItem);
			if (existItem) {
				return {
					...state,
					images: state.images.map((x) => (x === existItem ? image : x)),
				};
			} else {
				return {
					...state,
					images: [...state.images, image],
				};
			}

		case REMOVE_FROM_IMAGES:
			console.log(action.payload);
			return {
				...state,
				images:
					action.payload > 0 ? state.images.splice(action.payload, 1) : [],
			};
		case UPDATE_TO_IMAGES:
			return {
				...state,
				images: state.images.map(function (item, index) {
					return index === action.payload.index
						? action.payload.imageUrl
						: item;
				}),
			};

		case INITIAL_IMAGES:
			return {
				...state,
				images: action.payload,
			};
		case RESET_ALL_IMAGES:
			return {
				...state,
				images: [],
			};
		default:
			return state;
	}
};
