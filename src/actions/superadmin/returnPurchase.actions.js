import axios from 'actions/axios';
import {
    LIST_RETURN_PURCHASE,
    GET_RETURN_PURCHASE,
} from '../../actionTypes/superadmin/returnPurchase.types';
import {objectToQuery} from 'src/helpers/helper';

export const returnPurchaseList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/superadmin/return-purchases${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: LIST_RETURN_PURCHASE,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}
export const returnPurchaseView = (id) => {
    return (dispatch) => {
        axios.get(`/superadmin/return-purchases/view/${id}`)
        .then(response => {
            console.log(response.data.data)
            if(response.data.success){
                dispatch({
                    type: GET_RETURN_PURCHASE,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}