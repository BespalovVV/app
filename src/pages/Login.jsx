import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import { AuthContext } from "../context";
import axios from "axios";
import { useForm } from "react-hook-form";

const Login = () => {
    const { setIsAuth } = useContext(AuthContext); // Получаем функцию для установки состояния авторизации
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onBlur", // Переход к валидации при потере фокуса
    });

    const navigate = useNavigate(); // Хук для редиректа

    function setToken(token) {
        localStorage.setItem('access_token', token);
    }

    const login = async (data) => {
        const URL = 'http://localhost:8080/login';

        try {
            const response = await axios.post(URL, data);
            // Сохраняем данные в localStorage
            setToken(response.data.token);
            localStorage.setItem('id', response.data.id);
            localStorage.setItem('refresh_token', response.data.refresh_token);

            // Обновляем состояние авторизации
            setIsAuth(true);
            localStorage.setItem('auth', 'true');

            // Редиректим пользователя на страницу /posts
            navigate("/posts");

        } catch (error) {
            console.error(error);
            setIsAuth(false); // В случае ошибки сбрасываем авторизацию
        }
    };

    return (
        <div>
            <h1>Вход</h1>
            <form onSubmit={handleSubmit(login)}>
                <div>
                    Email
                    <MyInput 
                        {...register('email', { 
                            required: "E-mail обязателен для заполнения",
                            pattern: {
                                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                                message: "Некорректный формат email"
                            }
                        })}
                        label="E-mail"
                        type="email"
                        placeholder="Введите E-mail"
                        id="email"
                        name="email"
                        autoComplete="email"
                    />
                    <div style={{ height: 40 }}>
                    {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
                    </div>
                </div>

                <div>
                    Пароль
                    <MyInput 
                        {...register('password', { 
                            required: "Пароль обязателен для заполнения",
                            minLength: {
                                value: 5,
                                message: "Пароль должен быть не короче 5 символов"
                            }
                        })}
                        label="Пароль"
                        type="password"
                        placeholder="Введите пароль"
                        id="password"
                        name="password"
                        autoComplete="current-password"  // Атрибут autocomplete для пароля
                    />
                    <div style={{ height: 40 }}>
                    {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
                    </div>
                </div>

                <MyButton className="green">Войти</MyButton>
            </form>
        </div>
    );
};

export default Login;