import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import UserService from '../API/UserService';
import PostService from '../API/PostService';
import { useFetching } from '../hooks/useFetching';
import MyLoading from '../components/UI/Loader/MyLoading';
import PostList from '../components/PostList';
import MyModal from '../components/UI/Modal/MyModal';
import MyButton from '../components/UI/button/MyButton';
import PostForm from '../components/PostForm/PostForm';
import MyInput from '../components/UI/input/MyInput';
import MyTextarea from '../components/UI/textarea/MyTextarea';

function Profile() {
    const [user, setUser] = useState({});
    const [users, setUsers] = useState({});
    const [posts, setPosts] = useState([]);
    const [isFriend, setIsFriend] = useState(false);
    const params = useParams();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({ mode: 'onBlur' });
    const [fetchUserById, isUserLoading, error] = useFetching(async (id) => {
        const response = await UserService.getUserById(params.id);
        setUser(response.data);
        setValue('name', response.data.name);
        setValue('surname', response.data.surname);
        setValue('age', response.data.age);
        setValue('description', response.data.description || '');
        setValue('image', response.data.image.String || '');

    });
    const [fetchPostsById, isPostsLoading, errorp] = useFetching(async (id) => {
        const response = await PostService.GetUserPost(params.id);
        setPosts(response.data);
        const userIds = [...new Set(response.data.map(post => post.owner_id))];
        if (userIds.length > 0) {
            const usersResponse = await UserService.GetUsersByIds(userIds);
            const usersData = usersResponse.data.reduce((acc, user) => {
                acc[user.id] = user;
                return acc;
            }, {});

            setUsers(usersData);
        }

    });
    const [fetchIsFriends, isFriendsLoading, errorf] = useFetching(async (id) => {
        const response = await UserService.IsFriend(params.id);
        setIsFriend(response.data);
    });

    useEffect(() => {
        fetchUserById();
        fetchPostsById();
        fetchIsFriends();
    }, [params.id]);

    const [modal, setModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState(user);

    const currentUserId = localStorage.getItem('id');

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id));
    };

    const styles = {
        container: {
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '16px',
            textAlign: 'center',
        },
        photo: {
            borderRadius: '50%',
            width: '100px',
            height: '100px',
        },
    };

    const applyChanges = async (data) => {
        data.age = Number(data.age);
        try {
            const updatedUser = {
                ...user,
                ...data,
            };
            await UserService.UpdateUser(params.id, updatedUser);
            setUser(updatedUser);
            setIsEditing(false);
        } catch (error) {
            console.error('Ошибка при обновлении профиля:', error);
        }
    };

    const cancelChanges = () => {
        setEditedUser(user);
        setIsEditing(false);
    };

    const onSubmit = (data) => {
        applyChanges(data);
    };
    const InviteFriend = async () => {
        UserService.SendInvite(params.id);
    }
    const DeleteFriend = async () => {
        UserService.DeleteFriend(params.id);
    }

    return (
        <div style={styles.container}>
            {isUserLoading
                ? (<MyLoading />)
                : error ? <div className="error-message">Error loading profile: {error}</div>
                    : <dl className="profile-info">
                        <h3>Фото:</h3>
                        {isEditing
                            ? <MyInput
                                type="text"
                                name="image"
                                defaultValue={user.image && user.image.String ? user.image.String : ""}
                                placeholder="Введите ссылку на изображение"
                                {...register('image')}
                            />
                            : <img
                                src={user.image && user.image.String ? user.image.String : "https://animego.org/media/cache/thumbs_250x350/upload/anime/images/66ebd84b4d6a1541820597.jpg"}
                                alt={`${user.name} ${user.surname}`}
                                style={styles.photo}
                            />}
                        <h1>
                            {isEditing
                                ? <div>Имя: <MyInput
                                    type="text"
                                    name="name"
                                    defaultValue={user.name}
                                    {...register('name', { required: "Поле обязательно к заполнению" })}
                                />
                                </div>
                                : user.name}
                            {errors?.name && <p style={{ color: 'red' }}>{errors?.name?.message}</p>} {isEditing
                                ? <div>Фамилия: <MyInput
                                    type="text"
                                    name="surname"
                                    defaultValue={user.surname}
                                    {...register('surname', { required: "Поле обязательно к заполнению" })}
                                />
                                </div>
                                : user.surname}
                            {errors?.surname && <p style={{ color: 'red' }}>{errors?.surname?.message}</p>}
                        </h1>
                        <h2>
                            Возраст: {isEditing
                                ? <MyInput
                                    pattern="^[0-9]*$"
                                    name="age"
                                    defaultValue={user.age}
                                    {...register('age', {
                                        required: "Поле обязательно к заполнению", pattern: {
                                            value: /^\d+$/,
                                            message: "Некорректный формат возраста"
                                        }, min: 18, max: 130
                                    })}
                                    onInput={(e) => {
                                        e.target.value = e.target.value.replace(/[^0-9]/g, '');
                                    }}
                                    inputMode="numeric"
                                />
                                : user.age}
                            {errors?.age && <p style={{ color: 'red' }}>{errors?.age?.message}</p>}
                        </h2>
                        <h3>Описание:</h3>
                        <h3>
                            {isEditing
                                ? <MyTextarea
                                    name="description"
                                    defaultValue={user.description}
                                    {...register('description')}
                                />
                                : user.description}
                        </h3>
                        <dt>Дата регистрации: {new Date(user.date).toLocaleDateString('ru-RU', { year: "numeric", month: "long", day: "numeric" })}</dt>
                    </dl>
            }
            {currentUserId === params.id && !isEditing ? (
                <MyButton className="green" onClick={() => setIsEditing(true)}>
                    Редактировать профиль
                </MyButton>
            ) : isFriend ? (
                <MyButton className="red" onClick={() => DeleteFriend()}>
                    Удалить из друзей
                </MyButton>

            ) : !currentUserId === params.id ? (
                <MyButton className="green" onClick={() => InviteFriend()}>
                    Добавить в друзья
                </MyButton>
            ) : <></>
            }
            {isEditing && (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <MyButton className="green" type="submit">
                            Применить изменения
                        </MyButton>
                        <MyButton className="red" onClick={cancelChanges}>
                            Отменить изменения
                        </MyButton>
                    </div>
                </form>
            )}
            {currentUserId === params.id ?
                <MyButton className="green" onClick={() => setModal(true)}>
                    Создать пост
                </MyButton>
                : <></>}
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm createPost={() => setModal(false)} />
            </MyModal>
            {isPostsLoading
                ? (<MyLoading />)
                : errorp
                    ? (<div className="error-message">Error loading posts: {errorp}</div>)
                    : (<PostList remove={removePost} posts={posts} title={'Посты пользователя:'} users={users} />)
            }
        </div>
    );
}

export default Profile;