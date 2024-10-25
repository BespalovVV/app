import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetching } from "../hooks/useFetching";
import PostService from "../API/PostService";
import MyLoading from "../components/UI/Loader/MyLoading";
import MyButton from "../components/UI/button/MyButton";
import MyInput from "../components/UI/input/MyInput";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import PostItem from "../components/PostItem/PostItem";
import Comment from "../components/CommentItem/Comment";
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
            <PostItem post={post} />
            <div>
                <h3>Комментарии</h3>
                    {comments.map((comment, index) =>
                        <Comment
                            key={index}
                            username="nameuser"
                            comment = {comment}
                            post = {post.owner_id}
                        >
                        </Comment>
                    )}
                <div className="add-comment">
                    <MyInput
                        type="text"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Ваш комментарий"
                    />
                    <MyButton className="green" onClick={handleAddComment}>Добавить комментарий</MyButton>
                </div>
            </div>
        </div>
    )
}
export default PostShow;