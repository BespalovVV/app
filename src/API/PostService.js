import axios, { AxiosHeaders } from "axios";
import Endpoint from "./endpoints";
export function getToken() {
    const token = localStorage.getItem('token');
    return token;
}
export default class PostService {
    static async getAll() {
        try {
            const token = getToken(); // Получаем токен из localStorage
            const headers = new Headers();
            headers.append('Authorization', 'Bearer ' + token);
            const responce = await axios.get(Endpoint.HOST + 'api/posts', { headers })
            return responce
        } catch (e) {
            console.log(e);
        }
    }
    static async getById(id) {
        const token = getToken(); // Получаем токен из localStorage
        const headers = new Headers();
        headers.append('Authorization', 'Bearer ' + token);
        const URL = Endpoint.HOST + 'api/posts/' + id
        const responce = await axios.get(URL, { headers })
        return responce
    }
    static async getCommentsByPostId(id) {
        const token = getToken(); // Получаем токен из localStorage
        const headers = new Headers();
        headers.append('Authorization', 'Bearer ' + token);
        const URL = Endpoint.HOST + `api/posts/${id}/comments`;
        const responce = await axios.get(URL, { headers })
        return responce
    }
    static async CreatePost(data) {
        data.isprivate = data.isprivate === 'true';
        const token = getToken(); // Получаем токен из localStorage
        const headers = new Headers();
        headers.append('Authorization', 'Bearer ' + token);
        const URL = Endpoint.HOST + `api/posts`;
        const responce = await axios.post(URL, data, {headers: {
            'Authorization': 'Bearer ' + token
        }})
        return responce
    }
    static async CreateComment(data) {
        const token = getToken(); // Получаем токен из localStorage
        const headers = new Headers();
        headers.append('Authorization', 'Bearer ' + token);
        const URL = Endpoint.HOST + `api/comments`;
        const responce = await axios.post(URL, data, {headers: {
            'Authorization': 'Bearer ' + token
        }})
        return responce
    }
    static async GetUserPost(id) {
        const token = getToken(); // Получаем токен из localStorage
        const headers = new Headers();
        headers.append('Authorization', 'Bearer ' + token);
        const URL = Endpoint.HOST + `api/users/${id}/posts`;
        const responce = await axios.get(URL, {headers: {
            'Authorization': 'Bearer ' + token
        }})
        return responce
    }
    static async DeleteComment(id) {
        const token = getToken(); // Получаем токен из localStorage
        const headers = new Headers();
        headers.append('Authorization', 'Bearer ' + token);
        const URL = Endpoint.HOST + `api/comments/` + id;
        const responce = await axios.delete(URL, {headers: {
            'Authorization': 'Bearer ' + token
        }})
        return responce
    }

}