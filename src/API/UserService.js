import axios from "axios";
import { getToken } from "./PostService";
import Endpoint from "./endpoints";

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
        const URL = Endpoint.HOST + 'api/users/' + id
        const responce = await axios.get(URL, {headers})
        return responce
    }
    static async loginUser(data) {
        const URL = 'http://localhost:8080/login'
        const responce = await axios.post(URL,data)
        return responce
    }
    static async GetUsersNotFriend() {
        const token = getToken(); // Получаем токен из localStorage
        const headers = new Headers();
        headers.append('Authorization', 'Bearer ' + token);
        const URL = Endpoint.HOST + 'api/notfriends';
        const responce = await axios.get(URL, {headers})
        return responce
    }
    static async GetUsersFriend() {
        const token = getToken(); // Получаем токен из localStorage
        const headers = new Headers();
        headers.append('Authorization', 'Bearer ' + token);
        const URL = Endpoint.HOST + 'api/friends';
        const responce = await axios.get(URL, {headers})
        return responce
    }
    static async SendInvite() {
        const token = getToken(); // Получаем токен из localStorage
        const headers = new Headers();
        headers.append('Authorization', 'Bearer ' + token);
        const URL = Endpoint.HOST + 'api/friends';
        const responce = await axios.get(URL, {headers})
        return responce
    }
    static async AcceptInvite() {
        const token = getToken(); // Получаем токен из localStorage
        const headers = new Headers();
        headers.append('Authorization', 'Bearer ' + token);
        const URL = Endpoint.HOST + 'api/friends';
        const responce = await axios.get(URL, {headers})
        return responce
    }
    static async DeleteInvite() {
        const token = getToken(); // Получаем токен из localStorage
        const headers = new Headers();
        headers.append('Authorization', 'Bearer ' + token);
        const URL = Endpoint.HOST + 'api/friends';
        const responce = await axios.get(URL, {headers})
        return responce
    }
    static async DeleteFriend() {
        const token = getToken(); // Получаем токен из localStorage
        const headers = new Headers();
        headers.append('Authorization', 'Bearer ' + token);
        const URL = Endpoint.HOST + 'api/friends';
        const responce = await axios.get(URL, {headers})
        return responce
    }
    static async GetInvites() {
        const token = getToken(); // Получаем токен из localStorage
        const headers = new Headers();
        headers.append('Authorization', 'Bearer ' + token);
        const URL = Endpoint.HOST + 'api/invites';
        const responce = await axios.get(URL, {headers})
        return responce
    }
}