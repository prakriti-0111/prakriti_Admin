import axios from 'actions/axios';
import {
    LIST_CATEGORY,
    ADD_CATEGORY,
    GET_CATEGORY,
    UPDATE_CATEGORY,
    DELETE_CATEGORY,
} from '../../actionTypes/superadmin/category.types';
import {objectToQuery} from 'src/helpers/helper';

export const categoryList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/superadmin/categories${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({  
                    type: LIST_CATEGORY,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const categoryCreate = (data) => {
    return (dispatch) => {
        axios.post("/superadmin/categories/store", data)
        .then(response => {
            dispatch({
                type: ADD_CATEGORY,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }

}


export const categoryFetch = (id) => {
    return (dispatch) => {
        axios.get(`/superadmin/categories/fetch/${id}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: GET_CATEGORY,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const categoryUpdate = (id, data) => { 
    return (dispatch) => {
        axios.post(`/superadmin/categories/update/${id}`, data)
        .then(response => { 
            dispatch({
                type: UPDATE_CATEGORY,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const categoryDelete = (id, data) => {
    return (dispatch) => {
        axios.delete(`/superadmin/categories/delete/${id}`, data)
        .then(response => {
            dispatch({
                type: DELETE_CATEGORY,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}