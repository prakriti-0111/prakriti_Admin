import axios from 'actions/axios';
import {
    SUPERADMIN_LIST_VISIT,
    SUPERADMIN_ADD_VISIT,
    SUPERADMIN_GET_VISIT,
    SUPERADMIN_UPDATE_VISIT,
    SUPERADMIN_DELETE_VISIT,
} from '../../actionTypes/superadmin/visit.types';
import {objectToQuery} from 'src/helpers/helper';

export const visitList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/superadmin/visit${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: SUPERADMIN_LIST_VISIT,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const visitCreate = (data) => {
    return (dispatch) => {
        axios.post("/superadmin/visit/store", data)
        .then(response => {
            dispatch({
                type: SUPERADMIN_ADD_VISIT,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}
