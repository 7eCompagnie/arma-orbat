import {getFetch, postFetch} from "../lib/fetch";

export const signIn = (code) => {
    return postFetch('http://localhost:4000/users/sign-in',{code: code})
}

export const isTrainer = async (user) => {
    const trainings = await getFetch(`http://localhost:4000/trainings/`)

    for (let training of trainings) {
        for (let trainer of training.trainers) {
            if (trainer.userId === user.id)
                return true
        }
    }
    return false
}

export const getUserFromToken = (token) => {
    return getFetch('http://localhost:4000/users/token', {
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