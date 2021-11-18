import axios from "axios";
import { logout } from "./actions/authActions";
import store from "./store";
const { dispatch } = store; // direct access to redux store.

axios.interceptors.response.use(null, (error) => {
	const expectedError =
		error.response &&
		error.response.status >= 400 &&
		error.response.status <= 500;

	if (!expectedError) {
		console.log("Logging the error", error);
		error.message = "An unexpected error has occurred.";
	} else {
		console.log("Logging the expected error", error);
		error.message = error.response.data.message
			? error.response.data.message
			: error.response.statusText + " " + error.response.status;
	}
	// Logout if the token expired or after a request with not allowed token
	console.log(error.response.status);
	if (error.response.status === 401) {
		dispatch(logout());
	}
	// to pass the control to the catch block and resume the function we return a rejected promise
	return Promise.reject(error);
});

const http = {
	get: axios.get,
	post: axios.post,
	put: axios.put,
	delete: axios.delete,
};

export default http;
