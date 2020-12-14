import {combineReducers} from 'redux'
import {postsReducer} from './postsReducer'
import {loaderReducer} from './loaderReducer'
import {usersReducer} from "./usersReducer";

export const rootReducer = combineReducers({
    posts: postsReducer,
    loader: loaderReducer,
    user: usersReducer
})
