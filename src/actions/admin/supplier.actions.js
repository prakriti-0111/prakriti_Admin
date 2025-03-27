import axios from 'actions/axios';
import {
    ADMIN_LIST_SUPPLIER,
    ADMIN_ADD_SUPPLIER,
    ADMIN_GET_SUPPLIER,
    ADMIN_UPDATE_SUPPLIER,
    ADMIN_DELETE_SUPPLIER,
} from '../../actionTypes/admin/supplier.types';
import {objectToQuery} from 'src/helpers/helper';

export const supplierList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/admin/suppliers${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: ADMIN_LIST_SUPPLIER,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const supplierCreate = (data) => {
    return (dispatch) => {
        axios.post("/admin/suppliers/store", data)
        .then(response => {
                dispatch({
                    type: ADMIN_ADD_SUPPLIER,
                    payload: response.data
                });
        })
        .catch(error => {
        })
    }
}

export const supplierFetch = (id) => {
    return (dispatch) => {
        axios.get(`/admin/suppliers/fetch/${id}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: ADMIN_GET_SUPPLIER,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const supplierUpdate = (id, data) => {
    return (dispatch) => {
        axios.post(`/admin/suppliers/update/${id}`, data)
        .then(response => {
                dispatch({
                    type: ADMIN_UPDATE_SUPPLIER,
                    payload: response.data
                });
        })
        .catch(error => {
        })
    }
}

export const supplierDelete = (id, data) => {
    return (dispatch) => {
        axios.delete(`/admin/suppliers/delete/${id}`, data)
        .then(response => {
                dispatch({
                    type: ADMIN_DELETE_SUPPLIER,
                    payload: response.data
                });
        })
        .catch(error => {
        })
    }
}