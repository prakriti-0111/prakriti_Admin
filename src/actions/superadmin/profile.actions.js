import axios from 'actions/axios';
import {
    SUPERADMIN_UPDATE_PROFILE,
    SUPERADMIN_UPDATE_PASSWORD,
    SUPERADMIN_DASHBOARD
} from '../../actionTypes/superadmin/profile.types';

export const getProfile = () => {
    return  axios.get(`/superadmin/profile`)
}

export const updateEditProfile = (data) => {
    return (dispatch) => {
        axios.post(`/superadmin/edit-profile`, data)
        .then(response => {
            dispatch({
                type: SUPERADMIN_UPDATE_PROFILE,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const changePassword = (data) => {
    return (dispatch) => {
        axios.post(`/superadmin/change-password`, data)
        .then(response => {
            dispatch({
                type: SUPERADMIN_UPDATE_PASSWORD,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const getDashboardData = (data) => {
    return (dispatch) => {
        axios.get(`/superadmin/dashboard`)
        .then(response => {
            dispatch({
                type: SUPERADMIN_DASHBOARD,
                payload: response.data.data
            });
        })
        .catch(error => {
        })
    }
}

export const sendAutoNotifications = (data) => {
    return (dispatch) => {
        axios.get(`/superadmin/auto-notifications`)
        .then(response => {
            
        })
        .catch(error => {
        })
    }
}

export const getNextUserName = (role) => {
    return axios.get(`/superadmin/next-user-name?role=${role}`);
}