import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import MyButton from "../UI/button/MyButton";
import './PostItemM.css';

const PostItem = ({ post, user, imgurl, remove, number }) => {
    const navigate = useNavigate();

    const DeletePost = () => {
        remove(post);
    };

    return (
        <div className="post">
            <div className="post-header">
                {user && (
                    <Link to={`/profile/${post.owner_id}`} className="user-name">
                        {user.image && (
                            <img src={user.image.String} alt="user-avatar" className="user-avatar" />
                        )}
                        {user.name}
                    </Link>
                )}
            </div>
            <h2 className="post-title">{post.title}</h2>
            {imgurl && <img src={imgurl} alt={post.title} className="post-image" />}
            <h3 className="post-content">{post.body}</h3>
            <div>
                <MyButton className="green" onClick={() => navigate(`/posts/${post.id}`)}>Открыть</MyButton>
                <MyButton className="red" onClick={DeletePost}>Удалить</MyButton>
            </div>
        </div>
    );
};

export default PostItem;