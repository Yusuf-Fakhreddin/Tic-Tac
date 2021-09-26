import {
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_REGISTER_FAIL,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_REQUEST,
	USER_LOGOUT,
	GOOGLE_LOGIN_REQUEST,
	GOOGLE_LOGIN_SUCCESS,
	GOOGLE_LOGIN_FAIL,
	FACEBOOK_LOGIN_REQUEST,
	FACEBOOK_LOGIN_SUCCESS,
	FACEBOOK_LOGIN_FAIL,
	FORGOT_PASSWORD_REQUEST,
	FORGOT_PASSWORD_SUCCESS,
	FORGOT_PASSWORD_FAIL,
	RESET_PASSWORD_REQUEST,
	RESET_PASSWORD_SUCCESS,
	RESET_PASSWORD_FAIL,
} from "../constants/authConstants";

export const googleReducer = (state = {}, action) => {
	switch (action.type) {
		case GOOGLE_LOGIN_REQUEST:
			return { loading: true };
		case GOOGLE_LOGIN_SUCCESS:
			return { loading: false, userInfo: action.payload };
		case GOOGLE_LOGIN_FAIL:
			return { loading: false, error: action.payload };
		case USER_LOGOUT:
			return {};
		default:
			return state;
	}
};
export const facebookReducer = (state = {}, action) => {
	switch (action.type) {
		case FACEBOOK_LOGIN_REQUEST:
			return { loading: true };
		case FACEBOOK_LOGIN_SUCCESS:
			return { loading: false, userInfo: action.payload };
		case FACEBOOK_LOGIN_FAIL:
			return { loading: false, error: action.payload };
		case USER_LOGOUT:
			return {};
		default:
			return state;
	}
};

export const userLoginReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_LOGIN_REQUEST:
			return { loading: true };
		case USER_LOGIN_SUCCESS:
			return { loading: false, userInfo: action.payload };
		case USER_LOGIN_FAIL:
			return { loading: false, error: action.payload };
		case USER_LOGOUT:
			return {};
		default:
			return state;
	}
};

export const userRegisterReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_REGISTER_REQUEST:
			return { loading: true };
		case USER_REGISTER_SUCCESS:
			return { loading: false, userInfo: action.payload };
		case USER_REGISTER_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const forgotPasswordReducer = (state = {}, action) => {
	switch (action.type) {
		case FORGOT_PASSWORD_REQUEST:
			return { loading: true };
		case FORGOT_PASSWORD_SUCCESS:
			return { loading: false, message: action.payload };
		case FORGOT_PASSWORD_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const resetPasswordReducer = (state = {}, action) => {
	switch (action.type) {
		case RESET_PASSWORD_REQUEST:
			return { loading: true };
		case RESET_PASSWORD_SUCCESS:
			return { loading: false, message: action.payload };
		case RESET_PASSWORD_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};
