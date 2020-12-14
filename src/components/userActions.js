import {CREATE_USER, HIDE_MESSAGE, SHOW_MESSAGE, LOGIN_USER, USER_CHECK_STATE} from '../actions'
import {useHistory} from 'react-router-dom'

export function createUser(user) {
    return async dispatch => {
        try {
            const response = await fetch("http://public-api.zzz.com.ua/temp.php", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: user.email,
                    password: user.password
                })
            });
            const body = await response.json()
            document.cookie="user_token=" + body.token + "; path=/"
            dispatch({
                type: CREATE_USER,
                user: user
            })
            dispatch({
                type: LOGIN_USER,
                isLoggedIn: true
            })
            window.location.href="/"
        } catch (e) {
            dispatch({
                type: SHOW_MESSAGE,
                message: e.message,
                messageType: "error"
            })
        }
    };
}

export function loginUser(user) {
    return async dispatch => {
        try {
            const response = await fetch("http://public-api.zzz.com.ua/data.php", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: user.email,
                    password: user.password
                })
            });
            const json = await response.json()
            if (!json.success) {
                dispatch({
                    type: SHOW_MESSAGE,
                    message: json.message,
                    messageType: "error"
                })
            } else {
                document.cookie="user_token=" + json.body.token + "; path=/"
                window.location.href="/"
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export function logoutUser() {
    return dispatch => {
        document.cookie="user_token=;MAX-AGE=0";
        window.location.href="/"
    }
}

export function checkIfUserLogged() {
    return async dispatch => {
        dispatch({
            type: USER_CHECK_STATE
        })
        for (var cookie of document.cookie.split(";")) {
            if (cookie.indexOf("user_token") !== -1) {
                const token = cookie.split(";")[0].split("=")[1]
                const response = await fetch("http://public-api.zzz.com.ua/auth.php", {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        token: token
                    })
                });
                const json = await response.json()
                if (json.success) {
                    dispatch({
                        type: CREATE_USER,
                        user: {
                            email: json.email
                        }
                    })
                    dispatch({
                        type: LOGIN_USER,
                        isLoggedIn: true
                    })
                }
            }
        }
    }
}

export function fireMessage(message, type) {
    return dispatch => {
        dispatch({
            type: SHOW_MESSAGE,
            messageType: type,
            message: message
        })
        setTimeout(() => {
            dispatch({
                type: HIDE_MESSAGE
            })
        }, 10)
    }
}
