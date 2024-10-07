import React, { useContext } from "react";
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import { AuthContext } from "../context";
import axios from "axios";
import { useForm } from "react-hook-form";
import { redirect } from "react-router-dom";

const Login = () => {
    const { isAuth, setIsAuth } = useContext(AuthContext)
    const { register, handleSubmit, errors } = useForm({
        mode: "onBlur",
    });
    const login = (e, data) => {
        e.preventDeafault();
    }
    return (
        <div>
            <h1>Login page..</h1>
            <form onSubmit={login}>
            <MyInput {...register('email', { required: true })} label="E-mail" type="email" placeholder="Введите E-mail" id="email" name="email" />
            <MyInput {...register('password', { required: true })} label="Пароль" type="password" placeholder="Введите пароль" id="password" name="password" />
                <MyButton>Enter</MyButton>
            </form>
        </div>
    )
}

export default Login;