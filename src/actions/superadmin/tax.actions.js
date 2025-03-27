import axios from 'actions/axios';
import {
    LIST_TAX,
    ADD_TAX,
    GET_TAX,
    UPDATE_TAX,
    DELETE_TAX,
} from '../../actionTypes/superadmin/tax.types';
import {objectToQuery} from 'src/helpers/helper';

export const taxList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/superadmin/tax${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: LIST_TAX,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const taxCreate = (data) => {
    return (dispatch) => {
        axios.post("/superadmin/tax/store", data)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: ADD_TAX,
                    payload: response.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const taxFetch = (id) => {
    return (dispatch) => {
        axios.get(`/superadmin/tax/fetch/${id}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: GET_TAX,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const taxUpdate = (id, data) => {
    return (dispatch) => {
        axios.post(`/superadmin/tax/update/${id}`, data)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: UPDATE_TAX,
                    payload: response.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const taxDelete = (id, data) => {
    return (dispatch) => {
        axios.delete(`/superadmin/tax/delete/${id}`, data)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: DELETE_TAX,
                    payload: response.data
                });
            }
        })
        .catch(error => {
        })
    }
}