import axios from 'actions/axios';
import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    FORGOT_PASSWORD_ERROR
} from '../../actionTypes/global.types';
import secureLocalStorage  from  "react-secure-storage";


export const login = (data) => {
    return (dispatch) => {
        axios.post("/superadmin/auth/signin", data)
        .then(response => {
            if(response.data.success){
                //localStorage.setItem("auth", JSON.stringify(response.data.data));
                secureLocalStorage.setItem("auth", JSON.stringify(response.data.data));
                /**
                 * set auth header
                 */
                axios.defaults.headers['Authorization'] = 'Bearer ' + response.data.data.access_token;
                //axiosDefault.headers.common['Authorization'] = response.data.data.access_token;

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
        axios.post("/superadmin/logout")
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

export const forgotPasswordSendOtp = (data) => {
    return axios.post("/superadmin/auth/forgot-password-send-otp", data)
}

export const forgotPasswordVerifyOtp = (data) => {
    return axios.post("/superadmin/auth/forgot-password-verify-otp", data)
}

export const forgotPassword = (data) => {
    return axios.post("/superadmin/auth/forgot-password", data)
}