import axios from 'actions/axios';
import {
    SUPERADMIN_LIST_REASON
} from '../../actionTypes/superadmin/reason.types';
import {objectToQuery} from 'src/helpers/helper';


export const reasonList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/superadmin/reasons`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: SUPERADMIN_LIST_REASON,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}