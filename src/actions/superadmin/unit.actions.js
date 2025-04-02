import axios from 'actions/axios';
import {
    LIST_UNIT,
    ADD_UNIT,
    GET_UNIT,
    UPDATE_UNIT,
    DELETE_UNIT,
} from '../../actionTypes/superadmin/unit.types';
import {objectToQuery} from 'src/helpers/helper';

export const unitList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/superadmin/units${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: LIST_UNIT,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const unitCreate = (data) => {
    return (dispatch) => {
        axios.post("/superadmin/units/store", data)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: ADD_UNIT,
                    payload: response.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const unitFetch = (id) => {
    return (dispatch) => {
        axios.get(`/superadmin/units/fetch/${id}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: GET_UNIT,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const unitUpdate = (id, data) => {
    return (dispatch) => {
        axios.post(`/superadmin/units/update/${id}`, data)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: UPDATE_UNIT,
                    payload: response.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const unitDelete = (id, data) => {
    return (dispatch) => {
        axios.delete(`/superadmin/units/delete/${id}`, data)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: DELETE_UNIT,
                    payload: response.data
                });
            }
        })
        .catch(error => {
        })
    }
}