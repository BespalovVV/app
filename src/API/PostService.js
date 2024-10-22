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
        console.log(headers);
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
        console.log(headers);
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
        console.log(headers);
        const responce = await axios.get(URL, {headers: {
            'Authorization': 'Bearer ' + token
        }})
        return responce
    }

}