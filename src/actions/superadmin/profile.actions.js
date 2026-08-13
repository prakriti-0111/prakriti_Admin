import axios from 'actions/axios';
import { isAdmin, isDistributor, isSalesExecutive } from 'src/helpers/helper';
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
            /* Swallowing this left the Update button spinning with no message when
               the request never reached the API. Report it like any other failure. */
            dispatch({
                type: SUPERADMIN_UPDATE_PROFILE,
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
 * Every role renders this same dashboard, and its numbers come from the
 * superadmin controller, which branches on the caller's role. That is no reason
 * for an admin to be seen calling /api/superadmin/... - each role now asks its
 * own prefix, which serves the same controller behind that role's guard.
 */
const getDashboardApiPrefix = () => {
    if (isAdmin()) return '/admin';
    if (isDistributor()) return '/distributor';
    if (isSalesExecutive()) return '/sales-executive';
    return '/superadmin';
};

/**
 * The dashboard is served as three independent sections. Summary and charts are
 * a few milliseconds each, the stock valuation is the slow one, so they are
 * fetched in parallel and each paints as it lands instead of the whole page
 * waiting on the slowest query.
 */
export const getDashboardData = (data) => {
    return (dispatch) => {
        ['summary', 'charts', 'stock'].forEach(section => {
            axios.get(`${getDashboardApiPrefix()}/dashboard/${section}`)
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