import axios from 'actions/axios';
import {
    DISTRIBUTOR_LIST_ORDERS,
    DISTRIBUTOR_GET_ORDERS,
} from '../../actionTypes/distributor/orders.types';
import {objectToQuery} from 'src/helpers/helper';

export const orderList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/distributor/my-orders${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: DISTRIBUTOR_LIST_ORDERS,
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
        axios.get(`/distributor/my-orders/fetch/${id}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: DISTRIBUTOR_GET_ORDERS,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const orderAssign = (id, data) => {
    return axios.post("/distributor/my-orders/assign/" + id, data)
}


