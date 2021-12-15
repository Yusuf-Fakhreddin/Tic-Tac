import http from "../httpService";
import { useMutation, useQuery, useQueryClient } from "react-query";

// <----------- Queries ---------->

const getProductDetailsById = async (productId) => {
	console.log(productId, "productId");
	if (!productId) return;

	const { data } = await http.get(`/api/products/${productId}`);
	return data;
};

export const useListProductDetailsById = (id) => {
	console.log("id", id);
	const { data, error, isLoading, isError, isSuccess, refetch } = useQuery(
		["productDetails", id],
		() => getProductDetailsById(id)
	);
	return [data, isLoading, isSuccess, refetch];
};

const getListOfProducts = async (keyword = "", pageNumber = 1) => {
	console.log(keyword, pageNumber);
	const { data } = await http.get(
		`http://localhost:5000/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
	);
	return data;
};

export const useListOfProducts = (keyword = "", pageNumber = 1) => {
	console.log(keyword, pageNumber);

	const { data, error, isLoading, isError, refetch, isFetching } = useQuery(
		["listProducts", pageNumber],
		() => getListOfProducts(keyword, pageNumber)
	);
	return [data, isLoading];
};

const searchProducts = async (keyword = "", pageNumber = 1) => {
	console.log(keyword, pageNumber);
	const { data } = await http.get(
		`http://localhost:5000/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
	);
	return data;
};

export const useSearchProducts = (keyword = "", pageNumber = 1) => {
	console.log(keyword, pageNumber);

	const { data, error, isLoading, isError, refetch, isFetching } = useQuery(
		["searchProducts", pageNumber],
		() => searchProducts(keyword, pageNumber)
	);
	return [data, isLoading, refetch, isFetching];
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

const deleteProductById = async ({ id, token, pageNumber = 1 }) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	await http.delete(`/api/products/${id}`, config);
};

export const useDeleteProduct = () => {
	const queryClient = useQueryClient();

	const { mutateAsync, isLoading, isSuccess } = useMutation(deleteProductById, {
		// When mutate is called:
		onMutate: async ({ id, pageNumber }) => {
			console.log(id, pageNumber);
			// Cancel any outgoing refetches (so they don't overwrite our optimistic update)
			await queryClient.cancelQueries(["listProducts", pageNumber]);

			// Snapshot the previous value
			const previousState = queryClient.getQueryData([
				"listProducts",
				pageNumber,
			]);
			if (previousState) {
				// Optimistically update to the new value
				queryClient.setQueryData(["listProducts", pageNumber], (old) => {
					let newState = {
						...old,
						products: old.products.filter((f) => f._id !== id),
						count: old.count - 1,
					};
					console.log(newState);
					return newState;
				});

				// Return a context object with the snapshotted value
				return { previousState };
			}
		},
		// If the mutation fails, use the context returned from onMutate to roll back
		onError: (err, { pageNumber }, context) => {
			if (context)
				queryClient.setQueryData(
					["listProducts", pageNumber],
					context.previousState
				);
		},
		// Always refetch after error or success:
		onSettled: (data, error, { pageNumber }, context) => {
			console.log(pageNumber);
			queryClient.invalidateQueries(["listProducts", pageNumber]);
		},
	});

	return [mutateAsync, isLoading, isSuccess];

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
	const { mutateAsync, isLoading, isSuccess } = useMutation(createNewProduct);
	return [mutateAsync, isLoading, isSuccess];
};

const updateProduct = async ({ id, product, token }) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};
	console.log(product, "product Update");
	await http.put(`/api/products/${id}`, product, config);
};

export const useUpdateProduct = () => {
	const queryClient = useQueryClient();

	const { mutateAsync, isLoading, isSuccess, isError, error } = useMutation(
		updateProduct,
		{
			onSuccess: (data, variables, context) => {
				queryClient.invalidateQueries(["productDetails", variables.id]);
			},
		}
	);
	return [mutateAsync, isLoading, isSuccess, isError, error];
};
