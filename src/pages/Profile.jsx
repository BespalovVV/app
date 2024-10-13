import axios from 'axios';
import React, { useEffect, useState } from 'react';
import UserService from '../API/UserService';
import { useFetching } from '../hooks/useFetching';
import MyLoading from '../components/UI/Loader/MyLoading';
import { useParams } from 'react-router-dom';

function Profile() {
    const [user, setUser] = useState({})
    const [fetchUserById, isUserLoading, error] = useFetching(async (id) => {
        const responce = await UserService.getUserById(localStorage.getItem('user_id'))
        setUser(responce.data);
    })
    useEffect(() => {
        fetchUserById()
    }, [])
    return (
        <div>
            <h2>Профиль пользователя</h2>
            {isUserLoading
                ? <MyLoading />
                : <dl>
                    <dt>Имя:</dt>
                    <dd>{user.name}</dd>
                    <dt>Фамилия:</dt>
                    <dd>{user.surname}</dd>
                    <dt>Возраст:</dt>
                    <dd>{user.age}</dd>
                    <dt>Описание:</dt>
                    <dd dangerouslySetInnerHTML={{ __html: user.description }} />
                    <dt>Дата регистрации:</dt>
                    <dd>{new Intl.DateTimeFormat('ru').format(user.registrationDate)}</dd>
                </dl>
            }
        </div>
    );
}

export default Profile;