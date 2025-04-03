import axios from 'actions/axios';
import {
    SUPERADMIN_LIST_CUSTOMER,
} from '../../actionTypes/superadmin/customer.types';
import {objectToQuery} from 'src/helpers/helper';

export const customerList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/superadmin/customers${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: SUPERADMIN_LIST_CUSTOMER,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const customerFetch = (id) => {
    return axios.get(`/superadmin/customer/view/${id}`)
}