import axios from 'actions/axios';
import {
    LIST_SIZE,
    ADD_SIZE,
    GET_SIZE,
    UPDATE_SIZE,
    DELETE_SIZE,
} from '../../actionTypes/superadmin/size.types';
import {objectToQuery} from 'src/helpers/helper';

export const sizeList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/superadmin/sizes${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: LIST_SIZE,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const sizeCreate = (data) => {
    return (dispatch) => {
        axios.post("/superadmin/sizes/store", data)
        .then(response => {
            dispatch({
                type: ADD_SIZE,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const sizeFetch = (id) => {
    return (dispatch) => {
        axios.get(`/superadmin/sizes/fetch/${id}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: GET_SIZE,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const sizeUpdate = (id, data) => {
    return (dispatch) => {
        axios.post(`/superadmin/sizes/update/${id}`, data)
        .then(response => {
            dispatch({
                type: UPDATE_SIZE,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const sizeDelete = (id, data) => {
    return (dispatch) => {
        axios.delete(`/superadmin/sizes/delete/${id}`, data)
        .then(response => {
            dispatch({
                type: DELETE_SIZE,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const sizeListRaw = (params) => {
    params = objectToQuery(params, true)
    return axios.get(`/superadmin/sizes${params}`)
}