import {SHOW_LOADER, HIDE_LOADER} from '../actions'

const defaultParams = {
    loading: false
}

export const loaderReducer = function (state = defaultParams, action) {
    switch (action.type) {
        case SHOW_LOADER :
            return {...state, loading: true}
        case HIDE_LOADER :
            return {...state, loading: false}
        default :
            return state
    }
}
