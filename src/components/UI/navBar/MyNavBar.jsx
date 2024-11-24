import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MyButton from '../button/MyButton';
import { AuthContext } from '../../../context';
import './MyNavBar.css';

function MyNavBar() {
    const { isAuth, setIsAuth } = useContext(AuthContext);
    const logout = (e) => {
        e.preventDefault();
        setIsAuth(false);
        localStorage.removeItem('auth');
        localStorage.removeItem('token');
        localStorage.removeItem('id');
    };

    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (!localStorage.getItem('auth')) {
            setIsAuth(false);
        }
    }, [location]);

    const profile_link = `/profile/${localStorage.getItem('id')}`;
    let links = [
        { name: 'Мой профиль', path: profile_link },
        { name: 'Новости', path: '/posts' },
        { name: 'Поиск', path: '/search' },
        { name: 'Друзья', path: '/friends' },
        { name: 'О нас', path: '/about' },
        { name: 'Приглашения', path: '/invites' },
    ];

    const check = localStorage.getItem('auth');
    if (check == null) {
        links = [
            { name: 'О нас', path: '/about' },
            { name: 'Зарегистрироваться', path: '/registration' },
        ];
    }

    const navigate = useNavigate();
    const handleRedirect = () => {
        navigate('/login');
    };

    return (
        <div className={`navbar`}>
            <MyButton className="toggle-button" onClick={toggleNavbar}>
                {isOpen ? '❌' : '☰'}
            </MyButton>

            <div className={`links ${isOpen ? 'show' : 'hide'}`}>
                {links.map((link) => (
                    <Link
                        key={link.path}
                        to={link.path}
                        className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                    >
                        {link.name}
                    </Link>
                ))}
                {check == null ? (
                    <MyButton className="toggle-button green" onClick={handleRedirect}>
                        Войти
                    </MyButton>
                ) : (
                    <MyButton className="toggle-button red" onClick={logout}>
                        Выйти
                    </MyButton>
                )}
            </div>
        </div>
    );
}

export default MyNavBar;