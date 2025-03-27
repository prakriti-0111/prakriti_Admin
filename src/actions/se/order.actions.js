import axios from 'actions/axios';
import {
    SE_LIST_ORDERS,
    SE_GET_ORDERS,
} from '../../actionTypes/se/orders.types';
import {objectToQuery} from 'src/helpers/helper';

export const orderList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/sales-executive/orders${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: SE_LIST_ORDERS,
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
        axios.get(`/sales-executive/orders/fetch/${id}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: SE_GET_ORDERS,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const orderViewRaw = (id) => {
    return axios.get(`/sales-executive/orders/fetch/${id}`)
}

