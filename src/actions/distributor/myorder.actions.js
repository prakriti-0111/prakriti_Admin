import axios from 'actions/axios';
import {
    DISTRIBUTOR_LIST_MYORDERS,
    DISTRIBUTOR_ADD_MYORDERS,
    DISTRIBUTOR_GET_MYORDERS,
    DISTRIBUTOR_CANCEL_MYORDER
} from '../../actionTypes/distributor/myorders.types';
import {objectToQuery} from 'src/helpers/helper';

export const orderList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/distributor/my-orders${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: DISTRIBUTOR_LIST_MYORDERS,
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
        axios.post(`/distributor/my-orders/place-order`, data)
        .then(response => {
            dispatch({
                type: DISTRIBUTOR_ADD_MYORDERS,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const orderView = (id) => {
    return (dispatch) => {
        axios.get(`/distributor/my-orders/fetch/${id}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: DISTRIBUTOR_GET_MYORDERS,
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
        axios.post(`/distributor/my-orders/cancel-order/${id}`)
        .then(response => {
            dispatch({
                type: DISTRIBUTOR_CANCEL_MYORDER,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}


