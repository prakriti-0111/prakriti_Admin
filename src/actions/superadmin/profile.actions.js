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

/**
 * The dashboard is served as three independent sections. Summary and charts are
 * a few milliseconds each, the stock valuation is the slow one, so they are
 * fetched in parallel and each paints as it lands instead of the whole page
 * waiting on the slowest query.
 */
export const getDashboardData = (data) => {
    return (dispatch) => {
        ['summary', 'charts', 'stock'].forEach(section => {
            axios.get(`/superadmin/dashboard/${section}`)
            .then(response => {
                dispatch({
                    type: SUPERADMIN_DASHBOARD,
                    payload: { ...response.data.data, [`__${section}`]: true }
                });
            })
            .catch(error => {
            })
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