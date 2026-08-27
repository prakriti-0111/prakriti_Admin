import axios from 'actions/axios';
import {
    SE_UPDATE_PROFILE,
    SE_UPDATE_PASSWORD
} from '../../actionTypes/se/profile.types';
import {objectToQuery} from 'src/helpers/helper';

export const updateEditProfile = (data) => {
    return (dispatch) => {
        axios.post(`/sales-executive/edit-profile`, data)
        .then(response => {
            dispatch({
                type: SE_UPDATE_PROFILE,
                payload: response.data
            });
        })
        .catch(error => {
            /* Swallowing this left the Update button spinning with no message when
               the request never reached the API. Report it like any other failure. */
            dispatch({
                type: SE_UPDATE_PROFILE,
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
        axios.post(`/sales-executive/change-password`, data)
        .then(response => {
            dispatch({
                type: SE_UPDATE_PASSWORD,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const getAttendence = (params) => {
    params = objectToQuery(params, true);
    return axios.get(`/sales-executive/attendence${params}`);
}

export const updateAttendence = (data) => {
    return axios.post(`/sales-executive/attendence-update`, data);
}