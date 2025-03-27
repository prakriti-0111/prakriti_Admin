import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    UPDATE_GLOBAL_AUTH,
    FORGOT_PASSWORD_ERROR
} from '../actionTypes/global.types';
import secureLocalStorage  from  "react-secure-storage";

let user = null, expiresOn = 0, loginOn = 0;
try{
    //let auth = localStorage.getItem('auth');
    let auth = secureLocalStorage.getItem('auth');
    if(auth){
        auth = JSON.parse(auth);
        user = ('user' in auth && auth.user) ? auth.user : null;
        if(user && user.role_name == "Sales Executive"){
            if(!('expiresOn' in auth)){
                user = null;
            }else{
                expiresOn = auth.expiresOn;
                loginOn = auth.loginOn;
                if('loginOn' in auth && auth.loginOn <= moment(moment().format('YYYY-MM-DD 09:59:59'), 'YYYY-MM-DD HH:mm:ss').toDate().getTime() && Date.now() > auth.expiresOn){
                    user = null;
                }
            }
        }
    }
}catch(err){ }
const initialState = user ? { isLoggedIn: true, expiresOn: expiresOn, loginOn: loginOn, user } : {};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case LOGIN_SUCCESS:
            let newState2 = {
                ...state,
                isLoggedIn: true,
                user: payload.user,
                expiresOn: 'expiresOn' in payload ? payload.expiresOn : 0
            }
            return newState2;
        case LOGIN_FAILURE:
            return {
                ...state,
                isLoggedIn: false,
                loginError: payload
            }
        case LOGOUT_SUCCESS:
            let newState = {
                ...state,
                logoutSuccess: true,
                isLoggedIn: false,
                user: null
            }
            return newState;
        case LOGOUT_FAILURE:
            return {
                ...state,
                logoutSuccess: false,
                logoutErr: payload
            }
        case UPDATE_GLOBAL_AUTH:
            //let auth = localStorage.getItem('auth');
            let auth = secureLocalStorage.getItem('auth');
            if(auth){
                auth = JSON.parse(auth);
                auth.user.name = payload.name;
                auth.user.mobile = payload.mobile;
                if('gst' in payload){
                    auth.user.gst = payload.gst;
                }
                if('email' in payload){
                    auth.user.email = payload.email;
                }
                if('image' in payload){
                    auth.user.image = payload.image;
                }
                //localStorage.setItem("auth", JSON.stringify(auth));
                secureLocalStorage.setItem("auth", JSON.stringify(auth));
            }

            return {
                ...state,
                user: {
                    ...state.user,
                    ...payload
                }
            }
        case FORGOT_PASSWORD_ERROR:
            return {
                ...state,
                forgotPassError: payload
            }
        default:
            return state;
    }
}