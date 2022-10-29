export const getPlayersRanking = () => {
	return fetch(`https://api.top-serveurs.net/v1/servers/${process.env.REACT_APP_TOP_SERVEURS_TOKEN}/players-ranking`)
		.then(res => res.json())
}

export const getServerInfos = () => {
	return fetch(`https://api.top-serveurs.net/v1/servers/${process.env.REACT_APP_TOP_SERVEURS_TOKEN}/full`)
		.then(res => res.json())
}

export const userHasVoted = (username) => {
	return fetch(`https://api.top-serveurs.net/v1/votes/check?server_token=${process.env.REACT_APP_TOP_SERVEURS_TOKEN}&playername=${username}`)
		.then(res => res.json())
}