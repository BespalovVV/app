import axios from "axios";
import { config } from "react-transition-group";

export default class PostService {
    static async getAll() {
        try {
            const responce = await axios.get('http://localhost:8080/api/posts')
            return responce
        } catch (e) {
            console.log(e);
        }
    }
    static async getById(id) {
            const URL = 'http://localhost:8080/api/posts/' + id
            const responce = await axios.get(URL)
            return responce
    }
    static async getCommentsByPostId(id) {
            const URL = `http://localhost:8080/api/posts/${id}/comments`;
            const responce = await axios.get(URL)
            return responce
    }
}