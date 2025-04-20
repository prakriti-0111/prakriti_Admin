import axios from 'actions/axios';
import {
    LIST_MATERIAL,
    ADD_MATERIAL,
    UPDATE_MATERIAL,
    DELETE_MATERIAL,
} from '../../actionTypes/superadmin/material.types';
import {objectToQuery} from 'src/helpers/helper';

export const materialList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/superadmin/materials${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({  
                    type: LIST_MATERIAL,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const materialCreate = (data) => {
    return (dispatch) => {
        axios.post("/superadmin/materials/store", data)
        .then(response => {
            dispatch({
                type: ADD_MATERIAL,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const materialUpdate = (id, data) => {
    return (dispatch) => {
        axios.post(`/superadmin/materials/update/${id}`, data)
        .then(response => { 
            dispatch({
                type: UPDATE_MATERIAL,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const materialDelete = (id, data) => {
    return (dispatch) => {
        axios.delete(`/superadmin/materials/delete/${id}`, data)
        .then(response => {
            dispatch({
                type: DELETE_MATERIAL,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const materialRawList = (params) => {
    params = objectToQuery(params, true)
    return axios.get(`/superadmin/materials${params}`)
}