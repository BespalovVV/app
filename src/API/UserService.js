import axios from "axios";
import { getToken } from "./PostService";

export default class UserService {
    static async CreateUser(data) {
        try {
            const responce = await axios.post('http://localhost:8080/registration', data)
            return responce
        } catch (e) {
            console.log(e);
        }
    }
    static async getUserById(id) {
        const token = getToken(); // Получаем токен из localStorage
            const headers = new Headers();
            headers.append('Authorization', 'Bearer ' + token);
        const URL = 'http://localhost:8080/api/profile/' + id
        const responce = await axios.get(URL, {headers})
        return responce
    }
    static async loginUser(data) {
        const URL = 'http://localhost:8080/login'
        const responce = await axios.post(URL,data)
        return responce
    }
    static async logoutUser(data) {
        const URL = 'http://localhost:8080/api/logout'
        const responce = await axios.post(URL,data)
        return responce
    }
}