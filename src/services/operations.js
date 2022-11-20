import {getFetch} from "../lib/fetch";

export const getOperations = (params) => {
	return getFetch(`${process.env.REACT_APP_API_ENDPOINT}/operations`, params)
}