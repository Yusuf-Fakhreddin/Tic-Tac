import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
	userDeleteReducer,
	userDetailsReducer,
	userListReducer,
	userUpdateProfileReducer,
	userUpdateReducer,
} from "./reducers/userReducers";
import {
	facebookReducer,
	forgotPasswordReducer,
	googleReducer,
	resetPasswordReducer,
	userLoginReducer,
	userRegisterReducer,
} from "./reducers/authReducers";

const reducer = combineReducers({
	// part of state : its reducer
	googleReducer: googleReducer,
	facebookReducer: facebookReducer,
	forotPassword: forgotPasswordReducer,
	resetPassword: resetPasswordReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userDetails: userDetailsReducer,
	userUpdateProfile: userUpdateProfileReducer,
	userList: userListReducer,
	userDelete: userDeleteReducer,
	userUpdate: userUpdateReducer,
});

// initializing the userinfo state from what's saved in local storage or nothing
const userInfoFromStorage = localStorage.getItem("UserInfo")
	? JSON.parse(localStorage.getItem("UserInfo"))
	: null;

const initialState = {
	userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
