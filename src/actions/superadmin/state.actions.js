import axios from 'actions/axios';
import {
    LIST_STATE,
    ADD_STATE,
    GET_STATE,
    UPDATE_STATE,
    DELETE_STATE,
} from '../../actionTypes/superadmin/state.types';
import {objectToQuery} from 'src/helpers/helper';

export const stateList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/superadmin/states${params}`)
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
        axios.post("/superadmin/states/store", data)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: ADD_STATE,
                    payload: response.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const stateFetch = (id) => {
    return (dispatch) => {
        axios.get(`/superadmin/states/fetch/${id}`)
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
        axios.post(`/superadmin/states/update/${id}`, data)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: UPDATE_STATE,
                    payload: response.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const stateDelete = (id, data) => {
    return (dispatch) => {
        axios.delete(`/superadmin/states/delete/${id}`, data)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: DELETE_STATE,
                    payload: response.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const rawStateList = async (params) => {
    params = objectToQuery(params, true)
    return await axios.get(`/superadmin/states${params}`);
}