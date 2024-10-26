import React, { useState } from 'react';
import UserCard from '../components/UserCard/UserCard';
import MyInput from '../components/UI/input/MyInput';

const FriendsSearchPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [users] = useState([
        { id: 1, firstName: 'Иван', lastName: 'Иванов', photoUrl: 'https://via.placeholder.com/60' },
        { id: 2, firstName: 'Анна', lastName: 'Петрова', photoUrl: 'https://via.placeholder.com/60' },
        { id: 3, firstName: 'Сергей', lastName: 'Сидоров', photoUrl: 'https://via.placeholder.com/60' },
        { id: 4, firstName: 'Мария', lastName: 'Кузнецова', photoUrl: 'https://via.placeholder.com/60' },
        // Добавьте больше пользователей для тестирования
    ]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredUsers = users.filter(user =>
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h1>Поиск друзей</h1>
            <MyInput
                type="text"
                placeholder="Введите имя или фамилию"
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <div>
                {filteredUsers.length > 0 ? (
                    filteredUsers.map(user => (
                        <UserCard key={user.id} user={user} />
                    ))
                ) : (
                    <p>Пользователи не найдены</p>
                )}
            </div>
        </div>
    );
};

export default FriendsSearchPage;