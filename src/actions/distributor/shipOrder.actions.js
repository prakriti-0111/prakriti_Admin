import axios from 'actions/axios';
import {
    LIST_SHIP_ORDER,
} from '../../actionTypes/distributor/shipOrder.types';
import {objectToQuery} from 'src/helpers/helper';

export const shipOrderList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/distributor/orders${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: LIST_SHIP_ORDER,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}


export const shipOrderView = (id) => {
    return (dispatch) => {
        axios.get(`/distributor/orders/fetch/${id}`)
        .then(response => {
            console.log(response.data.data)
            if(response.data.success){
                dispatch({
                    type: GET_SHIP_ORDER,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}


