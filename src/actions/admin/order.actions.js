import axios from 'actions/axios';
import {
    ADMIN_LIST_ORDERS,
    ADMIN_ADD_ORDERS,
    ADMIN_GET_ORDERS,
    ADMIN_CANCEL_ORDER
} from '../../actionTypes/admin/orders.types';
import {objectToQuery} from 'src/helpers/helper';

export const orderList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/admin/orders${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: ADMIN_LIST_ORDERS,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const orderStore = (data) => {
    return (dispatch) => {
        axios.post(`/admin/orders/place-order`, data)
        .then(response => {
            dispatch({
                type: ADMIN_ADD_ORDERS,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const orderView = (id) => {
    return (dispatch) => {
        axios.get(`/admin/orders/fetch/${id}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: ADMIN_GET_ORDERS,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const orderCancel = (id) => {
    return (dispatch) => {
        axios.post(`/admin/orders/cancel-order/${id}`)
        .then(response => {
            dispatch({
                type: ADMIN_CANCEL_ORDER,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}



