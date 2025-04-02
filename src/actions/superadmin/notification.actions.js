import axios from 'actions/axios';
import {
    SUPERADMIN_NOTIFICATION_LIST
} from '../../actionTypes/superadmin/notification.types';
import {objectToQuery} from 'src/helpers/helper';


export const getNotifiactions = (params) => {
    params = objectToQuery(params, true);
    return (dispatch) => {
        axios.get(`/superadmin/notifications${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: SUPERADMIN_NOTIFICATION_LIST,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const readNotifiaction = (id) => {
    return (dispatch) => {
        axios.post("/superadmin/notifications/read/" + id)
        .then(response => {
            
        })
        .catch(error => {
        })
    }
} 


