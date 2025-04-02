import axios from 'actions/axios';
import {
    LIST_STATE,
    ADD_STATE,
    GET_STATE,
    UPDATE_STATE,
    DELETE_STATE,
} from '../../actionTypes/admin/state.types';
import {objectToQuery} from 'src/helpers/helper';

export const stateList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/admin/states${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: LIST_STATE,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const stateCreate = (data) => {
    return (dispatch) => {
        axios.post("/admin/states/store", data)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: ADD_STATE,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const stateFetch = (id) => {
    return (dispatch) => {
        axios.get(`/admin/states/fetch/${id}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: GET_STATE,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const stateUpdate = (id, data) => {
    return (dispatch) => {
        axios.post(`/admin/states/update/${id}`, data)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: UPDATE_STATE,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const stateDelete = (id, data) => {
    return (dispatch) => {
        axios.delete(`/admin/states/delete/${id}`, data)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: DELETE_STATE,
                    payload: true
                });
            }
        })
        .catch(error => {
        })
    }
}