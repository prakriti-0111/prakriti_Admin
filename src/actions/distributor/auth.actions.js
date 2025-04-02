import axios from 'actions/axios';
import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    DESTROY_SESSION
} from '../../actionTypes/global.types';
import  secureLocalStorage  from  "react-secure-storage";


export const login = (data) => {
    return (dispatch) => {
        axios.post("/distributor/auth/signin", data)
        .then(response => {
            if(response.data.success){
                //localStorage.setItem("auth", JSON.stringify(response.data.data));
                secureLocalStorage.setItem("auth", JSON.stringify(response.data.data));
                /**
                 * set auth header
                 */
                axios.defaults.headers['Authorization'] = 'Bearer ' + response.data.data.access_token;

                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: response.data.data
                });
            }else{
                dispatch({
                    type: LOGIN_FAILURE,
                    payload: response.data.message
                });
            }
        })
        .catch(error => {
            dispatch({
                type: LOGIN_FAILURE,
                data: "Something went wrong"
            });
        })
    }
}

export const logout = () => {
    return (dispatch) => {
        axios.post("/distributor/logout")
        .then(response => {
            if(response.data.success){
                //localStorage.removeItem("auth");
                secureLocalStorage.removeItem("auth");
                dispatch({
                    type: LOGOUT_SUCCESS,
                    payload: response.data.data
                });
                //dispatch({ type: DESTROY_SESSION });
            }else{
                dispatch({
                    type: LOGOUT_FAILURE,
                    payload: response.data.message
                });
            }
        })
        .catch(error => {
            dispatch({
                type: LOGOUT_FAILURE,
                data: "Something went wrong"
            });
        })
    }
}