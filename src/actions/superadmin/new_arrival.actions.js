import axios from 'actions/axios';
import {
    LIST_NEW_ARRIVAL,
    ADD_NEW_ARRIVAL,
    GET_NEW_ARRIVAL,
    UPDATE_NEW_ARRIVAL,
    DELETE_NEW_ARRIVAL,
} from '../../actionTypes/superadmin/newArrival.types';
import {objectToQuery} from 'src/helpers/helper';

export const newArrivalList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/superadmin/new-arrivals${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({  
                    type: LIST_NEW_ARRIVAL,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const newArrivalCreate = (data) => {
    return (dispatch) => {
        axios.post("/superadmin/new-arrivals/store", data)
        .then(response => {
            dispatch({
                type: ADD_NEW_ARRIVAL,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }

}


export const newArrivalFetch = (id) => {
    return (dispatch) => {
        axios.get(`/superadmin/new-arrivals/fetch/${id}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: GET_NEW_ARRIVAL,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const newArrivalUpdate = (id, data) => { 
    return (dispatch) => {
        axios.post(`/superadmin/new-arrivals/update/${id}`, data)
        .then(response => { 
            dispatch({
                type: UPDATE_NEW_ARRIVAL,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const newArrivalDelete = (id, data) => {
    return (dispatch) => {
        axios.delete(`/superadmin/new-arrivals/delete/${id}`, data)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: DELETE_NEW_ARRIVAL,
                    payload: response.data
                });
            }
        })
        .catch(error => {
        })
    }
}