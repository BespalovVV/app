import React, { useContext } from 'react';
import classes from './MyNavBar.module.css';
import { Link } from 'react-router-dom';
import MyButton from '../button/MyButton';
import { AuthContext } from '../../../context';
import axios from 'axios';

function MyNavBar() {
    const {isAuth, setIsAuth} = useContext(AuthContext)
    const logout = (e) => {
        e.preventDefault()
        setIsAuth(false);
        localStorage.removeItem('auth');
        const responce = axios.get('http://localhost:8080/api/logout')
    }
    return (
        <nav className={classes.mynavbar}>
            <MyButton onClick={logout}>
                Logout
            </MyButton>
            <ul>
                <div><Link to="/">Главная</Link></div>
                <div><Link to="/about">О нас</Link></div>
                <div><Link to="/posts">Посты</Link></div>
                <div><Link to="/registration">Зарегистрироваться</Link></div>
                <div><Link to="/login">Войти</Link></div>
                <div><Link to="/Profile/:id">Профиль</Link></div>
                {/* Другие ссылки */}
            </ul>
        </nav>
    );
}

export default MyNavBar;