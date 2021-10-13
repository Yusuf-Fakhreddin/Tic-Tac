import axios from "axios";
import { useDispatch } from "react-redux";
import { logout } from "./actions/authActions";

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
	if (error.message === "Not authorized, token failed") {
		const dispatch = useDispatch();
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
