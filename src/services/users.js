import {getFetch, postFetch} from "../lib/fetch";

export const signIn = (code) => {
    return postFetch(`${process.env.REACT_APP_API_ENDPOINT}/users/sign-in`,{code: code})
}

export const isTrainer = async (user) => {
    const trainings = await getFetch(`${process.env.REACT_APP_API_ENDPOINT}/trainings/`)

    for (let training of trainings) {
        for (let trainer of training.trainers) {
            if (trainer.userId === user.id)
                return true
        }
    }
    return false
}

export const getUserFromToken = (token) => {
    return getFetch(`${process.env.REACT_APP_API_ENDPOINT}/users/token`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const getUserGuilds = (discordToken) => {
    return fetch('https://discord.com/api/users/@me/guilds', {
        headers: {
            Authorization: `Bearer ${discordToken}`
        }
    })
}