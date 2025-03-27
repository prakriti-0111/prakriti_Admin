import axios from 'actions/axios';
import {
    ADMIN_LIST_PAYMENT,
    ADMIN_ADD_PAYMENT,
    ADMIN_DUE_PAYMENT,
    ADMIN_LIST_WALLET
} from '../../actionTypes/admin/payment.types';
import {objectToQuery} from 'src/helpers/helper';

export const paymentList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/admin/payments${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: ADMIN_LIST_PAYMENT,
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
        axios.post("/admin/payments/store", data)
        .then(response => {
            dispatch({
                type: ADMIN_ADD_PAYMENT,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}
export const paymentTotalDue = (id) => {
    return (dispatch) => {
        axios.get(`/admin/payments/due-amount?user_id=${id}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: ADMIN_DUE_PAYMENT,
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
        axios.get(`/admin/wallet-history${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: ADMIN_LIST_WALLET,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}
export const paymentGetWalletBalance = (mode) => {
    return axios.get(`/admin/payments/wallet-balance?payment_mode=${mode}`)

}

export const paymentStatusChange = (id, data) => {
    return axios.post("/admin/payments/update-status/" + id, data)
}