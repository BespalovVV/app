import React, { useContext } from 'react';
import classes from './MyNavBar.module.css';
import { Link } from 'react-router-dom';
import MyButton from '../button/MyButton';
import { AuthContext } from '../../../context';
import axios from 'axios';

function MyNavBar() {
    const {isAuth, setIsAuth} = useContext(AuthContext)
    const logout = (e) => {
        e.preventDefault();
        setIsAuth(false);
        localStorage.removeItem('auth');
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
    }
    const profile_link = /profile/ + localStorage.getItem('user_id')
    return (
        <nav className={classes.mynavbar}>
            <ul className={classes.navbarlist}>
                <div className={classes.navbaritem}><Link to="/">Главная</Link></div>
                <div className={classes.navbaritem}><Link to="/about">О нас</Link></div>
                <div className={classes.navbaritem}><Link to="/posts">Посты</Link></div>
                <div className={classes.navbaritem}><Link to="/registration">Зарегистрироваться</Link></div>
                <div className={classes.navbaritem}><Link to="/login">Войти</Link></div>
                <div className={classes.navbaritem}><Link to={profile_link}>Профиль</Link></div>
                {/* Другие ссылки */}
                <MyButton onClick={logout} className={classes.navbaritem}>
                    Выйти
                </MyButton>
            </ul>
        </nav>
    );
}

export default MyNavBar;