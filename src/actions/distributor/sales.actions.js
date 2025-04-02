import axios from 'actions/axios';
import {
    DISTRIBUTOR_LIST_SALES,
    DISTRIBUTOR_CREATE_SALES,
    DISTRIBUTOR_ADD_SALES,
    DISTRIBUTOR_GET_SALES,
    DISTRIBUTOR_UPDATE_SALES,
    DISTRIBUTOR_DELETE_SALES,
} from '../../actionTypes/distributor/sales.types';
import {objectToQuery} from 'src/helpers/helper';

export const salesList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/distributor/sales${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: DISTRIBUTOR_LIST_SALES,
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
        axios.get(`/distributor/sales/create`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: DISTRIBUTOR_CREATE_SALES,
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
        axios.post("/distributor/sales/store", data)
        .then(response => {
            dispatch({
                type: DISTRIBUTOR_ADD_SALES,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const salesView = (id) => {
    return (dispatch) => {
        axios.get(`/distributor/sales/view/${id}`)
        .then(response => {
            console.log(response.data.data)
            if(response.data.success){
                dispatch({
                    type: DISTRIBUTOR_GET_SALES,
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
        axios.get(`/distributor/sales/edit/${id}`)
        .then(response => {
            console.log(response.data.data)
            if(response.data.success){
                dispatch({
                    type: DISTRIBUTOR_GET_SALES,
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
        axios.post(`/distributor/sales/update/${id}`, data)
        .then(response => {
            dispatch({
                type: DISTRIBUTOR_UPDATE_SALES,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const salesDelete = (id, data) => {
    return (dispatch) => {
        axios.delete(`/distributor/sales/delete/${id}`, data)
        .then(response => {
            dispatch({
                type: DISTRIBUTOR_DELETE_SALES,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const salesDownloadInvoice = (id) => {
    return axios.post(`/distributor/sales/download-invoice/${id}`);
}