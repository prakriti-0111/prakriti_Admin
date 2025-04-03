import axios from 'actions/axios';
import {
    LIST_CERTIFICATE,
    ADD_CERTIFICATE,
    GET_CERTIFICATE,
    UPDATE_CERTIFICATE,
    DELETE_CERTIFICATE,
} from '../../actionTypes/superadmin/certificate.types';
import {objectToQuery} from 'src/helpers/helper';

export const certificateList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/superadmin/certificates${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: LIST_CERTIFICATE,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const certificateCreate = (data) => { 
    return (dispatch) => {
        axios.post("/superadmin/certificates/store", data)
        .then(response => { 
            if(response.data.success){
                dispatch({
                    type: ADD_CERTIFICATE,
                    payload: response.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const certificateFetch = (id) => {
    return (dispatch) => {
        axios.get(`/superadmin/certificates/fetch/${id}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: GET_CERTIFICATE,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const certificateUpdate = (id, data) => {
    return (dispatch) => {
        axios.post(`/superadmin/certificates/update/${id}`, data)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: UPDATE_CERTIFICATE,
                    payload: response.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const certificateDelete = (id, data) => {
    return (dispatch) => {
        axios.delete(`/superadmin/certificates/delete/${id}`, data)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: DELETE_CERTIFICATE,
                    payload: response.data
                });
            }
        })
        .catch(error => {
        })
    }
}