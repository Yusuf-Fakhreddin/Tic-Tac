import http from "../httpService";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { USER_LOGIN_SUCCESS } from "../constants/authConstants";

// <----------- Queries ---------->

const getUserDetailsById = async (userId) => {
	console.log(userId, "userId");
	const { data } = await http.get(`/api/users/${userId}`);
	return data;
};

export const useListUserDetailsById = (id) => {
	console.log("id", id);
	const { data, error, isLoading, isError } = useQuery(
		["userDetails", id],
		() => getUserDetailsById(id)
	);
	return [data, isLoading];
};

const getListOfUsers = async (pageNumber) => {
	const { data } = await http.get(`/api/users?pageNumber=${pageNumber}`);
	return data;
};

export const useListOfUsers = (pageNumber) => {
	const { data, error, isLoading, isError } = useQuery(
		["listUsers", pageNumber],
		() => getListOfUsers(pageNumber)
	);
	return [data, isLoading];
};

// <----------- Mutations ---------->

const deleteUserById = async (id, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	await http.delete(`/api/users/${id}`, config);
};

export const useDeleteUser = () => {
	// TODO:::: Optmistic updates https://react-query.tanstack.com/guides/optimistic-updates
	const queryClient = useQueryClient();

	const { mutateAsync, isLoading } = useMutation(deleteUserById, {
		// When mutate is called:
		onMutate: async (id) => {
			// Cancel any outgoing refetches (so they don't overwrite our optimistic update)
			await queryClient.cancelQueries("listUsers");

			// Snapshot the previous value
			const previousTodos = queryClient.getQueryData("listUsers");

			// Optimistically update to the new value
			queryClient.setQueryData("todos", (old) =>
				old.filter((f) => f._id !== id)
			);

			// Return a context object with the snapshotted value
			return { previousTodos };
		},
		// If the mutation fails, use the context returned from onMutate to roll back
		onError: (err, context) => {
			queryClient.setQueryData("todos", context.previousTodos);
		},
		// Always refetch after error or success:
		onSettled: () => {
			queryClient.invalidateQueries("listUsers");
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

const adminUpdateUser = async (user, token) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};
	await http.put(`/api/users/profile`, user, config);
};

export const useAdminUpdateUser = () => {
	// TODO:::: on Success dispatch (USER_LOGIN_SUCCESS) to update the user global state if the updated user is the logged in user
	const { mutateAsync, isLoading } = useMutation(adminUpdateUser);

	return [mutateAsync, isLoading];

	// on the page to call the action : destruct mutateAsync and call it: await mutateAsync(id,token)
};
