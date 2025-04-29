import axios from 'actions/axios';
import {
    LIST_MATERIAL_PRICE,
    ADD_MATERIAL_PRICE,
    GET_MATERIAL_PRICE,
    UPDATE_MATERIAL_PRICE,
    DELETE_MATERIAL_PRICE,
    MATERIAL_PRICE_PRODUCT_PRICE_INFO
} from '../../actionTypes/superadmin/materialPrice.types';
import {objectToQuery} from 'src/helpers/helper';

export const materialPriceList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/superadmin/material-prices${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: LIST_MATERIAL_PRICE,
                    payload: response.data.data
                });
            }
            return response.data;
        })
        .catch(error => {
        })
    }
}

export const materialPriceStore = (data) => {
    return (dispatch) => {
        axios.post("/superadmin/material-prices/store", data)
        .then(response => {
            dispatch({
                type: ADD_MATERIAL_PRICE,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const materialPriceView = (id) => {
    return (dispatch) => {
        axios.get(`/superadmin/material-prices/view/${id}`)
        .then(response => {
            console.log(response.data.data)
            if(response.data.success){
                dispatch({
                    type: GET_MATERIAL_PRICE,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const materialPriceUpdate = (id, data) => {
    return (dispatch) => {
        axios.post(`/superadmin/material-prices/update/${id}`, data)
        .then(response => {
            dispatch({
                type: UPDATE_MATERIAL_PRICE,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const materialPriceDelete = (id, data) => {
    return (dispatch) => {
        axios.delete(`/superadmin/material-prices/delete/${id}`, data)
        .then(response => {
            dispatch({
                type: DELETE_MATERIAL_PRICE,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const materialPriceProductPriceInfo = (id, data) => {
    return (dispatch) => {
        axios.get(`/superadmin/material-prices/product-price-details/${id}`, data)
        .then(response => {
            dispatch({
                type: MATERIAL_PRICE_PRODUCT_PRICE_INFO,
                payload: response.data.data
            });
        })
        .catch(error => {
        })
    }
}

export const materialPriceRawList = (params) => {
    params = objectToQuery(params, true)
    return axios.get(`/superadmin/material-prices${params}`)
}