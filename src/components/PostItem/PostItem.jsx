import React, { useEffect, useState } from "react";
import MyButton from "../UI/button/MyButton";
import { Link, useNavigate } from 'react-router-dom';
import './PostItemM.css';
import UserService from "../../API/UserService";
import PostService from "../../API/PostService";

const PostItem = (props) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate()
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await UserService.getUserById(props.post.owner_id);
                setUser(response.data);
            } catch (error) {
                console.error("Ошибка при загрузке данных пользователя", error);
            }
        };

        fetchUser();
    }, []);
    const DeletePost = () => {
        const response = PostService.DeletePost(props.post.id);
        console.log(`Удалить пост ${props.post.id}`);
    };
    return (
        <div className="post">
            <div className="post-header">
            {user && (
                    <Link to={`/profile/${props.post.owner_id}`} className="user-name">
                        <img src={user.image.String} alt="user" className="user-avatar" /> 
                        {user.name}
                    </Link>
                )}
            </div>
            <h2 className="post-title">{props.post.title}</h2>
            {props.imgurl && <img src={props.imgurl} alt={props.post.title} className="post-image" />}
            <h3 className="post-content">{props.post.body}</h3>
            <div>
                <MyButton className="green" onClick={() => navigate(`/posts/${props.post.id}`)}>Открыть</MyButton>
                {props.post.owner_id == localStorage.getItem('id') ? <MyButton className="red" onClick={DeletePost}>Удалить</MyButton> : ''}
            </div>
        </div>
    );
}
export default PostItem;