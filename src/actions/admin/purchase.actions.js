import axios from 'actions/axios';
import {
    ADMIN_LIST_PURCHASE,
    ADMIN_CREATE_PURCHASE,
    ADMIN_ADD_PURCHASE,
    ADMIN_GET_PURCHASE,
    ADMIN_UPDATE_PURCHASE,
    ADMIN_DELETE_PURCHASE,
    ADMIN_LIST_PURCHASE_ON_APPROVE,
    ADMIN_GET_PURCHASE_ON_APPROVE,
    ADMIN_UPDATE_PURCHASE_STATUS,
} from '../../actionTypes/admin/purchase.types';
import {objectToQuery} from 'src/helpers/helper';

export const purchaseList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/admin/purchases${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: ADMIN_LIST_PURCHASE,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const purchaseOnApproveList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/admin/purchases-on-approve${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: ADMIN_LIST_PURCHASE_ON_APPROVE,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const purchaseOnApproveView = (id) => {
    return (dispatch) => {
        axios.get(`/admin/purchases-on-approve/view/${id}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: ADMIN_GET_PURCHASE_ON_APPROVE,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}
export const purchaseStatusChange = (id, data) => {
    /*return (dispatch) => {
        axios.post(`/superadmin/purchases-on-approve/status/${id}`, data)
        .then(response => {
            dispatch({
                type: UPDATE_PURCHASE_STATUS,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }*/
   return axios.post(`/admin/purchases-on-approve/status/${id}`, data);
}

export const purchaseCreate = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/admin/purchases/create`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: ADMIN_CREATE_PURCHASE,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const purchaseStore = (data) => {
    return (dispatch) => {
        axios.post("/admin/purchases/store", data)
        .then(response => {
            dispatch({
                type: ADMIN_ADD_PURCHASE,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const purchaseView = (id) => {
    return (dispatch) => {
        axios.get(`/admin/purchases/view/${id}`)
        .then(response => {
            console.log(response.data.data)
            if(response.data.success){
                dispatch({
                    type: ADMIN_GET_PURCHASE,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const purchaseEdit = (id) => {
    return (dispatch) => {
        axios.get(`/admin/purchases/edit/${id}`)
        .then(response => {
            console.log(response.data.data)
            if(response.data.success){
                dispatch({
                    type: ADMIN_GET_PURCHASE,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const purchaseUpdate = (id, data) => {
    return (dispatch) => {
        axios.post(`/admin/purchases/update/${id}`, data)
        .then(response => {
            dispatch({
                type: ADMIN_UPDATE_PURCHASE,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const purchaseDelete = (id, data) => {
    return (dispatch) => {
        axios.delete(`/admin/purchases/delete/${id}`, data)
        .then(response => {
            dispatch({
                type: ADMIN_DELETE_PURCHASE,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const purchaseNewInvoiceNumber = () => {
    return axios.get(`/admin/purchases/new-invoice-number`);
}

export const purchaseReturn = (id, data) => {
    return axios.post("/admin/purchases/return/" + id, data)
}