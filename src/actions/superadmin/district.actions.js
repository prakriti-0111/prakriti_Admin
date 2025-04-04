import axios from 'actions/axios';
import {
    LIST_DISTRICT,
    ADD_DISTRICT,
    GET_DISTRICT,
    UPDATE_DISTRICT,
    DELETE_DISTRICT,
} from '../../actionTypes/superadmin/district.types';
import {objectToQuery} from 'src/helpers/helper';

export const districtList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/superadmin/districts${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: LIST_DISTRICT,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const districtCreate = (data) => {
    return (dispatch) => {
        axios.post("/superadmin/districts/store", data)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: ADD_DISTRICT,
                    payload: response.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const districtFetch = (id) => {
    return (dispatch) => {
        axios.get(`/superadmin/districts/fetch/${id}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: GET_DISTRICT,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const districtUpdate = (id, data) => {
    return (dispatch) => {
        axios.post(`/superadmin/districts/update/${id}`, data)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: UPDATE_DISTRICT,
                    payload: response.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const districtDelete = (id, data) => {
    return (dispatch) => {
        axios.delete(`/superadmin/districts/delete/${id}`, data)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: DELETE_DISTRICT,
                    payload: response.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const rawDistrictList = async (params) => {
    params = objectToQuery(params, true)
    return await axios.get(`/superadmin/districts${params}`);
}