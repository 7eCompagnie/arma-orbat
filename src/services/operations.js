import {getFetch} from "../lib/fetch";

export const getOperations = () => {
	return getFetch(`${process.env.REACT_APP_API_ENDPOINT}/operations`)
}