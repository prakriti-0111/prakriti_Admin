import axios from 'actions/axios';
import {
    SUPERADMIN_CART_LIST,
    SUPERADMIN_CART_ADD,
    SUPERADMIN_CART_DELETE
} from '../../actionTypes/superadmin/cart.types';
import {objectToQuery} from 'src/helpers/helper';

export const cartList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/superadmin/carts${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({  
                    type: SUPERADMIN_CART_LIST,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const cartListRaw = (params) => {
    params = objectToQuery(params, true);
    return axios.get(`/superadmin/carts${params}`);
}

export const cartStore = (data) => {
    return (dispatch) => {
        axios.post(`/superadmin/carts/store`, data)
        .then(response => {
            dispatch({  
                type: SUPERADMIN_CART_ADD,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const cartDelete = (id, raw) => {
    if(raw){
        return axios.delete(`/superadmin/carts/delete/${id}`);
    }else{
        return (dispatch) => {
            axios.delete(`/superadmin/carts/delete/${id}`)
            .then(response => {
                dispatch({  
                    type: SUPERADMIN_CART_DELETE,
                    payload: response.data
                });
            })
            .catch(error => {
            })
        }
    }
}