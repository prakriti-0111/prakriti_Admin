import axios from 'actions/axios';
import {
    LIST_RETURN_SALE,
    GET_RETURN_SALE,
} from '../../actionTypes/superadmin/returnSale.types';
import {objectToQuery} from 'src/helpers/helper';

export const returnSaleList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/superadmin/return-sales${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: LIST_RETURN_SALE,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}
export const returnSaleView = (id) => {
    return (dispatch) => {
        axios.get(`/superadmin/return-sales/view/${id}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: GET_RETURN_SALE,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const returnSaleViewRaw = (id) => {
    return axios.get(`/superadmin/return-sales/view/${id}`)
}

export const returnSaleUpdateStatus = (id, data) => {
    return axios.post("/superadmin/return-sales/update-status/" + id, data)
}