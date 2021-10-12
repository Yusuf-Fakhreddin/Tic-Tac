import { useMutation } from "react-query";
import http from "../httpService";

const uploadImageProduct = async ({ file, token }) => {
	const formData = new FormData();
	formData.append("image", file);
	const config = {
		headers: {
			"Content-Type": "multipart/form-data",
			Authorization: `Bearer ${token}`,
		},
	};
	const { data } = await http.post(
		"http://127.0.0.1:5000/api/upload",
		formData,
		config
	);
	return data;
};

export const useUploadProductImage = () => {
	const { mutateAsync, isLoading, data } = useMutation(uploadImageProduct);
	return [mutateAsync, isLoading, data];
};
