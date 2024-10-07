import axios from "axios";
import { config } from "react-transition-group";

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
        const URL = 'http://localhost:8080/profile/' + id
        const responce = await axios.get(URL)
        return responce
    }
    static async loginUser(data) {
        const URL = 'http://localhost:8080/login'
        const responce = await axios.post(URL,data)
        return responce
    }
    static async logoutUser(data) {
        const URL = 'http://localhost:8080/logout'
        const responce = await axios.post(URL,data)
        return responce
    }
}