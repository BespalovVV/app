import axios from "axios";
import Endpoint from "./endpoints";


export function getToken() {
    return localStorage.getItem('access_token'); 
}

export function setToken(tokenName, tokenValue) {
    localStorage.setItem(tokenName, tokenValue); 
}

export function removeToken() {
    localStorage.removeItem('access_token'); 
}

function getAuthHeaders() {
    const token = getToken(); 
    if (!token) {
        localStorage.removeItem('auth');
        throw new Error("Access token not found");
    }
    return {
        Authorization: `Bearer ${token}`,
    };
}

function getRefreshToken() {
    const refreshToken = localStorage.getItem('refresh_token'); 
    if (!refreshToken) {
        localStorage.removeItem('auth');
        
        throw new Error('Refresh token not found');
    }
    return refreshToken;
}

async function refreshAccessToken() {
    const refreshToken = getRefreshToken(); 
    try {
        const response = await axios.post(`${Endpoint.HOST}/refresh`, 
            { refresh_token:  refreshToken }, 
            { withCredentials: true } 
        );
        const newAccessToken = response.data.access_token;
        
        setToken('access_token', newAccessToken);
        localStorage.setItem('refresh_token', response.data['refresh_token'])

        return newAccessToken;
    } catch (e) {
        console.error("Ошибка при обновлении токена:", e);
        throw new Error("Session expired, please log in again.");
    }
}

async function sendRequestWithRetry(request) {
    try {
        const response = await request(); 
        return response;
    } catch (e) {
        if (e.response && e.response.status === 401) {
            try {
                const newAccessToken = await refreshAccessToken();
                
                const response = await request(newAccessToken);
                return response;
            } catch (refreshError) {
                console.error('Ошибка при обновлении токена', refreshError);
                throw new Error('Session expired, please log in again.');
            }
        }
        throw e;
    }
}

export default class PostService {
    static async getAll() {
        return sendRequestWithRetry(async () => {
            const URL = Endpoint.HOST + 'api/posts';
            const headers = getAuthHeaders();
            return await axios.get(URL, { headers, withCredentials: true }); 
        });
    }

    static async getById(id) {
        return sendRequestWithRetry(async () => {
            const URL = `${Endpoint.HOST}api/posts/${id}`;
            const headers = getAuthHeaders();
            return await axios.get(URL, { headers, withCredentials: true });
        });
    }

    static async getCommentsByPostId(id) {
        return sendRequestWithRetry(async () => {
            const URL = `${Endpoint.HOST}api/posts/${id}/comments`;
            const headers = getAuthHeaders();
            return await axios.get(URL, { headers, withCredentials: true });
        });
    }

    static async CreatePost(data) {
        data.isprivate = data.isprivate === true;
        return sendRequestWithRetry(async () => {
            const URL = `${Endpoint.HOST}api/posts`;
            const headers = getAuthHeaders();
            return await axios.post(URL, data, { headers, withCredentials: true });
        });
    }

    static async CreateComment(data) {
        return sendRequestWithRetry(async () => {
            const URL = `${Endpoint.HOST}api/comments`;
            const headers = getAuthHeaders();
            return await axios.post(URL, data, { headers, withCredentials: true });
        });
    }

    static async GetUserPost(id) {
        return sendRequestWithRetry(async () => {
            const URL = `${Endpoint.HOST}api/users/${id}/posts`;
            const headers = getAuthHeaders();
            return await axios.get(URL, { headers, withCredentials: true });
        });
    }

    static async DeleteComment(id) {
        return sendRequestWithRetry(async () => {
            const URL = `${Endpoint.HOST}api/comments/${id}`;
            const headers = getAuthHeaders();
            return await axios.delete(URL, { headers, withCredentials: true });
        });
    }
    static async DeletePost(id) {
        return sendRequestWithRetry(async () => {
            const URL = `${Endpoint.HOST}api/posts/${id}`;
            const headers = getAuthHeaders();
            return await axios.delete(URL, { headers, withCredentials: true });
        });
    }
}
