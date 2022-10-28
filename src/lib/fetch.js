export const getFetch = (url, params = {}) => {
    const queryString = Object.entries(params).map((param) => {
        return `${param[0]}=${param[1]}`;
    }).join('&');

    return fetch(`${url}?${queryString}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }}).then(res => res.json())
};

export const postFetch = (url, body) => {
    return fetch(`${url}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(res => res.json())
}

export const deleteFetch = (url) => {
    return fetch(`${url}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());
}

export const patchFetch = (url, body) => {
    return fetch(`${url}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(res => res.json())
}

export const postFormDataFetch = (url, body) => {
    return fetch(`${url}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: body
    }).then(res => res.json())
}