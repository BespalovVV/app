import React, { useContext } from "react";
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import { AuthContext } from "../context";
import axios from "axios";
import { useForm } from "react-hook-form";
import { redirect } from "react-router-dom";
import UserService from "../API/UserService";
import { useFetching } from "../hooks/useFetching";

const Login = () => {
    const { isAuth, setIsAuth } = useContext(AuthContext)
    const { register, handleSubmit, errors } = useForm({
        mode: "onBlur",
    });
    function setToken(token) {
        localStorage.setItem('access_token', token);
    }
    const login = (data) => {
        const URL = 'http://localhost:8080/login'
        const response =  axios.post(URL,data)
        .then(function (response){

            setToken(response.data['token'])
            localStorage.setItem('id', response.data['id'])
            localStorage.setItem('refresh_token', response.data['refresh_token'])
            setIsAuth(true)
            localStorage.setItem('auth', 'true')
        }).catch(function (response){
            console.log(response)
            setIsAuth(false)
        })
    }
    return (
        <div>
            <h1>Login page..</h1>
            <form onSubmit={handleSubmit(login)}>
            <MyInput {...register('email', { required: true })} label="E-mail" type="email" placeholder="Введите E-mail" id="email" name="email" />
            <MyInput {...register('password', { required: true })} label="Пароль" type="password" placeholder="Введите пароль" id="password" name="password" />
                <MyButton className="green">Enter</MyButton>
            </form>
        </div>
    )
}

export default Login;