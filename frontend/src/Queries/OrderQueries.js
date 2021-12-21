import { useMutation, useQuery, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { CART_CLEAR_ITEMS } from "../constants/cartConstants";
import http from "../httpService";

// <----------- Queries ---------->
const getOrderDetailsById = async (orderId, token) => {
	console.log(orderId, "orderId");
	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};
	const { data } = await http.get(`/api/orders/${orderId}`, config);
	return data;
};

export const useListOrderDetailsById = (orderId, token) => {
	console.log("id", orderId);
	const { data, error, isLoading, isError } = useQuery(
		["orderDetails", orderId],
		() => getOrderDetailsById(orderId, token)
	);
	return [data, isLoading];
};

const getListOfOrders = async (token, pageNumber = 1) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const { data } = await http.get(
		`/api/orders/?pageNumber=${pageNumber}`,
		config
	);
	return data;
};

export const useListOfOrders = (token, pageNumber = 1) => {
	const { data, error, isLoading, isError } = useQuery("ordersList", () =>
		getListOfOrders(token, pageNumber)
	);
	return [data, isLoading];
};

const getListOfUserOrders = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const { data } = await http.get(`/api/orders/myorders`, config);
	return data;
};

export const useListOfUserOrders = (token) => {
	const { data, error, isLoading, isError } = useQuery("myOrdersList", () =>
		getListOfUserOrders(token)
	);
	return [data, isLoading];
};

// <----------- Mutations ---------->
const createNewOrder = async ({ order, token }) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};
	const { data } = await http.post(`/api/orders`, order, config);
	return data;
};

export const useCreateOrder = () => {
	const dispatch = useDispatch();

	const { mutateAsync, isLoading, isSuccess, data } = useMutation(
		createNewOrder,
		{
			onSuccess: () => {
				dispatch({
					type: CART_CLEAR_ITEMS,
				});
				localStorage.removeItem("cartItems");
			},
		}
	);
	return [mutateAsync, isLoading, isSuccess, data];
};

const deliverOrder = async ({ orderId, token }) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};
	await http.put(`/api/orders/${orderId}/deliver`, {}, config);
};

export const useDeliverOrder = () => {
	const queryClient = useQueryClient();

	const { mutateAsync, isLoading, isSuccess } = useMutation(deliverOrder, {
		onSuccess: (data, variables, context) => {
			queryClient.invalidateQueries(["orderDetails", variables.orderId]);
		},
	});
	return [mutateAsync, isLoading, isSuccess];
};

const payOrder = async ({ orderId, token }) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};
	await http.put(`/api/orders/${orderId}/pay`, {}, config);
};

export const usePayOrder = () => {
	const queryClient = useQueryClient();

	const { mutateAsync, isLoading } = useMutation(payOrder, {
		onSuccess: (data, variables, context) => {
			queryClient.invalidateQueries(["orderDetails", variables.orderId]);
		},
	});
	return [mutateAsync, isLoading];
};

const shipOrder = async ({ orderId, token }) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};
	await http.put(`/api/orders/${orderId}`, {}, config);
};

export const useShipOrder = () => {
	const queryClient = useQueryClient();

	const { mutateAsync, isLoading } = useMutation(shipOrder, {
		onSuccess: (data, variables, context) => {
			queryClient.invalidateQueries(["orderDetails", variables.orderId]);
		},
	});
	return [mutateAsync, isLoading];
};

const deleteOrder = async ({ orderId, token }) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};
	await http.put(`/api/orders/${orderId}`, {}, config);
};

export const useDeleteOrder = () => {
	const queryClient = useQueryClient();

	const { mutateAsync, isLoading } = useMutation(deleteOrder, {
		onSuccess: (data, variables, context) => {
			queryClient.invalidateQueries(["orderDetails", variables.orderId]);
		},
	});
	return [mutateAsync, isLoading];
};
