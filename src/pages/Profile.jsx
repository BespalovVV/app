import axios from 'axios';
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
    const [modal, setModal] = useState(false)
    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }
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
                    <dd>{new Date(user.date).toLocaleDateString('ru-RU', options)}</dd>
                </dl>
            }
            <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)} >
                Create Post
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost} />
            </MyModal>
            <PostList remove={removePost} posts={posts} title={'name of list of posts:'} />
        </div>
    );
}

export default Profile;