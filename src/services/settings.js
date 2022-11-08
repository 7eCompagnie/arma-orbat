import {getFetch} from "../lib/fetch";

export const getSetting = (name) => {
	return getFetch(`${process.env.REACT_APP_API_ENDPOINT}/settings/${name}`)
}