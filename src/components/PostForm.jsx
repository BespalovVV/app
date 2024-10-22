import React, { useState } from "react";
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";
import { useForm } from "react-hook-form";
import PostService, { getToken } from "../API/PostService";
import axios from "axios";

const PostForm = ({Create}) => {
    const { register, handleSubmit, errors } = useForm({
        mode: "onBlur",
    });
    const onSubmit = async (data) => {
        const response = await PostService.CreatePost(data)
        data.isprivate = data.isprivate === 'true'
        console.log(response)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <MyInput {...register('title', { required: true })} label="title" type="title" placeholder="title" id="title" name="title" />
            <MyInput {...register('body', { required: true })} label="body" type="body" placeholder="body" id="body" name="body" />
            <div>Сделать приватным?</div>
            <MyInput {...register('isprivate', { required: false })} type="checkbox" value='true'/>
            <MyButton>Create post</MyButton>
        </form>
    )
}
export default PostForm;