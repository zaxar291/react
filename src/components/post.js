import React from 'react'
import {useSelector} from "react-redux";
import Comments from "./comments";

export default ({post}) => {
    const isLogged = useSelector(state => state.user.isLoggedIn)
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{post.title} </h5>
                <p className="card-text">{post.body}</p>
                {isLogged && <Comments post={post}/>}
            </div>
        </div>
    )
}
