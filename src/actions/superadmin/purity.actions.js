import axios from 'actions/axios';
import {
    LIST_PURITY,
    ADD_PURITY,
    GET_PURITY,
    UPDATE_PURITY,
    DELETE_PURITY,
} from '../../actionTypes/superadmin/purity.types';
import {objectToQuery} from 'src/helpers/helper';

export const purityList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/superadmin/purities${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: LIST_PURITY,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const purityCreate = (data) => {
    return (dispatch) => {
        axios.post("/superadmin/purities/store", data)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: ADD_PURITY,
                    payload: response.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const purityFetch = (id) => {
    return (dispatch) => {
        axios.get(`/superadmin/purities/fetch/${id}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: GET_PURITY,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const purityUpdate = (id, data) => {
    return (dispatch) => {
        axios.post(`/superadmin/purities/update/${id}`, data)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: UPDATE_PURITY,
                    payload: response.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const purityDelete = (id, data) => {
    return (dispatch) => {
        axios.delete(`/superadmin/purities/delete/${id}`, data)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: DELETE_PURITY,
                    payload: response.data
                });
            }
        })
        .catch(error => {
        })
    }
}