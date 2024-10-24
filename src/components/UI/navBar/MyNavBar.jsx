import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MyButton from '../button/MyButton';
import { AuthContext } from '../../../context';
import './MyNavBar.css';

function MyNavBar() {
    const { isAuth, setIsAuth } = useContext(AuthContext)
    const logout = (e) => {
        e.preventDefault();
        setIsAuth(false);
        localStorage.removeItem('auth');
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
    }
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(true);
    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };
    const profile_link = /profile/ + localStorage.getItem('user_id')
    const links = [
        { name: 'Главная', path: '/' },
        { name: 'О нас', path: '/about' },
        { name: 'Contact', path: '/contact' },
        { name: 'Новости', path: '/posts' },
        { name: 'Зарегистрироваться', path: '/registration' },
        { name: 'Войти', path: '/login' },
        { name: 'Мой профиль', path: profile_link },
    ];
    return (
        <div className={`navbar ${isOpen ? 'open' : 'closed'}`}>
            <MyButton className="toggle-button" onClick={toggleNavbar}>
                {isOpen ? '❌' : '☰'}
            </MyButton>
            <div className="links">
                {links.map(link => (
                    <Link
                        key={link.path}
                        to={link.path}
                        className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                    >
                        {link.name}
                    </Link>
                ))}
            </div>
            <MyButton className="toggle-button red" onClick={logout}>
                Выйти
            </MyButton>
        </div>
    );
}

export default MyNavBar;