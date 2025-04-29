import axios from 'actions/axios';
import {
    DISTRIBUTOR_LIST_RETAILER
} from '../../actionTypes/distributor/retailer.types';
import {objectToQuery} from 'src/helpers/helper';

export const retailerList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/distributor/retailers${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: DISTRIBUTOR_LIST_RETAILER,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}
