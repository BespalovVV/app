import React from "react";
import { useForm } from "react-hook-form";
import './PostForm.css'; // Импортируем стили
import PostService from "../../API/PostService";
import MyButton from "../UI/button/MyButton";
import MyInput from "../UI/input/MyInput";

const PostForm = ({ createPost }) => {
    const { register, handleSubmit } = useForm({
        mode: "onBlur",
    });

    const onSubmit = async (data) => {

        const response = await PostService.CreatePost(data);
        console.log(response);
        createPost(response.data); // Передаем созданный пост (если необходимо)
    };

    return (
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Title</label>
                <MyInput {...register('title', { required: true })} type="text" placeholder="Enter title" />
            </div>
            <div>
                <label>Body</label>
                <MyInput {...register('body', { required: true })} type="text" placeholder="Enter body" />
            </div>
            <div>
                <label>
                    Сделать приватным?
                    <MyInput type="checkbox" {...register('isprivate')} />
                </label>
            </div>
            <div>
                <label>
                    Прикрепить фотографию:
                    <MyInput type="text" {...register('imageurl')} />
                </label>
            </div>
            <MyButton className="green">Create Post</MyButton>
        </form>
    );
};

export default PostForm;
