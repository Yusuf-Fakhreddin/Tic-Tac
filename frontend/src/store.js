import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
	facebookReducer,
	forgotPasswordReducer,
	googleReducer,
	resetPasswordReducer,
	userLoginReducer,
	userRegisterReducer,
} from "./reducers/authReducers";
import { cartReducer } from "./reducers/cartReducers";
import { imagesReducer } from "./reducers/imageReducers";

const reducer = combineReducers({
	// part of state : its reducer
	googleReducer: googleReducer,
	facebookReducer: facebookReducer,
	forotPassword: forgotPasswordReducer,
	resetPassword: resetPasswordReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	cartState: cartReducer,
	uploadImagesState: imagesReducer,
});

// initializing the userinfo state from what's saved in local storage or nothing
const userInfoFromStorage = localStorage.getItem("UserInfo")
	? JSON.parse(localStorage.getItem("UserInfo"))
	: null;

const cartItemsFromStorage = localStorage.getItem("cartItems")
	? JSON.parse(localStorage.getItem("cartItems"))
	: [];

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
	? JSON.parse(localStorage.getItem("shippingAddress"))
	: {};

const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
	? JSON.parse(localStorage.getItem("paymentMethod"))
	: {};
const initialState = {
	cartState: {
		cartItems: cartItemsFromStorage,
		shippingAddress: shippingAddressFromStorage,
		paymentMethod: paymentMethodFromStorage,
	},
	userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
