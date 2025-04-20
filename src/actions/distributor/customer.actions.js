import axios from 'actions/axios';
import {
    DISTRIBUTOR_LIST_CUSTOMER,
} from '../../actionTypes/distributor/customer.types';
import {objectToQuery} from 'src/helpers/helper';

export const customerList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/distributor/customers${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: DISTRIBUTOR_LIST_CUSTOMER,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}