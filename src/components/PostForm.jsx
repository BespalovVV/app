import React, { useState } from "react";
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";

const PostForm = ({create}) => {
    const [post, setPost] = useState({ post_name: '', post_body: '' })

    const addNewPost = (e) => {
        e.preventDefault()
        const newPost = {
            ...post, id: Date.now(),
        }
        create(newPost)
        setPost({ post_name: '', post_body: '' })
    }


    return (
        <form>
            <MyInput value={post.post_name} onChange={e => setPost({ ...post, post_name: e.target.value })} type="text" placeholder='name of post' />
            <MyInput value={post.post_body} onChange={e => setPost({ ...post, post_body: e.target.value })} type="text" placeholder='text of post' />
            <MyButton onClick={addNewPost}>Create post</MyButton>
        </form>
    )
}
export default PostForm;