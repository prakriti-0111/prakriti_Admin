import axios from 'actions/axios';
import {
    DISTRIBUTOR_LIST_SALE_EXECUTIVE
} from '../../actionTypes/distributor/sale_executive.types';
import {objectToQuery} from 'src/helpers/helper';

export const saleExecutiveList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/distributor/sale-executive${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: DISTRIBUTOR_LIST_SALE_EXECUTIVE,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}
