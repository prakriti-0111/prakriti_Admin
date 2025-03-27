import axios from 'actions/axios';
import {
    LIST_SALES,
    LIST_SALES_ON_APPROVE,
    GET_SALES_ON_APPROVE,
    UPDATE_SALES_STATUS,
    CREATE_SALES,
    ADD_SALES,
    GET_SALES,
    UPDATE_SALES,
    DELETE_SALES,
} from '../../actionTypes/superadmin/sales.types';
import {objectToQuery} from 'src/helpers/helper';

export const salesList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/superadmin/sales${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: LIST_SALES,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const salesOnApproveList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/superadmin/sales-on-approve${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: LIST_SALES_ON_APPROVE,
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
        axios.get(`/superadmin/sales/create`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: CREATE_SALES,
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
        axios.post("/superadmin/sales/store", data)
        .then(response => {
            dispatch({
                type: ADD_SALES,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const salesView = (id) => {
    return (dispatch) => {
        axios.get(`/superadmin/sales/view/${id}`)
        .then(response => {
            console.log(response.data.data)
            if(response.data.success){
                dispatch({
                    type: GET_SALES,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const salesOnApproveView = (id) => {
    return (dispatch) => {
        axios.get(`/superadmin/sales-on-approve/view/${id}`)
        .then(response => {
            console.log(response.data.data)
            if(response.data.success){
                dispatch({
                    type: GET_SALES_ON_APPROVE,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}
export const salesStatusChange = (id, data) => {
    /*return (dispatch) => {
        axios.post(`/superadmin/sales-on-approve/status/${id}`, data)
        .then(response => {
            dispatch({
                type: UPDATE_SALES_STATUS,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }*/

    return axios.post(`/superadmin/sales-on-approve/status/${id}`, data);
        
}
export const salesEdit = (id) => {
    return (dispatch) => {
        axios.get(`/superadmin/sales/edit/${id}`)
        .then(response => {
            console.log(response.data.data)
            if(response.data.success){
                dispatch({
                    type: GET_SALES,
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
        axios.post(`/superadmin/sales/update/${id}`, data)
        .then(response => {
            dispatch({
                type: UPDATE_SALES,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const salesDelete = (id, data) => {
    return (dispatch) => {
        axios.delete(`/superadmin/sales/delete/${id}`, data)
        .then(response => {
            dispatch({
                type: DELETE_SALES,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const salesDownloadInvoice = (id) => {
    return axios.post(`/superadmin/sales/download-invoice/${id}`);
}

export const salesDownloadInvoiceInfo = (id) => {
    return axios.post(`/superadmin/sales/download-invoice-info/${id}`);
}

export const salesDownloadInvoiceItems = (id) => {
    return axios.post(`/superadmin/sales/download-invoice-items/${id}`);
}

export const salesViewRaw = (id) => {
    return axios.get(`/superadmin/sales/view/${id}`)
}

export const salesEditRaw = (id) => {
    return axios.get(`/superadmin/sales/edit/${id}`)
}

export const saleReturn = (id, post) => {
    return axios.post(`/superadmin/sales/return/${id}`, post)
}

export const returnStockTrasnfer = (post) => {
    return axios.post(`/superadmin/sales/return-stock-transfer`, post)
}
export const saleProducts = (params) => {
    params = objectToQuery(params, true)
    return axios.get(`/superadmin/sales-products${params}`);
}

