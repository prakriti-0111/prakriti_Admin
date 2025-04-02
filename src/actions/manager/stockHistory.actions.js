import axios from 'actions/axios';
import {
    LIST_STOCK_HISTORY,
    ADD_STOCK_HISTORY,
    GET_STOCK_HISTORY,
    UPDATE_STOCK_HISTORY,
    DELETE_STOCK_HISTORY,
    GET_STOCK_HISTORY_MATERIALS
} from '../../actionTypes/manager/stockHistory.types';
import {objectToQuery} from 'src/helpers/helper';

export const stockHistoryList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/manager/stock-histories${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: LIST_STOCK_HISTORY,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const stockHistoryCreate = (data) => {
    return (dispatch) => {
        axios.post("/manager/stock-histories/store", data)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: ADD_STOCK_HISTORY,
                    payload: response.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const stockHistoryFetch = (id) => {
    return (dispatch) => {
        axios.get(`/manager/stock-histories/fetch/${id}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: GET_STOCK_HISTORY,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const stockHistoryUpdate = (id, data) => {
    return (dispatch) => {
        axios.post(`/manager/stock-histories/update/${id}`, data)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: UPDATE_STOCK_HISTORY,
                    payload: response.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const stockHistoryDelete = (id, data) => {
    return (dispatch) => {
        axios.delete(`/manager/stock-histories/delete/${id}`, data)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: DELETE_STOCK_HISTORY,
                    payload: response.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const stockHistoryMaterials = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/manager/materials${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: GET_STOCK_HISTORY_MATERIALS,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}