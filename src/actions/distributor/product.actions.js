import axios from 'actions/axios';
import {
    DISTRIBUTOR_LIST_PRODUCT,
    DISTRIBUTOR_GET_PRODUCT
} from '../../actionTypes/distributor/product.types';
import {objectToQuery} from 'src/helpers/helper';

export const productList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/distributor/products${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({  
                    type: DISTRIBUTOR_LIST_PRODUCT,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const productView = (id) => {
    return (dispatch) => {
        axios.get(`/distributor/products/view/${id}`)
        .then(response => {
            if(response.data.success){
                dispatch({  
                    type: DISTRIBUTOR_GET_PRODUCT,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}