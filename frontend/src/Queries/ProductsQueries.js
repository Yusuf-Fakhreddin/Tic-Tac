import http from "../httpService";
import { useMutation, useQuery } from "react-query";

// <----------- Queries ---------->

const getProductDetailsById = async (productId) => {
	console.log(productId, "productId");
	const { data } = await http.get(`/api/products/${productId}`);
	return data;
};

export const useListProductDetailsById = (id) => {
	console.log("id", id);
	const { data, error, isLoading, isError } = useQuery(
		["productDetails", id],
		() => getProductDetailsById(id)
	);
	return [data, isLoading];
};

const getListOfProducts = async (keyword = "", pageNumber = "") => {
	const { data } = await http.get(
		`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
	);
	return data;
};

export const useListOfProducts = (keyword = "", pageNumber = "") => {
	const { data, error, isLoading, isError } = useQuery(
		["listProducts", keyword, pageNumber],
		() => getListOfProducts(keyword, pageNumber)
	);
	return [data, isLoading];
};

const getTopProducts = async () => {
	const { data } = await http.get(`/api/products/top`);
	return data;
};

export const useTopProducts = () => {
	const { data, error, isLoading, isError } = useQuery(
		["topProducts"],
		getTopProducts
	);
	return [data, isLoading];
};

// <----------- Mutations ---------->

const deleteProductById = async ({ id, token }) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	await http.delete(`/api/products/${id}`, config);
};

export const useDeleteProduct = () => {
	const { mutateAsync, isLoading } = useMutation(deleteProductById);

	return [mutateAsync, isLoading];

	// on the page to call the action : destruct mutateAsync and call it: await mutateAsync(id,token)
};

const createNewProduct = async ({ product, token }) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};
	await http.post(`/api/products`, product, config);
};

export const useCreateProduct = () => {
	const { mutateAsync, isLoading } = useMutation(createNewProduct);
	return [mutateAsync, isLoading];
};

const updateProduct = async ({ product, token }) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};
	await http.put(`/api/products/${product._id}`, product, config);
};

export const useUpdateProduct = () => {
	const { mutateAsync, isLoading } = useMutation(updateProduct);
	return [mutateAsync, isLoading];
};

const createProductReview = async ({ productId, review, token }) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};
	await http.post(`/api/products/${productId}/reviews`, review, config);
};

export const useCreateReview = () => {
	const { mutateAsync, isLoading } = useMutation(createProductReview);
	return [mutateAsync, isLoading];
};
