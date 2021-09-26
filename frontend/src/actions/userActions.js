import {
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_DETAILS_FAIL,
	USER_UPDATE_PROFILE_REQUEST,
	USER_UPDATE_PROFILE_FAIL,
	USER_UPDATE_PROFILE_SUCCESS,
	USER_DETAILS_RESET,
	USER_LIST_REQUEST,
	USER_LIST_SUCCESS,
	USER_LIST_FAIL,
	USER_LIST_RESET,
	USER_DELETE_REQUEST,
	USER_DELETE_SUCCESS,
	USER_DELETE_FAIL,
	USER_UPDATE_REQUEST,
	USER_UPDATE_SUCCESS,
	USER_UPDATE_FAIL,
} from "../constants/userConstants";
import http from "../htppService";
const baseURL = process.env.baseURL;

export const getUserDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_DETAILS_REQUEST,
		});

		// destructring the user info from redux state to get the token
		const {
			userLogin: { userInfo },
		} = getState();
		const config = {
			headers: {
				"Content-Type": "application/json",
				// sending the user token in the request headers
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await http.get(baseURL + `/api/users/${id}`, config);

		dispatch({
			type: USER_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: USER_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_UPDATE_PROFILE_REQUEST,
		});

		// destructring the user info from redux state to get the token
		const {
			userLogin: { userInfo },
		} = getState();
		const config = {
			headers: {
				"Content-Type": "application/json",
				// sending the user token in the request headers
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await http.put(
			baseURL + `/api/users/profile`,
			user,
			config
		);

		dispatch({
			type: USER_UPDATE_PROFILE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: USER_UPDATE_PROFILE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const listUsers = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_LIST_REQUEST,
		});

		// destructring the user info from redux state to get the token
		const {
			userLogin: { userInfo },
		} = getState();
		const config = {
			headers: {
				// sending the user token in the request headers
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await http.get(baseURL + `/api/users`, config);

		dispatch({
			type: USER_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: USER_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const deleteUser = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_DELETE_REQUEST,
		});

		// destructring the user info from redux state to get the token
		const {
			userLogin: { userInfo },
		} = getState();
		const config = {
			headers: {
				// sending the user token in the request headers
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		await http.delete(baseURL + `/api/users/${id}`, config);

		dispatch({
			type: USER_DELETE_SUCCESS,
		});
	} catch (error) {
		dispatch({
			type: USER_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
export const updateUser = (user) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_UPDATE_REQUEST,
		});

		// destructring the user info from redux state to get the token
		const {
			userLogin: { userInfo },
		} = getState();
		const config = {
			headers: {
				"Content-Type": "application/json",
				// sending the user token in the request headers
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await http.put(
			baseURL + `/api/users/${user._id}`,
			user,
			config
		);

		dispatch({
			type: USER_UPDATE_SUCCESS,
		});
		dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: USER_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
