import axios from 'actions/axios';
import {
    EMPLOYEE_UPDATE_PROFILE,
    EMPLOYEE_UPDATE_PASSWORD,
    EMPLOYEE_DASHBOARD
} from '../../actionTypes/employee/profile.types';

export const updateEditProfile = (data) => {
    return (dispatch) => {
        axios.post(`/employee/edit-profile`, data)
        .then(response => {
            dispatch({
                type: EMPLOYEE_UPDATE_PROFILE,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const changePassword = (data) => {
    return (dispatch) => {
        axios.post(`/employee/change-password`, data)
        .then(response => {
            dispatch({
                type: EMPLOYEE_UPDATE_PASSWORD,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const getDashboardData = (data) => {
    return (dispatch) => {
        axios.get(`/employee/dashboard`)
        .then(response => {
            dispatch({
                type: EMPLOYEE_DASHBOARD,
                payload: response.data.data
            });
        })
        .catch(error => {
        })
    }
}