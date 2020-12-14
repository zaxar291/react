import {LOAD_POSTS, SHOW_LOADER, HIDE_LOADER, SHOW_MESSAGE, ACCESS_TOKEN, LOAD_COMMENTS} from "../actions";

export function loadPosts() {
    return async dispatch => {
        dispatch({type: SHOW_LOADER})
        try {
            const response = await fetch('https://gorest.co.in/public-api/posts')
            const json = await response.json()
            dispatch({type: LOAD_POSTS, posts: json?.data})
            dispatch({type: HIDE_LOADER})
        } catch (e) {
            console.log(e)
        }
    }
}

export function loadComments() {
    return async dispatch => {
        dispatch({type: SHOW_LOADER})
        try {
            const response = await fetch('https://gorest.co.in/public-api/comments')
            const json = await response.json()
            dispatch({type: LOAD_COMMENTS, comments: json?.data})
            dispatch({type: HIDE_LOADER})
        } catch (e) {
            console.log(e)
        }
    }
}

export function addComment(comment) {
    return async dispatch => {
        dispatch({type: SHOW_LOADER})
        try {
            const response = await fetch('https://gorest.co.in/public-api/posts/' + comment.postId + '/comments', {
                method: "POST",
                body: JSON.stringify({
                    name: comment.name,
                    email: comment.email,
                    body: comment.comment
                }),
                headers: {
                    'Authorization': 'Bearer ' + ACCESS_TOKEN,
                    'Content-Type': 'application/json'
                }
            })
            const json = await response.json()
            dispatch({type: HIDE_LOADER})
            dispatch({type: SHOW_MESSAGE, message: "Comment successfully added!", messageType: "success"})
        } catch (e) {
            console.log(e)
        }
    }
}
