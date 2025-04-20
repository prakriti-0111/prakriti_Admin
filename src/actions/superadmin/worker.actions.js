import axios from 'actions/axios';
import {
    SUPERADMIN_LIST_WORKER,
    SUPERADMIN_ADD_WORKER,
    SUPERADMIN_GET_WORKER,
    SUPERADMIN_UPDATE_WORKER,
    SUPERADMIN_DELETE_WORKER,
} from '../../actionTypes/superadmin/worker.types';
import {objectToQuery} from 'src/helpers/helper';

export const workerList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/superadmin/workers${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: SUPERADMIN_LIST_WORKER,
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
        axios.post("/superadmin/workers/store", data)
        .then(response => {
                dispatch({
                    type: SUPERADMIN_ADD_WORKER,
                    payload: response.data
                });
        })
        .catch(error => {
        })
    }
}

export const workerFetch = (id) => {
    return (dispatch) => {
        axios.get(`/superadmin/workers/fetch/${id}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: SUPERADMIN_GET_WORKER,
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
        axios.post(`/superadmin/workers/update/${id}`, data)
        .then(response => {
                dispatch({
                    type: SUPERADMIN_UPDATE_WORKER,
                    payload: response.data
                });
        })
        .catch(error => {
        })
    }
}

export const workerDelete = (id, data) => {
    return (dispatch) => {
        axios.delete(`/superadmin/workers/delete/${id}`, data)
        .then(response => {
                dispatch({
                    type: SUPERADMIN_DELETE_WORKER,
                    payload: response.data
                });
        })
        .catch(error => {
        })
    }
}