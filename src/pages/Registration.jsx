import React, { useContext } from "react";
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import { AuthContext } from "../context";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useFetching } from "../hooks/useFetching";

const Registration = () => {
    const { register, handleSubmit, errors } = useForm({
        mode: "onBlur",
    });
    const onSubmit = (data) => {
        data.age = Number(data.age)
        console.log(data)
        try {
            const responce = axios.post('http://localhost:8080/registration', data)
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <div>
            <h1>Registration page..</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <MyInput {...register('email', { required: true })} label="E-mail" type="email" placeholder="Введите E-mail" id="email" name="email" />
                <MyInput {...register('password', { required: true })} label="Пароль" type="password" placeholder="Введите пароль" id="password" name="password" />
                <MyInput {...register('age', { required: true })} label="Возраст" type="number" placeholder="Введите возраст" id="age" name="age" />
                <MyInput {...register('name', { required: true })} label="Имя" type="text" placeholder="Введите имя" id="name" name="name" />
                <MyInput {...register('surname', { required: true })} label="Фамилия" type="text" placeholder="Введите фамилию" id="surname" name="surname" />
                <MyButton  className="green">Registration</MyButton>
            </form>
        </div>
    )
}

export default Registration;