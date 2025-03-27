import axios from 'actions/axios';
import {
    LIST_BANNER,
    ADD_BANNER,
    GET_BANNER,
    UPDATE_BANNER,
    DELETE_BANNER,
} from '../../actionTypes/superadmin/banner.types';
import {objectToQuery} from 'src/helpers/helper';

export const bannerList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/superadmin/banners${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({  
                    type: LIST_BANNER,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const bannerCreate = (data) => {
    return (dispatch) => {
        axios.post("/superadmin/banners/store", data)
        .then(response => {
            dispatch({
                type: ADD_BANNER,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }

}


export const bannerFetch = (id) => {
    return (dispatch) => {
        axios.get(`/superadmin/banners/fetch/${id}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: GET_BANNER,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const bannerUpdate = (id, data) => { 
    return (dispatch) => {
        axios.post(`/superadmin/banners/update/${id}`, data)
        .then(response => { 
            dispatch({
                type: UPDATE_BANNER,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const bannerDelete = (id, data) => {
    return (dispatch) => {
        axios.delete(`/superadmin/banners/delete/${id}`, data)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: DELETE_BANNER,
                    payload: response.data
                });
            }
        })
        .catch(error => {
        })
    }
}