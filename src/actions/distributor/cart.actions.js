import axios from 'actions/axios';
import {
    DISTRIBUTOR_CART_LIST,
    DISTRIBUTOR_CART_ADD,
    DISTRIBUTOR_CART_DELETE
} from '../../actionTypes/distributor/cart.types';
import {objectToQuery} from 'src/helpers/helper';

export const cartList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/distributor/carts${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({  
                    type: DISTRIBUTOR_CART_LIST,
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
        axios.post(`/distributor/carts/store`, data)
        .then(response => {
            dispatch({  
                type: DISTRIBUTOR_CART_ADD,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const cartDelete = (id) => {
    return (dispatch) => {
        axios.delete(`/distributor/carts/delete/${id}`)
        .then(response => {
            dispatch({  
                type: DISTRIBUTOR_CART_DELETE,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}