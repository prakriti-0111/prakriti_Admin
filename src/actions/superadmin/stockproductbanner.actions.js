import axios from 'actions/axios';
import {
    LIST_STOCKPRODUCTBANNER,
    CREATE_STOCKPRODUCTBANNER,
    ADD_STOCKPRODUCTBANNER,
    GET_STOCKPRODUCTBANNER,
    UPDATE_STOCKPRODUCTBANNER,
    DELETE_STOCKPRODUCTBANNER,
} from '../../actionTypes/superadmin/stockproductbanner.types';
import {objectToQuery} from 'src/helpers/helper';

export const stockproductList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/superadmin/stockproducts${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: LIST_STOCKPRODUCTBANNER,
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
                    type: CREATE_STOCKPRODUCTBANNER,
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
                type: ADD_STOCKPRODUCTBANNER,
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
                    type: GET_STOCKPRODUCTBANNER,
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
                type: UPDATE_STOCKPRODUCTBANNER,
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
                type: DELETE_STOCKPRODUCTBANNER,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}