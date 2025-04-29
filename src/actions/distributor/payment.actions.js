import axios from 'actions/axios';
import {
    DISTRIBUTOR_LIST_PAYMENT,
    DISTRIBUTOR_ADD_PAYMENT
} from '../../actionTypes/distributor/payment.types';
import {objectToQuery} from 'src/helpers/helper';

export const paymentList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/distributor/payments${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: DISTRIBUTOR_LIST_PAYMENT,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const paymentStore = (data) => {
    return (dispatch) => {
        axios.post("/distributor/payments/store", data)
        .then(response => {
            dispatch({
                type: DISTRIBUTOR_ADD_PAYMENT,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}