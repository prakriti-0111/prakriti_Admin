import axios from 'actions/axios';
import {
    LIST_PURCHASE,
    CREATE_PURCHASE,
    ADD_PURCHASE,
    GET_PURCHASE,
    UPDATE_PURCHASE,
    DELETE_PURCHASE,
    LIST_PURCHASE_ON_APPROVE,
    GET_PURCHASE_ON_APPROVE,
    UPDATE_PURCHASE_STATUS,
} from '../../actionTypes/superadmin/purchase.types';
import {objectToQuery} from 'src/helpers/helper';

export const purchaseList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/superadmin/purchases${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: LIST_PURCHASE,
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
        axios.get(`/superadmin/purchases-on-approve${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: LIST_PURCHASE_ON_APPROVE,
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
        axios.get(`/superadmin/purchases-on-approve/view/${id}`)
        .then(response => {
            console.log(response.data.data)
            if(response.data.success){
                dispatch({
                    type: GET_PURCHASE_ON_APPROVE,
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
   return axios.post(`/superadmin/purchases-on-approve/status/${id}`, data);
}

export const purchaseCreate = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/superadmin/purchases/create`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: CREATE_PURCHASE,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const purchaseStore = (data) => {
    console.log("---purchaseStore",data)
    return (dispatch) => {
        axios.post("/superadmin/purchases/store", data)
        .then(response => {
            dispatch({
                type: ADD_PURCHASE,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const purchaseView = (id) => {
    return (dispatch) => {
        axios.get(`/superadmin/purchases/view/${id}`)
        .then(response => {
            console.log(response.data.data)
            if(response.data.success){
                dispatch({
                    type: GET_PURCHASE,
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
        axios.get(`/superadmin/purchases/edit/${id}`)
        .then(response => {
            console.log(response.data.data)
            if(response.data.success){
                dispatch({
                    type: GET_PURCHASE,
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
        axios.post(`/superadmin/purchases/update/${id}`, data)
        .then(response => {
            dispatch({
                type: UPDATE_PURCHASE,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const purchaseDelete = (id, data) => {
    return (dispatch) => {
        axios.delete(`/superadmin/purchases/delete/${id}`, data)
        .then(response => {
            dispatch({
                type: DELETE_PURCHASE,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const purchaseNewInvoiceNumber = () => {
    return axios.get(`/superadmin/purchases/new-invoice-number`);
}

export const purchaseReturn = (id, data) => {
    return axios.post("/superadmin/purchases/return/" + id, data)
}

export const purchaseRawEdit = (id) => {
    return axios.get(`/superadmin/purchases/edit/${id}`)
}

export const purchaseProducts = (params) => {
    params = objectToQuery(params, true)
    return axios.get(`/superadmin/purchases-products${params}`);
}

export const purchaseDownloadInvoiceInfo = (id) => {
    return axios.post(`/superadmin/purchases/download-invoice-info/${id}`);
}

export const purchaseDownloadInvoiceItems = (id) => {
    return axios.post(`/superadmin/purchases/download-invoice-items/${id}`);
}
