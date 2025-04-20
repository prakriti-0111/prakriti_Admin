import axios from 'actions/axios';
import {
    LIST_STOCK_PRODUCT
} from '../../actionTypes/superadmin/stockProduct.types';
import {objectToQuery} from 'src/helpers/helper';

export const stockProductList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/superadmin/stock-product${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: LIST_STOCK_PRODUCT,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}
