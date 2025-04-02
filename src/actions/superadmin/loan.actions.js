import axios from 'actions/axios';
import {
    LIST_LOAN,
    ADD_LOAN,
    GET_LOAN,
    LOAN_MAKE_PAYMENT,
    DELETE_LOAN
} from '../../actionTypes/superadmin/loan.types';
import {objectToQuery} from 'src/helpers/helper';

export const loanList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/superadmin/loans${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: LIST_LOAN,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const loanStore = (data) => {
    return (dispatch) => {
        axios.post("/superadmin/loans/store", data)
        .then(response => {
            dispatch({
                type: ADD_LOAN,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const loanView = (id) => {
    return (dispatch) => {
        axios.get(`/superadmin/loans/view/${id}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: GET_LOAN,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const loanDelete = (id, data) => {
    return (dispatch) => {
        axios.delete(`/superadmin/loans/delete/${id}`, data)
        .then(response => {
            dispatch({
                type: DELETE_LOAN,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const loanPayment = (id, data) => {
    return (dispatch) => {
        axios.post(`/superadmin/loans/make-payment/${id}`, data)
        .then(response => {
            dispatch({
                type: LOAN_MAKE_PAYMENT,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}