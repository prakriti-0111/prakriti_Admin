import axios from 'actions/axios';
import {
    LIST_LEAVEAPPLICATION,
    ADD_LEAVEAPPLICATION,
    GET_LEAVEAPPLICATION,
    UPDATE_LEAVEAPPLICATION,
    DELETE_LEAVEAPPLICATION,
} from '../../actionTypes/superadmin/leaveApplication.types';
import {objectToQuery} from 'src/helpers/helper';

export const leaveApplicationList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/superadmin/leave-application${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: LIST_LEAVEAPPLICATION,
                    payload: response.data.data 
                });
            }
        })
        .catch(error => {
        })
    }
}

export const leaveApplicationStore = (data) => {
    return (dispatch) => {
        axios.post("/superadmin/leave-application/store", data)
        .then(response => {
            dispatch({
                type: ADD_LEAVEAPPLICATION,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const leaveApplicationFetch = (id) => {
    return (dispatch) => {
        axios.get(`/superadmin/leave-application/fetch/${id}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: GET_LEAVEAPPLICATION,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const leaveApplicationUpdate = (id, data) => {
    return (dispatch) => {
        axios.post(`/superadmin/leave-application/update/${id}`, data)
        .then(response => {
            dispatch({
                type: UPDATE_LEAVEAPPLICATION,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const leaveApplicationDelete = (id, data) => {
    return (dispatch) => {
        axios.delete(`/superadmin/leave-application/delete/${id}`, data)
        .then(response => {
            dispatch({
                type: DELETE_LEAVEAPPLICATION,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}