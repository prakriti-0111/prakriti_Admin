import axios from 'actions/axios';
import {
    ADMIN_LIST_PRODUCT
} from '../../actionTypes/admin/product.types';
import {objectToQuery} from 'src/helpers/helper';

export const productList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/admin/product${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: ADMIN_LIST_PRODUCT,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}