import {HIDE_MESSAGE, SHOW_MESSAGE, CREATE_USER, LOGIN_USER} from '../actions'

const defaultState = {
    message: "",
    messageType: "",
    user: null,
    isLoggedIn: false
}

export const usersReducer = function(state = defaultState, action) {
    switch (action.type) {
        case SHOW_MESSAGE :
            return {...state, message: action.message, messageType: action.messageType}
        case HIDE_MESSAGE :
            return {...state, message: "", messageType: ""}
        case CREATE_USER :
            return {...state, user: action.user}
        case LOGIN_USER :
            return {...state, isLoggedIn: true}
        default :
            return state;
    }
}
