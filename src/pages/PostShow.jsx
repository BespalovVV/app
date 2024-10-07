import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetching } from "../hooks/useFetching";
import PostService from "../API/PostService";
import MyLoading from "../components/UI/Loader/MyLoading";
const PostShow = () => {
    const params = useParams()
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
    const [fetchPostById, isPostLoading, error] = useFetching(async (id) => {
        const responce = await PostService.getById(params.id)
        setPost(responce.data);
    })
    const [fetchComments, isCommLoading, comError] = useFetching(async (id) => {
        const responce = await PostService.getCommentsByPostId(params.id)
        setComments(responce.data)
    })

    useEffect(() => {
        fetchPostById()
        fetchComments()
    },[])

    return(
        <div>
            post page//// = {params.id}
            {isPostLoading
            ? <MyLoading/>
            :<div>{post.id}. {post.post_name}</div>
            }

            <h1>
                Comments
            </h1>
            {isCommLoading
            ? <MyLoading/>
            : <div>{comments.map(comm =>
                <div key={comm.id} style={{marginTop: 15}}>
                    <h5>{comm.owner_id}</h5>
                    <h5>{comm.comm_body}</h5>
                </div>
            )}</div>
            }

        </div>
    )
}
export default PostShow;