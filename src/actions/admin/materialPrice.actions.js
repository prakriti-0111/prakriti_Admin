import axios from 'actions/axios';
import {
    ADMIN_MATERIAL_PRICE_PRODUCT_PRICE_INFO
} from '../../actionTypes/admin/materialPrice.types';
import {objectToQuery} from 'src/helpers/helper';

export const materialPriceProductPriceInfo = (id, data) => {
    return (dispatch) => {
        axios.get(`/admin/material-prices/product-price-details/${id}`, data)
        .then(response => {
            dispatch({
                type: ADMIN_MATERIAL_PRICE_PRODUCT_PRICE_INFO,
                payload: response.data.data
            });
        })
        .catch(error => {
        })
    }
}