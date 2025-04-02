import axios from 'actions/axios';
import {
    LIST_WORKER,
    ADD_WORKER,
    GET_WORKER,
    UPDATE_WORKER,
    DELETE_WORKER,
} from '../../actionTypes/manager/worker.types';
import {objectToQuery} from 'src/helpers/helper';

export const workerList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/manager/workers${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: LIST_WORKER,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const workerCreate = (data) => {
    return (dispatch) => {
        axios.post("/manager/workers/store", data)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: ADD_WORKER,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const workerFetch = (id) => {
    return (dispatch) => {
        axios.get(`/manager/workers/fetch/${id}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: GET_WORKER,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const workerUpdate = (id, data) => {
    return (dispatch) => {
        axios.post(`/manager/workers/update/${id}`, data)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: UPDATE_WORKER,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const workerDelete = (id, data) => {
    return (dispatch) => {
        axios.delete(`/manager/workers/delete/${id}`, data)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: DELETE_WORKER,
                    payload: true
                });
            }
        })
        .catch(error => {
        })
    }
}

export const workerStock = (params) => {
    params = objectToQuery(params, true)
    return axios.get(`/manager/worker-stock${params}`)
}