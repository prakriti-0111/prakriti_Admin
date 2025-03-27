import axios from 'actions/axios';
import {
    SUPERADMIN_LIST_RETURN_ORDERS,
    SUPERADMIN_GET_RETURN_ORDERS,
} from '../../actionTypes/superadmin/returnOrders.types';
import {objectToQuery} from 'src/helpers/helper';

export const returnOrderList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/superadmin/return-orders${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: SUPERADMIN_LIST_RETURN_ORDERS,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const returnOrderView = (id) => {
    return (dispatch) => {
        axios.get(`/superadmin/return-orders/view/${id}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: SUPERADMIN_GET_RETURN_ORDERS,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const returnOrderAssign = (id, data) => {
    return axios.post("/superadmin/return-orders/assign/" + id, data)
}

export const returnOrderUpdateStatus = (id, data) => {
    return axios.post(`/superadmin/return-orders/update-status/${id}`, data)
}


