import axios from 'actions/axios';
import {
    ADMIN_UPDATE_PROFILE,
    ADMIN_UPDATE_PASSWORD,
    ADMIN_DASHBOARD
} from '../../actionTypes/admin/profile.types';

export const updateEditProfile = (data) => {
    return (dispatch) => {
        axios.post(`/admin/edit-profile`, data)
        .then(response => {
            dispatch({
                type: ADMIN_UPDATE_PROFILE,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const changePassword = (data) => {
    return (dispatch) => {
        axios.post(`/admin/change-password`, data)
        .then(response => {
            dispatch({
                type: ADMIN_UPDATE_PASSWORD,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const getDashboardData = (data) => {
    return (dispatch) => {
        axios.get(`/admin/dashboard`)
        .then(response => {
            dispatch({
                type: ADMIN_DASHBOARD,
                payload: response.data.data
            });
        })
        .catch(error => {
        })
    }
}