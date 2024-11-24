import axios from "axios";
import Endpoint from "./endpoints";
import { getToken, setToken } from './PostService';

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
            { refresh_token: refreshToken }, 
            { withCredentials: true }  
        );
        const newAccessToken = response.data.access_token;
        setToken('access_token', newAccessToken);
        
        return newAccessToken;
    } catch (e) {
        console.error("Ошибка при обновлении токена:", e);
        localStorage.removeItem('auth');
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

export default class UserService {
    static async CreateUser(data) {
        const URL = `${Endpoint.HOST}/registration`;
        return sendRequestWithRetry(() => axios.post(URL, data, { withCredentials: true }));
    }

    static async getUserById(id) {
        const URL = `${Endpoint.HOST}api/users/${id}`;
        return sendRequestWithRetry(async (newAccessToken) => {
            const headers = newAccessToken ? { 'Authorization': `Bearer ${newAccessToken}` } : getAuthHeaders();
            return axios.get(URL, { headers, withCredentials: true });
        });
    }

    static async loginUser(data) {
        const URL = `${Endpoint.HOST}/login`;
        return sendRequestWithRetry(() => axios.post(URL, data, { withCredentials: true }));
    }

    static async GetUsersNotFriend() {
        const URL = `${Endpoint.HOST}api/notfriends`;
        return sendRequestWithRetry(async (newAccessToken) => {
            const headers = newAccessToken ? { 'Authorization': `Bearer ${newAccessToken}` } : getAuthHeaders();
            return axios.get(URL, { headers, withCredentials: true });
        });
    }

    static async GetUsersFriend() {
        const URL = `${Endpoint.HOST}api/friends`;
        return sendRequestWithRetry(async (newAccessToken) => {
            const headers = newAccessToken ? { 'Authorization': `Bearer ${newAccessToken}` } : getAuthHeaders();
            return axios.get(URL, { headers, withCredentials: true });
        });
    }

    static async SendInvite(id) {
        const URL = `${Endpoint.HOST}api/invites`;
        id = Number(id);
        return sendRequestWithRetry(async (newAccessToken) => {
            const headers = newAccessToken ? { 'Authorization': `Bearer ${newAccessToken}` } : getAuthHeaders();
            return axios.post(URL, { "to_id": id }, { headers, withCredentials: true });
        });
    }

    static async AcceptInvite(data) {
        const URL = `${Endpoint.HOST}api/inviteaccept`;
        return sendRequestWithRetry(async (newAccessToken) => {
            const headers = newAccessToken ? { 'Authorization': `Bearer ${newAccessToken}` } : getAuthHeaders();
            return axios.post(URL, {"from_id": data}, { headers, withCredentials: true });
        });
    }

    static async DeleteInvite(data) {
        const URL = `${Endpoint.HOST}api/invites`;
        return sendRequestWithRetry(async (newAccessToken) => {
            const headers = newAccessToken ? { 'Authorization': `Bearer ${newAccessToken}` } : getAuthHeaders();
            return axios.delete(URL, {
                headers: headers,
                data: { front_id: data },
                withCredentials: true
            });
        });
    }

    static async DeleteFriend(id) {
        const URL = `${Endpoint.HOST}api/friends/${id}`;
        return sendRequestWithRetry(async (newAccessToken) => {
            const headers = newAccessToken ? { 'Authorization': `Bearer ${newAccessToken}` } : getAuthHeaders();
            return axios.delete(URL, { headers, withCredentials: true });
        });
    }

    static async GetInvites() {
        const URL = `${Endpoint.HOST}api/invites`;
        return sendRequestWithRetry(async (newAccessToken) => {
            const headers = newAccessToken ? { 'Authorization': `Bearer ${newAccessToken}` } : getAuthHeaders();
            return axios.get(URL, { headers, withCredentials: true });
        });
    }
    static async UpdateUser(id, data) {
        const URL = `${Endpoint.HOST}api/users/${id}`;
        return sendRequestWithRetry(async (newAccessToken) => {
            const headers = newAccessToken ? { 'Authorization': `Bearer ${newAccessToken}` } : getAuthHeaders();
            return axios.patch(URL, data, { headers, withCredentials: true });
        });
    }
    static async IsFriend(id) {
        const URL = `${Endpoint.HOST}api/friends/${id}`;
        return sendRequestWithRetry(async (newAccessToken) => {
            const headers = newAccessToken ? { 'Authorization': `Bearer ${newAccessToken}` } : getAuthHeaders();
            return axios.get(URL, { headers, withCredentials: true });
        });
    }
    static async GetUsersByIds(ids) {
        const URL = `${Endpoint.HOST}api/users/ids`;
        return sendRequestWithRetry(async (newAccessToken) => {
            const headers = newAccessToken ? { 'Authorization': `Bearer ${newAccessToken}` } : getAuthHeaders();
            return axios.post(URL, {"ids": ids}, { headers, withCredentials: true });
        });
    }
}