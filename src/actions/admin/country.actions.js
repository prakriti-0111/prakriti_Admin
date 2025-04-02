import axios from 'actions/axios';
import {
    LIST_COUNTRY,
    ADD_COUNTRY,
    GET_COUNTRY,
    UPDATE_COUNTRY,
    DELETE_COUNTRY,
} from '../../actionTypes/admin/country.types';
import {objectToQuery} from 'src/helpers/helper';

export const countryList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/admin/countries${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: LIST_COUNTRY,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const countryCreate = (data) => {
    return (dispatch) => {
        axios.post("/admin/countries/store", data)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: ADD_COUNTRY,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const countryFetch = (id) => {
    return (dispatch) => {
        axios.get(`/admin/countries/fetch/${id}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: GET_COUNTRY,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const countryUpdate = (id, data) => {
    return (dispatch) => {
        axios.post(`/admin/countries/update/${id}`, data)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: UPDATE_COUNTRY,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const countryDelete = (id, data) => {
    return (dispatch) => {
        axios.delete(`/admin/countries/delete/${id}`, data)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: DELETE_COUNTRY,
                    payload: true
                });
            }
        })
        .catch(error => {
        })
    }
}