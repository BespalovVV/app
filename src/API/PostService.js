import axios, { AxiosHeaders } from "axios";
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
            const responce = await axios.get('http://localhost:8080/api/posts', { headers })
            return responce
        } catch (e) {
            console.log(e);
        }
    }
    static async getById(id) {
        const token = getToken(); // Получаем токен из localStorage
        const headers = new Headers();
        headers.append('Authorization', 'Bearer ' + token);
        const URL = 'http://localhost:8080/api/posts/' + id
        const responce = await axios.get(URL, { headers })
        return responce
    }
    static async getCommentsByPostId(id) {
        const token = getToken(); // Получаем токен из localStorage
        const headers = new Headers();
        console.log(headers);
        headers.append('Authorization', 'Bearer ' + token);
        const URL = `http://localhost:8080/api/posts/${id}/comments`;
        const responce = await axios.get(URL, { headers })
        return responce
    }
    static async CreatePost(data) {
        const token = getToken(); // Получаем токен из localStorage
        const headers = new Headers();
        headers.append('Authorization', 'Bearer ' + token);
        const URL = `http://localhost:8080/api/posts/create`;
        console.log(headers);
        const responce = await axios.post(URL, data, {headers: {
            'Authorization': 'Bearer ' + token
        }})
        return responce
    }
}