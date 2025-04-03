import axios from 'actions/axios';
import {
    SUPERADMIN_LIST_PAYMENT,
    SUPERADMIN_ADD_PAYMENT,
    SUPERADMIN_DUE_PAYMENT,
    SUPERADMIN_LIST_WALLET
} from '../../actionTypes/superadmin/payment.types';
import {objectToQuery} from 'src/helpers/helper';

export const paymentList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/superadmin/payments${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: SUPERADMIN_LIST_PAYMENT,
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
        axios.post("/superadmin/payments/store", data)
        .then(response => {
            dispatch({
                type: SUPERADMIN_ADD_PAYMENT,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}
export const paymentTotalDue = (id) => {
    return (dispatch) => {
        axios.get(`/superadmin/payments/due-amount?user_id=${id}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: SUPERADMIN_DUE_PAYMENT,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const walletHistoryList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/superadmin/wallet-history${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: SUPERADMIN_LIST_WALLET,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}
export const paymentGetWalletBalance = (mode) => {
    return axios.get(`/superadmin/payments/wallet-balance?payment_mode=${mode}`)

}

export const paymentStatusChange = (id, data) => {
    return axios.post("/superadmin/payments/update-status/" + id, data)
}