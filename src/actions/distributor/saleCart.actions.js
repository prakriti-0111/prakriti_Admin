import axios from 'actions/axios';
import {
    DISTRIBUTOR_SALE_CART_LIST,
    DISTRIBUTOR_SALE_CART_ADD,
    DISTRIBUTOR_SALE_CART_DELETE
} from '../../actionTypes/distributor/saleCart.types';
import {objectToQuery} from 'src/helpers/helper';

export const saleCartList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/distributor/sale-carts${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({  
                    type: DISTRIBUTOR_SALE_CART_LIST,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const saleCartListRaw = (params) => {
    params = objectToQuery(params, true);
    return axios.get(`/distributor/sale-carts${params}`);
}

export const saleCartStore = (data) => {
    return (dispatch) => {
        axios.post(`/distributor/sale-carts/store`, data)
        .then(response => {
            dispatch({  
                type: DISTRIBUTOR_SALE_CART_ADD,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const saleCartDelete = (id, raw) => {
    if(raw){
        return axios.delete(`/distributor/sale-carts/delete/${id}`);
    }else{
        return (dispatch) => {
            axios.delete(`/distributor/sale-carts/delete/${id}`)
            .then(response => {
                dispatch({  
                    type: DISTRIBUTOR_SALE_CART_DELETE,
                    payload: response.data
                });
            })
            .catch(error => {
            })
        }
    }
}