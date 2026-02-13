export const API_URL = import.meta.env.VITE_SERVER_URL

if (!API_URL) {
    throw new Error('API url is missing in env')
}

