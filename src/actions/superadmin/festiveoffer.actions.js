import axios from 'actions/axios';
import {
    LIST_FESTIVEOFFER,
    CREATE_FESTIVEOFFER,
    ADD_FESTIVEOFFER,
    GET_FESTIVEOFFER,
    UPDATE_FESTIVEOFFER,
    DELETE_FESTIVEOFFER,
} from '../../actionTypes/superadmin/festiveoffer.types';
import {objectToQuery} from 'src/helpers/helper';

export const festiveofferList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/superadmin/festiveoffers${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: LIST_FESTIVEOFFER,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const festiveofferCreate = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/superadmin/festiveoffers/create`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: CREATE_FESTIVEOFFER,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const festiveofferStore = (data) => {
    return (dispatch) => {
        axios.post("/superadmin/festiveoffers/store", data)
        .then(response => {
            dispatch({
                type: ADD_FESTIVEOFFER,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const festiveofferView = (id) => {
    return (dispatch) => {
        axios.get(`/superadmin/festiveoffers/fetch/${id}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: GET_FESTIVEOFFER,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const festiveofferUpdate = (id, data) => {
    return (dispatch) => {
        axios.post(`/superadmin/festiveoffers/update/${id}`, data)
        .then(response => {
            dispatch({
                type: UPDATE_FESTIVEOFFER,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const festiveofferDelete = (id, data) => {
    return (dispatch) => {
        axios.delete(`/superadmin/festiveoffers/delete/${id}`, data)
        .then(response => {
            dispatch({
                type: DELETE_FESTIVEOFFER,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}