import React from 'react';
import './Comment.css';
import MyButton from '../UI/button/MyButton';
import PostService from '../../API/PostService';

const Comment = ({...props}) => {
    const deleteComment = async () => {
        const response = await PostService.DeleteComment(props.comment.id);
    };
    return (
        <div className="comment">
            <a href={'/profile/' + props.comment.owner_id} className="comment-username">
                {props.username}
            </a>
            
            {props.comment.owner_id === Number(localStorage.getItem('id')) || props.post === Number(localStorage.getItem('id'))
                ? <div>
                    <p className="comment-text">{props.comment.body}</p>
                    <MyButton className="red" onClick={deleteComment}>Удалить</MyButton>
                </div>
                : <p className="comment-text">{props.comment.body}</p>
            }
        </div>
    );
};

export default Comment;