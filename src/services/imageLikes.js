import {deleteFetch, getFetch, postFetch} from "../lib/fetch";

export const getLikesOfImage = (imageId) => {
	return getFetch(`${process.env.REACT_APP_API_ENDPOINT}/images/${imageId}/likes`)
}

export const addLike = (imageId) => {
	return postFetch(`${process.env.REACT_APP_API_ENDPOINT}/images/${imageId}/likes`)
}

export const removeLike = (imageId) => {
	return deleteFetch(`${process.env.REACT_APP_API_ENDPOINT}/images/${imageId}/likes`)
}