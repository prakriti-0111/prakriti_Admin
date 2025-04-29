import axios from 'actions/axios';
import {
    LIST_PROMOCODE,
    CREATE_PROMOCODE,
    ADD_PROMOCODE,
    GET_PROMOCODE,
    UPDATE_PROMOCODE,
    DELETE_PROMOCODE,
} from '../../actionTypes/superadmin/promocode.types';
import {objectToQuery} from 'src/helpers/helper';

export const promocodeList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/superadmin/promocodes${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: LIST_PROMOCODE,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const promocodeCreate = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/superadmin/promocodes/create`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: CREATE_PROMOCODE,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const promocodeStore = (data) => {
    return (dispatch) => {
        axios.post("/superadmin/promocodes/store", data)
        .then(response => {
            dispatch({
                type: ADD_PROMOCODE,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const promocodeView = (id) => {
    return (dispatch) => {
        axios.get(`/superadmin/promocodes/view/${id}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: GET_PROMOCODE,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const promocodeUpdate = (id, data) => {
    return (dispatch) => {
        axios.post(`/superadmin/promocodes/update/${id}`, data)
        .then(response => {
            dispatch({
                type: UPDATE_PROMOCODE,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const promocodeDelete = (id, data) => {
    return (dispatch) => {
        axios.delete(`/superadmin/promocodes/delete/${id}`, data)
        .then(response => {
            dispatch({
                type: DELETE_PROMOCODE,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}