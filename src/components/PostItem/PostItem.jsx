import React from "react";
import MyButton from "../UI/button/MyButton";
import { Link, useNavigate } from 'react-router-dom';
import './PostItemM.css';

const PostItem = (props) => {
    const navigate = useNavigate()
    return (
        <div className="post">
            <div className="post-header">
                <Link to={`/profile/${props.post.owner_id}`} className="user-name">
                    профиль пользователя
                </Link>
            </div>
            <h2 className="post-title">{props.post.title}</h2>
            {props.imgurl && <img src={props.imgurl} alt={props.post.title} className="post-image" />}
            <h3 className="post-content">{props.post.body}</h3>
            <div>
                <MyButton className="green" onClick={() => navigate(`/posts/${props.post.id}`)}>Открыть</MyButton>
            </div>
        </div>
    );
}
export default PostItem;