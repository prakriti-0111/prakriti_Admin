import axios from 'actions/axios';
import {
    LIST_STOCKPRODUCT,
    CREATE_STOCKPRODUCT,
    ADD_STOCKPRODUCT,
    GET_STOCKPRODUCT,
    UPDATE_STOCKPRODUCT,
    DELETE_STOCKPRODUCT,
} from '../../actionTypes/superadmin/stockproduct.types';
import {objectToQuery} from 'src/helpers/helper';

export const stockproductList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/superadmin/stockproducts${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: LIST_STOCKPRODUCT,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const stockproductCreate = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/superadmin/stockproducts/create`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: CREATE_STOCKPRODUCT,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const stockproductStore = (data) => {
    return (dispatch) => {
        axios.post("/superadmin/stockproducts/store", data)
        .then(response => {
            dispatch({
                type: ADD_STOCKPRODUCT,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const stockproductView = (id) => {
    return (dispatch) => {
        axios.get(`/superadmin/stockproducts/fetch/${id}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: GET_STOCKPRODUCT,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const stockproductUpdate = (id, data) => {
    return (dispatch) => {
        axios.post(`/superadmin/stockproducts/update/${id}`, data)
        .then(response => {
            dispatch({
                type: UPDATE_STOCKPRODUCT,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const stockproductDelete = (id, data) => {
    return (dispatch) => {
        axios.delete(`/superadmin/stockproducts/delete/${id}`, data)
        .then(response => {
            dispatch({
                type: DELETE_STOCKPRODUCT,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}