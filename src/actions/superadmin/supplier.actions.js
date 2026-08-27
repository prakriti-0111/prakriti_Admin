import axios from 'actions/axios';
import {
    SUPERADMIN_LIST_SUPPLIER,
    SUPERADMIN_ADD_SUPPLIER,
    SUPERADMIN_GET_SUPPLIER,
    SUPERADMIN_UPDATE_SUPPLIER,
    SUPERADMIN_DELETE_SUPPLIER,
} from '../../actionTypes/superadmin/supplier.types';
import {objectToQuery} from 'src/helpers/helper';

export const supplierList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/superadmin/suppliers${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: SUPERADMIN_LIST_SUPPLIER,
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
        axios.post("/superadmin/suppliers/store", data)
        .then(response => {
                dispatch({
                    type: SUPERADMIN_ADD_SUPPLIER,
                    payload: response.data
                });
        })
        .catch(error => {
        })
    }
}

export const supplierFetch = (id) => {
    return (dispatch) => {
        axios.get(`/superadmin/suppliers/fetch/${id}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: SUPERADMIN_GET_SUPPLIER,
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
        axios.post(`/superadmin/suppliers/update/${id}`, data)
        .then(response => {
                dispatch({
                    type: SUPERADMIN_UPDATE_SUPPLIER,
                    payload: response.data
                });
        })
        .catch(error => {
        })
    }
}

export const supplierDelete = (id, data) => {
    return (dispatch) => {
        axios.delete(`/superadmin/suppliers/delete/${id}`, data)
        .then(response => {
                dispatch({
                    type: SUPERADMIN_DELETE_SUPPLIER,
                    payload: response.data
                });
        })
        .catch(error => {
        })
    }
}