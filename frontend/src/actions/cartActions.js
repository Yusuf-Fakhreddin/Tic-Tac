import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_SAVE_SHIPPING_ADDRESS,
	CART_SAVE_PAYMENT_METHOD,
	CART_FROM_SERVER,
} from "../constants/cartConstants";
import http from "../httpService";

export const getCartFromBackend = () => async (dispatch, getState) => {
	const {
		userLogin: { userInfo },
	} = getState();

	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${userInfo.token}`,
		},
	};

	const { data } = await http.get(`/api/cart/mycart`, config);
	console.log(data);
	dispatch({
		type: CART_FROM_SERVER,
		payload: data,
	});

	localStorage.setItem(
		"cartItems",
		JSON.stringify(getState().cartState.cartItems)
	);
};

export const addItemsToBackendCart = (items) => async (dispatch, getState) => {
	const {
		userLogin: { userInfo },
	} = getState();

	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${userInfo.token}`,
		},
	};

	const { data } = await http.post(`/api/cart`, { items }, config);
	dispatch({
		type: CART_FROM_SERVER,
		payload: data,
	});

	localStorage.setItem(
		"cartItems",
		JSON.stringify(getState().cartState.cartItems)
	);
};

export const addToCart = (id, qty) => async (dispatch, getState) => {
	const { data } = await http.get(`/api/products/${id}`);
	const {
		userLogin: { userInfo },
	} = getState();

	if (userInfo) {
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		await http.post(
			`/api/cart`,
			{
				items: [
					{
						product: {
							_id: data._id,
							name: data.name,
							image: data.image,
							price: data.price,
							countInStock: data.countInStock,
						},
						qty,
					},
				],
			},
			config
		);
	}

	dispatch({
		type: CART_ADD_ITEM,
		payload: {
			product: {
				_id: data._id,
				name: data.name,
				image: data.image,
				price: data.price,
				countInStock: data.countInStock,
			},
			qty,
		},
	});

	localStorage.setItem(
		"cartItems",
		JSON.stringify(getState().cartState.cartItems)
	);
};

export const removeFromCart = (id) => async (dispatch, getState) => {
	const {
		userLogin: { userInfo },
	} = getState();

	if (userInfo) {
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		await http.delete(`/api/cart/${id}`, config);
	}

	dispatch({
		type: CART_REMOVE_ITEM,
		payload: id,
	});

	localStorage.setItem(
		"cartItems",
		JSON.stringify(getState().cartState.cartItems)
	);
};

export const saveShippingAddress = (data) => (dispatch) => {
	dispatch({
		type: CART_SAVE_SHIPPING_ADDRESS,
		payload: data,
	});

	localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
	dispatch({
		type: CART_SAVE_PAYMENT_METHOD,
		payload: data,
	});

	localStorage.setItem("paymentMethod", JSON.stringify(data));
};
