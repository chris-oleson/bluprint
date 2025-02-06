const baseUrl = import.meta.env.VITE_SERVER_URL

export default {
    get(path, options) {
        return request('GET', path, options)
    },

    post(path, body, options) {
        return request('POST', path, { ...options, body })
    },

    patch(path, body, options) {
        return request('PATCH', path, { ...options, body })
    },

    put(path, body, options) {
        return request('PUT', path, { ...options, body })
    },

    delete(path, body, options) {
        return request('DELETE', path, { ...options, body })
    }
}

async function request(method, path, options = {}) {
    const { body, headers = {}, ...otherOptions } = options

    const response = await fetch(baseUrl + path, {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        credentials: "include",
        body: body ? JSON.stringify(body) : undefined,
        ...otherOptions
    })

    const parsedResponse = await parseResponse(response)

    if (!response.ok) {
        throw new Error(parsedResponse)
    }

    return parsedResponse
}

async function parseResponse(response) {
    const contentType = response.headers.get('Content-Type') || ''
    if (contentType.includes('application/json')) {
        return await response.json()
    }
    else if (contentType.includes('text/html')) {
        return await response.text()
    }
    return response
}
