import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
} from '../../actionTypes/manager/auth.types';

let user = null;
try{
    let auth = localStorage.getItem('auth');
    if(auth){
        auth = JSON.parse(auth);
        user = 'user' in auth ? auth.user : null;
    }
}catch(err){ }
const initialState = user ? { isLoggedIn: true, user } : {};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: payload.user
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                isLoggedIn: false,
                loginError: payload
            }
        case LOGOUT_SUCCESS:
            console.log('manager LOGOUT_SUCCESS')
            return {
                ...state,
                logoutSuccess: true,
                isLoggedIn: false,
                user: null
            }
        case LOGOUT_FAILURE:
            return {
                ...state,
                logoutSuccess: false,
                logoutErr: payload
            }
        default:
            return state;
    }
}