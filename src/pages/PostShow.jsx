import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetching } from "../hooks/useFetching";
import PostService from "../API/PostService";
import MyLoading from "../components/UI/Loader/MyLoading";
import MyButton from "../components/UI/button/MyButton";
import MyInput from "../components/UI/input/MyInput";
import { CSSTransition, TransitionGroup } from "react-transition-group";
const PostShow = () => {
    const params = useParams()
    const [post, setPost] = useState({})
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState([]);
    const [fetchPostById, isPostLoading, error] = useFetching(async (id) => {
        const responce = await PostService.getById(params.id)
        setPost(responce.data);
    })
    const [fetchComments, isCommLoading, comError] = useFetching(async (id) => {
        const responce = await PostService.getCommentsByPostId(params.id)
        setComments(responce.data)
    })
    const handleAddComment = () => {
        if (commentText.trim()) {
            setComments([...comments, commentText]);
            setCommentText('');
        }
    };

    useEffect(() => {
        fetchPostById()
        fetchComments()
    }, [])

    return (
        <div>
            <div className="post">
                <h2 className="post-title">{post.title}</h2>
                <p className="post-content">
                    Это содержимое поста. Здесь можно разместить текст, изображения и другую информацию.
                    {post.body}
                </p>
            </div>
            <div className="comments-section">
                <h3>Комментарии</h3>
                <TransitionGroup>
                    {comments.map((comment, index) =>
                        <CSSTransition
                            key={index}
                            timeout={500}
                            classNames="comment-item"
                        >
                            {comment.owner_id == localStorage.getItem('user_id') || post.owner_id == localStorage.getItem('user_id')
                            ? <div className="comment-item">
                                {comment.body}
                                <MyButton>Удалить</MyButton>
                            </div>
                            : <div className="comment-item">{comment.body}</div>
                            }
                        </CSSTransition>
                    )}
                </TransitionGroup>
                <div className="add-comment">
                    <MyInput
                        type="text"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Ваш комментарий"
                    />
                    <MyButton onClick={handleAddComment}>Добавить комментарий</MyButton>
                </div>
            </div>
        </div>
    )
}
export default PostShow;