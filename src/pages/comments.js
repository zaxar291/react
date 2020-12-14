import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/loader";
import {loadComments} from "../components/postActions";
import Comment from "../components/comment";

export default function Comments() {
    const dispatch = useDispatch()
    const commentsList = useSelector(state => state.posts.commentsList)
    const loading = useSelector(state => state.loader.loading)
    if (!commentsList.length) {
        dispatch(loadComments())
    }
    if (loading) {
        return (
            <Loader/>
        )
    }
    return commentsList.map(comment => <Comment comment={comment} key={comment.id} />)
}
