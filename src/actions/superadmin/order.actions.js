import axios from 'actions/axios';
import {
    SUPERADMIN_LIST_ORDERS,
    SUPERADMIN_ADD_ORDERS,
    SUPERADMIN_GET_ORDERS,
    SUPERADMIN_CANCEL_ORDER
} from '../../actionTypes/superadmin/orders.types';
import {objectToQuery} from 'src/helpers/helper';

export const orderList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/superadmin/orders${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: SUPERADMIN_LIST_ORDERS,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}


export const orderView = (id) => {
    return (dispatch) => {
        axios.get(`/superadmin/orders/fetch/${id}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: SUPERADMIN_GET_ORDERS,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const orderViewRaw = (id) => {
    return axios.get(`/superadmin/orders/fetch/${id}`)
}

export const orderCancel = (id) => {
    return (dispatch) => {
        axios.post(`/admin/superadmin/cancel-order/${id}`)
        .then(response => {
            dispatch({
                type: SUPERADMIN_CANCEL_ORDER,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const getAllUsers = (params) => {
    params = objectToQuery(params, true);
    return axios.get(`/superadmin/user-list${params}`);
}

export const orderUpdateStatus = (id, data) => {
    return axios.post(`/superadmin/orders/update-status/${id}`, data)
}

export const orderSaleProceed = (id, data) => {
    return axios.post(`/superadmin/orders/sale-proceed/${id}`, data)
}

export const updateOrderProducts = (data) => {
    return axios.post(`/superadmin/orders/update-products`, data)
}

