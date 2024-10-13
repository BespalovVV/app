import React, { useEffect, useState } from 'react';
import '../styles/App.css'
import PostList from '../components/PostList';
import MyButton from '../components/UI/button/MyButton';
import PostForm from '../components/PostForm';
import PostFilter from '../components/PostFilter';
import MyModal from '../components/UI/Modal/MyModal';
import { usePosts } from '../hooks/usePosts';
import PostService from '../API/PostService';
import MyLoading from '../components/UI/Loader/MyLoading';
import { useFetching } from '../hooks/useFetching';


function Posts() {
    const [posts, setPosts] = useState([])

    const [filter, setFilter] = useState({ sort: '', query: '' })

    const [modal, setModal] = useState(false)

    const [totalCount, setTotalCount] = useState(0);

    const [limit, setLimit] = useState(10);

    const [page, setPage] = useState(1);

    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

    const [fetchPosts, isPostLoading, postError] = useFetching(async () => {
        const response = await PostService.getAll();
        setPosts(response.data)
        setTotalCount(response.headers['x-total-count'])
    })

    useEffect(
        () => {
            fetchPosts()
        }, [])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    return (
        <div className='App'>
            <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)} >
                Create Post
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost} />
            </MyModal>
            <hr style={{ margin: '15px 0' }} />
            <PostFilter filter={filter} setFilter={setFilter} />
            {postError &&
                <h1>Произошла ошибка {postError}</h1>
            }
            {isPostLoading
                ? <div style={{ display: "flex", justifyContent: "center", marginTop: "190px" }}>
                    <MyLoading />
                </div>
                : <PostList remove={removePost} posts={sortedAndSearchedPosts} title={'name of list of posts:'} />
            }
        </div>
    );
}

export default Posts;
