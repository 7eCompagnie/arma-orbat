import {deleteFetch, getFetch, postFormDataFetch} from "../lib/fetch";

export const getImages = () => {
	return getFetch(`${process.env.REACT_APP_API_ENDPOINT}/images`, {
		sortBy: "createdAt",
		orderBy: "desc"
	})
}

export const createImage = (operationId, data) => {
	return postFormDataFetch(`${process.env.REACT_APP_API_ENDPOINT}/operations/${operationId}/images`, data);
}

export const deleteImage = (id) => {
	return deleteFetch(`${process.env.REACT_APP_API_ENDPOINT}/images/${id}`);
}