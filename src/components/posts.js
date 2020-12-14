import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Post from "./post";
import {loadPosts} from './postActions'
import Loader from "./loader";

export default () => {
    const dispatch = useDispatch()
    const postsList = useSelector(state => state.posts.postsList)
    const loading = useSelector(state => state.loader.loading)
    if (!postsList.length) {
        dispatch(loadPosts())
    }
    if (loading) {
        return (
            <Loader/>
        )
    }
    return postsList.map(post => <Post post={post} key={post.id}/>)
}
