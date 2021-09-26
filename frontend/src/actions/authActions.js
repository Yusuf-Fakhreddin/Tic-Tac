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
import {
	USER_DETAILS_RESET,
	USER_LIST_RESET,
} from "../constants/userConstants";
import http from "../htppService";

const baseURL = process.env.baseURL;

export const googleOauth = (tokenId) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: GOOGLE_LOGIN_REQUEST,
			});

			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};
			const { data } = await http.post(
				"/api/auth/googlelogin",
				{ idToken: tokenId },
				config
			);

			dispatch({
				type: GOOGLE_LOGIN_SUCCESS,
				payload: data,
			});
			dispatch({
				type: USER_LOGIN_SUCCESS,
				payload: data,
			});
			localStorage.setItem("UserInfo", JSON.stringify(data));
		} catch (error) {
			dispatch({
				type: GOOGLE_LOGIN_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};
};

export const facebookOauth = (userID, accessToken) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: FACEBOOK_LOGIN_REQUEST,
			});

			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};
			const { data } = await http.post(
				"/api/auth/facebooklogin",
				{ userID, accessToken },
				config
			);

			dispatch({
				type: FACEBOOK_LOGIN_SUCCESS,
				payload: data,
			});
			dispatch({
				type: USER_LOGIN_SUCCESS,
				payload: data,
			});
			localStorage.setItem("UserInfo", JSON.stringify(data));
		} catch (error) {
			dispatch({
				type: FACEBOOK_LOGIN_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};
};

export const login = (email, password) => async (dispatch) => {
	console.log("login");

	try {
		dispatch({
			type: USER_LOGIN_REQUEST,
		});

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		const { data } = await http.post(
			"/api/auth/login",
			{ email, password },
			config
		);

		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data,
		});
		localStorage.setItem("UserInfo", JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: USER_LOGIN_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const logout = () => (dispatch) => {
	localStorage.removeItem("UserInfo");
	dispatch({ type: USER_LOGOUT });
	dispatch({ type: USER_DETAILS_RESET });
	dispatch({ type: USER_LIST_RESET });
};

export const register = (name, email, password) => async (dispatch) => {
	console.log("register");
	try {
		dispatch({
			type: USER_REGISTER_REQUEST,
		});

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		const { data } = await http.post(
			"/api/auth/",
			{ name, email, password },
			config
		);

		dispatch({
			type: USER_REGISTER_SUCCESS,
			payload: data,
		});
		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data,
		});

		localStorage.setItem("UserInfo", JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: USER_REGISTER_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const forgotPassword = (email) => async (dispatch) => {
	console.log("forgot password action");
	try {
		dispatch({
			type: FORGOT_PASSWORD_REQUEST,
		});

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		const { data } = await http.post(
			"/api/auth/forgotpassword",
			{ email },
			config
		);
		console.log(data + " of forgotpassword");
		dispatch({
			type: FORGOT_PASSWORD_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: FORGOT_PASSWORD_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
export const resetPassword = (resettoken, password) => async (dispatch) => {
	console.log("forgot password action");
	try {
		dispatch({
			type: RESET_PASSWORD_REQUEST,
		});

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		const { data } = await http.post(
			"/api/auth/resetpassword/" + resettoken,
			{ password },
			config
		);
		console.log(data + " of resetpassword");
		dispatch({
			type: RESET_PASSWORD_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: RESET_PASSWORD_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
