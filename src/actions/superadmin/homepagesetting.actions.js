import axios from 'actions/axios';
import {
    LIST_HOMEPAGESETTING,
    UPDATE_HOMEPAGESETTING
} from '../../actionTypes/superadmin/homepagesetting.types';
import {objectToQuery} from 'src/helpers/helper';

export const homepagesettingList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/superadmin/homepagesettings${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: LIST_HOMEPAGESETTING,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const homepagesettingUpdate = (data) => {
    return (dispatch) => {
        axios.post(`/superadmin/homepagesettings/update`, data)
        .then(response => {
            dispatch({
                type: UPDATE_HOMEPAGESETTING,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}