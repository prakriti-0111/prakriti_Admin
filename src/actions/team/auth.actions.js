import axios from 'actions/axios';
import {
    TEAM_LIST_ROLES
} from '../../actionTypes/team/role.types';
import {
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE
} from '../../actionTypes/global.types';
import secureLocalStorage  from  "react-secure-storage";

export const login = (data) => {
    return axios.post("/team/auth/signin", data)
}

export const logout = (data) => {
    return (dispatch) => {
        axios.post("/team/logout", data)
        .then(response => {
            if(response.data.success){
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


export const getAllRoles = () => {
    return (dispatch) => {
        axios.get(`/team/roles`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: TEAM_LIST_ROLES,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const forgotPasswordSendOtp = (data) => {
    return axios.post("/team/auth/forgot-password-send-otp", data)
}

export const forgotPasswordVerifyOtp = (data) => {
    return axios.post("/team/auth/forgot-password-verify-otp", data)
}

export const forgotPassword = (data) => {
    return axios.post("/team/auth/forgot-password", data)
}