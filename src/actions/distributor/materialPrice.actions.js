import axios from 'actions/axios';
import {
    DISTRIBUTOR_MATERIAL_PRICE_PRODUCT_PRICE_INFO
} from '../../actionTypes/distributor/materialPrice.types';
import {objectToQuery} from 'src/helpers/helper';

export const materialPriceProductPriceInfo = (id, data) => {
    return (dispatch) => {
        axios.get(`/distributor/material-prices/product-price-details/${id}`, data)
        .then(response => {
            dispatch({
                type: DISTRIBUTOR_MATERIAL_PRICE_PRODUCT_PRICE_INFO,
                payload: response.data.data
            });
        })
        .catch(error => {
        })
    }
}