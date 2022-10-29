// fetch('http://localhost:4000/users/sign-in', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//         code
//     })
// })

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

export const getUserGuilds = (discordToken) => {
    return fetch('https://discord.com/api/users/@me/guilds', {
        headers: {
            Authorization: `Bearer ${discordToken}`
        }
    })
}