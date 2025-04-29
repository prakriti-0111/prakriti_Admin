import axios from 'actions/axios';
import {
    DISTRIBUTOR_LIST_STOCKAPPLICATION,
    DISTRIBUTOR_GET_STOCK_PRODUCT_LIST,
    DISTRIBUTOR_GET_STOCK_PRODUCT_DETAILS,
    DISTRIBUTOR_GET_STOCK
} from '../../actionTypes/distributor/stocks.types';
import {objectToQuery} from 'src/helpers/helper';

export const stocksList = (params) => {
    params = objectToQuery(params, true);
    return (dispatch) => {
        axios.get(`/distributor/stocks${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: DISTRIBUTOR_LIST_STOCKAPPLICATION,
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
        axios.get(`/distributor/stocks/products${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: DISTRIBUTOR_GET_STOCK_PRODUCT_LIST,
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
        axios.get(`/distributor/stocks/product-details${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: DISTRIBUTOR_GET_STOCK_PRODUCT_DETAILS,
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
        axios.get(`/distributor/stocks/view/${id}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: DISTRIBUTOR_GET_STOCK,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const getPriceByCategory = async() => {
    return await axios.get(`/distributor/stocks/stock-price-by-category`);
}
