import { useMutation, useQuery } from "react-query";
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

const getListOfOrders = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const { data } = await http.get(`/api/orders`, config);
	return data;
};

export const useListOfOrders = (token) => {
	const { data, error, isLoading, isError } = useQuery("ordersList", () =>
		getListOfOrders(token)
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
	const { mutateAsync, isLoading } = useMutation(deliverOrder);
	return [mutateAsync, isLoading];
};

const payOrder = async ({ orderId, paymentResult, token }) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};
	await http.put(`/api/orders/${orderId}/pay`, {}, config);
};

export const usePayOrder = () => {
	const { mutateAsync, isLoading } = useMutation(payOrder);
	return [mutateAsync, isLoading];
};
