import axios from 'actions/axios';
import {
    ADMIN_CART_LIST,
    ADMIN_CART_ADD,
    ADMIN_CART_DELETE
} from '../../actionTypes/admin/cart.types';
import {objectToQuery} from 'src/helpers/helper';

export const cartList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/admin/carts${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({  
                    type: ADMIN_CART_LIST,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const cartStore = (data) => {
    return (dispatch) => {
        axios.post(`/admin/carts/store`, data)
        .then(response => {
            dispatch({  
                type: ADMIN_CART_ADD,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const cartDelete = (id) => {
    return (dispatch) => {
        axios.delete(`/admin/carts/delete/${id}`)
        .then(response => {
            dispatch({  
                type: ADMIN_CART_DELETE,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}