import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetching } from "../hooks/useFetching";
import PostService from "../API/PostService";
import MyLoading from "../components/UI/Loader/MyLoading";
import MyButton from "../components/UI/button/MyButton";
import MyInput from "../components/UI/input/MyInput";
import PostItem from "../components/PostItem/PostItem";
import Comment from "../components/CommentItem/Comment";

const PostShow = () => {
    const params = useParams();
    const [post, setPost] = useState({});
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState([]);
    const [img, setImg] = useState([]);

    const [fetchPostById, isPostLoading, postError] = useFetching(async () => {
        const response = await PostService.getById(params.id);
        setPost(response.data);
        setImg(response.data.image.String)
    });

    const [fetchComments, isCommLoading, commError] = useFetching(async () => {
        const response = await PostService.getCommentsByPostId(params.id);
        setComments(response.data);
    });

    const handleAddComment = async () => {
        if (commentText.trim()) {
            try {
                const response = await PostService.CreateComment({
                    owner_id: localStorage.getItem('user_id'),
                    body: commentText,
                    post_id: post.id
                });
                const newComment = { 
                    owner_id: localStorage.getItem('user_id'), 
                    body: commentText, 
                    post_id: post.id 
                };
                setComments([...comments, newComment]);
                setCommentText('');
            } catch (error) {
                console.error("Error adding comment:", error);
            }
        }
    };

    useEffect(() => {
        fetchPostById();
        fetchComments();
    }, []);

    return (
        <div>
            {isPostLoading ? (
                <MyLoading />
            ) : postError ? (
                <div>Error loading post: {postError.message}</div>
            ) : (
                <PostItem post={post} imgurl={img} />
            )}

            <div>
                <h3>Комментарии</h3>
                {isCommLoading ? (
                    <MyLoading />
                ) : commError ? (
                    <div>Error loading comments: {commError.message}</div>
                ) : (
                    comments.map((comment, index) => (
                        <Comment
                            key={index}
                            username="nameuser"
                            comment={comment}
                            post={post.owner_id}
                        />
                    ))
                )}
                <div className="add-comment">
                    <MyInput
                        type="text"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Ваш комментарий"
                    />
                    <MyButton className="green" onClick={handleAddComment}>
                        Добавить комментарий
                    </MyButton>
                </div>
            </div>
        </div>
    );
};

export default PostShow;