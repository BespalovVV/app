import React, { useEffect, useState } from 'react';
import UserService from '../API/UserService';
import { useFetching } from '../hooks/useFetching';
import MyLoading from '../components/UI/Loader/MyLoading';
import { useParams } from 'react-router-dom';
import PostService from '../API/PostService';
import PostList from '../components/PostList';
import MyModal from '../components/UI/Modal/MyModal';
import MyButton from '../components/UI/button/MyButton';
import PostForm from '../components/PostForm';

function Profile() {
    const [user, setUser] = useState({})
    const [posts, setPosts] = useState([])
    const params = useParams()
    const [fetchUserById, isUserLoading, error] = useFetching(async (id) => {
        const responce = await UserService.getUserById(params.id)
        setUser(responce.data);
    })
    const [fetchPostsById, isPostsLoading, errorp] = useFetching(async (id) => {
        const responce = await PostService.GetUserPost(params.id)
        setPosts(responce.data);
    })
    useEffect(() => {
        fetchUserById()
        fetchPostsById()
    }, [])
    let options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
    }
    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }
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
    const [modal, setModal] = useState(false)
    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }
    const photoUrl = 'https://animego.org/media/cache/thumbs_250x350/upload/anime/images/66ebd84b4d6a1541820597.jpg'
    return (
        <div style={styles.container}>
            {isUserLoading
                ? <MyLoading />
                : <dl className="profile-info">
                    <img src={photoUrl} alt={`${user.name} ${user.surname}`} style={styles.photo} />
                    <h1>{user.name} {user.surname}</h1>
                    <h2>Возраст: {user.age}</h2>
                    <h3>Описание:</h3>
                    <h3>{ user.description }</h3>
                    <dt>Дата регистрации: {new Date(user.date).toLocaleDateString('ru-RU', options)}</dt>
                </dl>
            }
            <MyButton className="green" onClick={() => setModal(true)} >
                Создать пост
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost} />
            </MyModal>
            <PostList remove={removePost} posts={posts} title={'Посты пользователя:'} />
        </div>
    );
}

export default Profile;