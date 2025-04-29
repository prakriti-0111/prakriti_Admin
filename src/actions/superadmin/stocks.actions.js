import axios from 'actions/axios';
import {
    LIST_STOCKAPPLICATION,
    ADD_STOCKAPPLICATION,
    SUPERADMIN_GET_STOCK,
    GET_STOCK_PRODUCT_LIST,
    GET_STOCK_PRODUCT_DETAILS,
} from '../../actionTypes/superadmin/stocks.types';
import {objectToQuery} from 'src/helpers/helper';

export const stocksList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/superadmin/stocks${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: LIST_STOCKAPPLICATION,
                    payload: response.data.data 
                });
            }
        })
        .catch(error => {
        })
    }
}

export const stocksView = (id) => {
    return (dispatch) => {
        axios.get(`/superadmin/stocks/view/${id}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: SUPERADMIN_GET_STOCK,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}


export const stocksProductList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/superadmin/stocks/products${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: GET_STOCK_PRODUCT_LIST,
                    payload: response.data.data 
                });
            }
        })
        .catch(error => {
        })
    }
}

export const stocksProducDetails = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/superadmin/stocks/product-details${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: GET_STOCK_PRODUCT_DETAILS,
                    payload: response.data.data 
                });
            }
        })
        .catch(error => {
        })
    }
}

export const checkCertificateNo = async(data) => {
    return await axios.post(`/superadmin/stocks/check-certificate-exist`, data);
}

export const getPriceByCategory = async(params) => {
    params = objectToQuery(params, true)
    return await axios.get(`/superadmin/stocks/stock-price-by-category${params}`);
}

export const getCartItemById = async(params) => {
    params = objectToQuery(params, true)
    return await axios.get(`/superadmin/cart/checkdetail${params}`);
}

export const returnStockMoveToStock = async(data) => {
    return await axios.post(`/superadmin/stocks/return-stock/move-to-stock`, data);
}

