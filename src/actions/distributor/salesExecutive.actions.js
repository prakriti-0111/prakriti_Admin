import axios from 'actions/axios';
import {
    DISTRIBUTOR_LIST_SALESEXECUTIVE
} from '../../actionTypes/distributor/salesExecutive.types';
import {objectToQuery} from 'src/helpers/helper';

export const salesExecutiveList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/distributor/employees${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: DISTRIBUTOR_LIST_SALESEXECUTIVE,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}