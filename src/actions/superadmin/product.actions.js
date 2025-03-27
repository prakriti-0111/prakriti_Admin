import axios from 'actions/axios';
import {
    LIST_PRODUCT,
    CREATE_PRODUCT,
    ADD_PRODUCT,
    GET_PRODUCT,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,
} from '../../actionTypes/superadmin/product.types';
import {objectToQuery} from 'src/helpers/helper';

export const productList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/superadmin/product${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: LIST_PRODUCT,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const productCreate = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/superadmin/product/create`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: CREATE_PRODUCT,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const productStore = (data) => {
    return (dispatch) => {
        axios.post("/superadmin/product/store", data)
        .then(response => {
            dispatch({
                type: ADD_PRODUCT,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const productView = (id) => {
    return (dispatch) => {
        axios.get(`/superadmin/product/view/${id}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: GET_PRODUCT,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const productUpdate = (id, data) => {
    return (dispatch) => {
        axios.post(`/superadmin/product/update/${id}`, data)
        .then(response => {
            dispatch({
                type: UPDATE_PRODUCT,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const productDelete = (id, data) => {
    return (dispatch) => {
        axios.delete(`/superadmin/product/delete/${id}`, data)
        .then(response => {
            dispatch({
                type: DELETE_PRODUCT,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}
