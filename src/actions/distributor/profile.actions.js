import axios from 'actions/axios';
import {
    DISTRIBUTOR_UPDATE_PROFILE,
    DISTRIBUTOR_UPDATE_PASSWORD,
    DISTRIBUTOR_DASHBOARD
} from '../../actionTypes/distributor/profile.types';

export const updateEditProfile = (data) => {
    return (dispatch) => {
        axios.post(`/distributor/edit-profile`, data)
        .then(response => {
            dispatch({
                type: DISTRIBUTOR_UPDATE_PROFILE,
                payload: response.data
            });
        })
        .catch(error => {
            /* Swallowing this left the Update button spinning with no message when
               the request never reached the API. Report it like any other failure. */
            dispatch({
                type: DISTRIBUTOR_UPDATE_PROFILE,
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
        axios.post(`/distributor/change-password`, data)
        .then(response => {
            dispatch({
                type: DISTRIBUTOR_UPDATE_PASSWORD,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const getDashboardData = (data) => {
    return (dispatch) => {
        axios.get(`/distributor/dashboard`)
        .then(response => {
            dispatch({
                type: DISTRIBUTOR_DASHBOARD,
                payload: response.data.data
            });
        })
        .catch(error => {
        })
    }
}