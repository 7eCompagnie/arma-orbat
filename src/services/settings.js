import {getFetch} from "../lib/fetch";

export const getSetting = (name) => {
	return getFetch(`http://localhost:4000/settings/${name}`)
}