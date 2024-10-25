import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserCard.css'; // Импортируем обычный CSS

const UserCard = ({ user, className }) => {
    const navigate = useNavigate();

    const handleProfileRedirect = () => {
        navigate(`/profile/${user.id}`); // Замените на ваш маршрут профиля
    };

    const handleAddFriend = () => {
        // Логика для добавления в друзья
        console.log(`Добавить ${user.firstName} ${user.lastName} в друзья`);
    };

    return (
        <div className={`card ${className}`}>
            <img src={user.photoUrl} alt={`${user.firstName} ${user.lastName}`} className="photo" />
            <div className="info">
                <div className="name" onClick={handleProfileRedirect}>
                    {user.firstName} {user.lastName}
                </div>
                <button onClick={handleAddFriend} className="addButton">
                    Добавить в друзья
                </button>
            </div>
        </div>
    );
};

export default UserCard;