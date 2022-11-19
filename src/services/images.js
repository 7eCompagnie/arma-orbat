import {getFetch} from "../lib/fetch";

export const getImages = () => {
	return getFetch(`${process.env.REACT_APP_API_ENDPOINT}/images`)
}