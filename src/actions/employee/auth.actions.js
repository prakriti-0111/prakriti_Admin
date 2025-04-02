import axios from 'actions/axios';
import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE
} from '../../actionTypes/global.types';

import {
    EMPLOYEE_LIST_ROLES
} from '../../actionTypes/employee/role.types';
import secureLocalStorage  from  "react-secure-storage";


export const login = (data) => {
    return (dispatch) => {
        axios.post("/employee/auth/signin", data)
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
        axios.post("/employee/logout")
        .then(response => {
            if(response.data.success){
                //localStorage.removeItem("auth");
                secureLocalStorage.removeItem("auth");
                dispatch({
                    type: LOGOUT_SUCCESS,
                    payload: response.data.data
                });
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
        axios.get(`/employee/employee-roles`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: EMPLOYEE_LIST_ROLES,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}