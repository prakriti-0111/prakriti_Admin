import axios from 'actions/axios';
import {
    LIST_HOLIDAY,
    ADD_HOLIDAY,
    GET_HOLIDAY,
    UPDATE_HOLIDAY,
    DELETE_HOLIDAY,
} from '../../actionTypes/superadmin/holiday.types';
import {objectToQuery} from 'src/helpers/helper';

export const holidayList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/superadmin/holidays${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({  
                    type: LIST_HOLIDAY,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const holidayCreate = (data) => {
    return (dispatch) => {
        axios.post("/superadmin/holidays/store", data)
        .then(response => {
            dispatch({
                type: ADD_HOLIDAY,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }

}


export const holidayFetch = (id) => {
    return (dispatch) => {
        axios.get(`/superadmin/holidays/fetch/${id}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: GET_HOLIDAY,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const holidayUpdate = (id, data) => { 
    return (dispatch) => {
        axios.post(`/superadmin/holidays/update/${id}`, data)
        .then(response => { 
            dispatch({
                type: UPDATE_HOLIDAY,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const holidayDelete = (id, data) => {
    return (dispatch) => {
        axios.delete(`/superadmin/holidays/delete/${id}`, data)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: DELETE_HOLIDAY,
                    payload: response.data
                });
            }
        })
        .catch(error => {
        })
    }
}