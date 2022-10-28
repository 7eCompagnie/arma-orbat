// fetch('http://localhost:4000/users/sign-in', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//         code
//     })
// })

import {postFetch} from "../lib/fetch";

export const signIn = (code) => {
    return postFetch('http://localhost:4000/users/sign-in',{code: code})
}