import axios from 'actions/axios';
import {
    ADMIN_LIST_SALES,
    ADMIN_CREATE_SALES,
    ADMIN_ADD_SALES,
    ADMIN_GET_SALES,
    ADMIN_UPDATE_SALES,
    ADMIN_DELETE_SALES,
} from '../../actionTypes/admin/sales.types';
import {objectToQuery} from 'src/helpers/helper';

export const salesList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/admin/sales${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: ADMIN_LIST_SALES,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const salesCreate = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/admin/sales/create`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: ADMIN_CREATE_SALES,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const salesStore = (data) => {
    return (dispatch) => {
        axios.post("/admin/sales/store", data)
        .then(response => {
            dispatch({
                type: ADMIN_ADD_SALES,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const salesView = (id) => {
    return (dispatch) => {
        axios.get(`/admin/sales/view/${id}`)
        .then(response => {
            console.log(response.data.data)
            if(response.data.success){
                dispatch({
                    type: ADMIN_GET_SALES,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const salesEdit = (id) => {
    return (dispatch) => {
        axios.get(`/admin/sales/edit/${id}`)
        .then(response => {
            console.log(response.data.data)
            if(response.data.success){
                dispatch({
                    type: ADMIN_GET_SALES,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const salesUpdate = (id, data) => {
    return (dispatch) => {
        axios.post(`/admin/sales/update/${id}`, data)
        .then(response => {
            dispatch({
                type: ADMIN_UPDATE_SALES,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const salesDelete = (id, data) => {
    return (dispatch) => {
        axios.delete(`/admin/sales/delete/${id}`, data)
        .then(response => {
            dispatch({
                type: ADMIN_DELETE_SALES,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const salesDownloadInvoice = (id) => {
    return axios.post(`/admin/sales/download-invoice/${id}`);
}