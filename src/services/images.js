import {deleteFetch, getFetch, postFormDataFetch} from "../lib/fetch";

export const getImages = () => {
	return getFetch(`${process.env.REACT_APP_API_ENDPOINT}/images`, {
		sortBy: "createdAt",
		orderBy: "desc"
	})
}

export const createImage = (data) => {
	return postFormDataFetch(`${process.env.REACT_APP_API_ENDPOINT}/operations/244cb227-ca61-4678-bfc5-17eddca69e40/images`, data);
}

export const deleteImage = (id) => {
	return deleteFetch(`${process.env.REACT_APP_API_ENDPOINT}/images/${id}`);
}