import axios from 'actions/axios';
import {
    ADMIN_SALE_CART_LIST,
    ADMIN_SALE_CART_ADD,
    ADMIN_SALE_CART_DELETE
} from '../../actionTypes/admin/saleCart.types';
import {objectToQuery} from 'src/helpers/helper';

export const saleCartList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/admin/sale-carts${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({  
                    type: ADMIN_SALE_CART_LIST,
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
    return axios.get(`/admin/sale-carts${params}`);
}

export const saleCartStore = (data) => {
    return (dispatch) => {
        axios.post(`/admin/sale-carts/store`, data)
        .then(response => {
            dispatch({  
                type: ADMIN_SALE_CART_ADD,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const saleCartDelete = (id, raw) => {
    if(raw){
        return axios.delete(`/admin/sale-carts/delete/${id}`);
    }else{
        return (dispatch) => {
            axios.delete(`/admin/sale-carts/delete/${id}`)
            .then(response => {
                dispatch({  
                    type: ADMIN_SALE_CART_DELETE,
                    payload: response.data
                });
            })
            .catch(error => {
            })
        }
    }
}