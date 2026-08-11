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
            /* Swallowing this left the Update button spinning with no message when
               the request never reached the API. Report it like any other failure. */
            dispatch({
                type: EMPLOYEE_UPDATE_PROFILE,
                payload: (error && error.response && error.response.data) || {
                    success: false,
                    message: 'Could not reach the server. Please try again.'
                }
            });
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