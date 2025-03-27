import axios from 'actions/axios';
import {
    LIST_LEAVEAPPLICATION,
    ADD_LEAVEAPPLICATION,
    GET_LEAVEAPPLICATION,
} from '../../actionTypes/admin/leaveApplication.types';
import {objectToQuery} from 'src/helpers/helper';

export const leaveApplicationList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/admin/leave-application${params}`)
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
        axios.post("/admin/leave-application/store", data)
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
        axios.get(`/admin/leave-application/fetch/${id}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: GET_LEAVEAPPLICATION,
                    payload: [response.data.data]
                });
            }
        })
        .catch(error => {
        })
    }
}
