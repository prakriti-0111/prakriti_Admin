import axios from 'actions/axios';
import {
    ADMIN_LIST_STOCKAPPLICATION,
    ADMIN_GET_STOCK_PRODUCT_LIST,
    ADMIN_GET_STOCK_PRODUCT_DETAILS,
    ADMIN_GET_STOCK
} from '../../actionTypes/admin/stocks.types';
import {objectToQuery} from 'src/helpers/helper';

export const stocksList = (params) => {
    params = objectToQuery(params, true);
    return (dispatch) => {
        axios.get(`/admin/stocks${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: ADMIN_LIST_STOCKAPPLICATION,
                    payload: response.data.data 
                });
            }
        })
        .catch(error => {
        })
    }
}

export const stocksProductList = (params) => {
    params = objectToQuery(params, true);
    return (dispatch) => {
        axios.get(`/admin/stocks/products${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: ADMIN_GET_STOCK_PRODUCT_LIST,
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
        axios.get(`/admin/stocks/product-details${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: ADMIN_GET_STOCK_PRODUCT_DETAILS,
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
        axios.get(`/admin/stocks/view/${id}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: ADMIN_GET_STOCK,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const getPriceByCategory = async() => {
    return await axios.get(`/admin/stocks/stock-price-by-category`);
}
