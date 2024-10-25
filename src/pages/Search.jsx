import React from 'react';
import UserCard from '../components/UserCard/UserCard';

const Search = () => {
    const user = {
        id: 1,
        firstName: 'Иван',
        lastName: 'Иванов',
        photoUrl: 'https://via.placeholder.com/60', // Замените на URL фото
    };

    return (
        <div>
            <h1>Список пользователей</h1>
            <UserCard user={user} />
        </div>
    );
};

export default Search;