import http from "../httpService";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { USER_LOGIN_SUCCESS } from "../constants/authConstants";

// <----------- Queries ---------->

const getUserDetailsById = async (userId, token) => {
	console.log(userId, "userId");
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const { data } = await http.get(`/api/users/${userId}`, config);
	return data;
};

export const useListUserDetailsById = (id, token) => {
	console.log("id", id);
	const { data, error, isLoading, isError, isSuccess } = useQuery(
		["userDetails", id],
		() => getUserDetailsById(id, token)
	);
	return [data, isLoading, isSuccess];
};

const getListOfUsers = async (pageNumber, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const { data } = await http.get(
		`/api/users?pageNumber=${pageNumber}`,
		config
	);
	return data;
};

export const useListOfUsers = (pageNumber = 1, token) => {
	const { data, error, isLoading, isError } = useQuery(
		["listUsers", pageNumber],
		() => getListOfUsers(pageNumber, token)
	);
	return [data, isLoading];
};

// <----------- Mutations ---------->

const deleteUserById = async ({ id, token, pageNumber = 1 }) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const { data } = await http.delete(`/api/users/${id}`, config);
	return data;
};

export const useDeleteUser = () => {
	const queryClient = useQueryClient();

	const { mutateAsync, isLoading } = useMutation(deleteUserById, {
		// When mutate is called:
		onMutate: async ({ id, pageNumber }) => {
			console.log(id, pageNumber);
			// Cancel any outgoing refetches (so they don't overwrite our optimistic update)
			await queryClient.cancelQueries(["listUsers", pageNumber]);

			// Snapshot the previous value
			const previousState = queryClient.getQueryData(["listUsers", pageNumber]);

			// Optimistically update to the new value
			queryClient.setQueryData(["listUsers", pageNumber], (old) => {
				let newState = {
					...old,
					users: old.users.filter((f) => f._id !== id),
					count: old.count - 1,
				};
				console.log(newState);
				return newState;
			});

			// Return a context object with the snapshotted value
			return { previousState };
		},
		// If the mutation fails, use the context returned from onMutate to roll back
		onError: (err, { pageNumber }, context) => {
			queryClient.setQueryData(
				["listUsers", pageNumber],
				context.previousState
			);
		},
		// Always refetch after error or success:
		onSettled: (data, error, { pageNumber }, context) => {
			console.log(pageNumber);
			queryClient.invalidateQueries(["listUsers", pageNumber]);
		},
	});

	return [mutateAsync, isLoading];

	// on the page to call the action : destruct mutateAsync and call it: await mutateAsync(id,token)
};

const updateUserProfile = async ({ user, token }) => {
	console.log(user, token);
	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};
	const { data } = await http.put(`/api/users/profile`, user, config);
	return data;
};

export const useUpdateUserProfile = () => {
	const dispatch = useDispatch();
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const { mutateAsync, isLoading, isSuccess, error, isError } = useMutation(
		updateUserProfile,
		{
			onSuccess: (data) => {
				console.log(data);
				dispatch({
					type: USER_LOGIN_SUCCESS,
					payload: data,
				});
				data.token = userInfo.token;
				localStorage.setItem("UserInfo", JSON.stringify(data));
			},
		}
	);
	return [mutateAsync, isLoading, isSuccess, isError, error];

	// on the page to call the action : destruct mutateAsync and call it: await mutateAsync(id,token)
};

const adminUpdateUser = async ({ id, user, token }) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};
	const { data } = await http.put(`/api/users/${id}`, user, config);
	return data;
};

export const useAdminUpdateUser = () => {
	const queryClient = useQueryClient();
	const dispatch = useDispatch();
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	const { mutateAsync, isLoading, isSuccess, error, isError } = useMutation(
		adminUpdateUser,
		{
			onSuccess: (data) => {
				queryClient.invalidateQueries(["listUsers", 1]);
				dispatch({
					type: USER_LOGIN_SUCCESS,
					payload: data,
				});
				data.token = userInfo.token;
				localStorage.setItem("UserInfo", JSON.stringify(data));
			},
		}
	);

	return [mutateAsync, isLoading, isSuccess, isError, error];

	// on the page to call the action : destruct mutateAsync and call it: await mutateAsync(id,token)
};
