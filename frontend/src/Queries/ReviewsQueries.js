import http from "../httpService";
import { useMutation, useQueryClient } from "react-query";

const createProductReview = async ({ productId, review, token }) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};
	await http.post(`/api/reviews/${productId}`, review, config);
};

export const useCreateReview = () => {
	const queryClient = useQueryClient();

	const { mutateAsync, isLoading } = useMutation(createProductReview, {
		onSuccess: (data, variables, context) => {
			queryClient.invalidateQueries(["productDetails", variables.productId]);
		},
	});
	return [mutateAsync, isLoading];
};

const updateReview = async ({ productId, reviewId, review, token }) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};
	await http.put(`/api/reviews/${productId}/${reviewId}`, review, config);
};

export const useUpdateReview = () => {
	const queryClient = useQueryClient();

	const { mutateAsync, isLoading, isSuccess, isError, error } = useMutation(
		updateReview,
		{
			onSuccess: (data, variables, context) => {
				queryClient.invalidateQueries(["productDetails", variables.productId]);
			},
		}
	);
	return [mutateAsync, isLoading, isSuccess, isError, error];
};

const deleteReviewById = async ({ productId, reviewId, token }) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	await http.delete(`/api/reviews/${productId}/${reviewId}`, config);
};

export const useDeleteReview = () => {
	const queryClient = useQueryClient();

	const { mutateAsync, isLoading, isSuccess } = useMutation(deleteReviewById, {
		onSuccess: (data, variables, context) => {
			queryClient.invalidateQueries(["productDetails", variables.productId]);
		},
	});

	return [mutateAsync, isLoading, isSuccess];

	// on the page to call the action : destruct mutateAsync and call it: await mutateAsync(id,token)
};
