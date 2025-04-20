import axios from 'actions/axios';
import {
    ADMIN_LIST_DISTRIBUTOR,
    ADMIN_ADD_DISTRIBUTOR,
    ADMIN_GET_DISTRIBUTOR,
    ADMIN_UPDATE_DISTRIBUTOR,
    ADMIN_DELETE_DISTRIBUTOR
} from '../../actionTypes/admin/distributor.types';
import {objectToQuery} from 'src/helpers/helper';

export const distributorList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/admin/distributors${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: ADMIN_LIST_DISTRIBUTOR,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const distributorCreate = (data) => {
    return (dispatch) => {
        axios.post("/admin/distributors/store", data)
        .then(response => {
            dispatch({
                type: ADMIN_ADD_DISTRIBUTOR,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const distributorFetch = (id) => {
    return (dispatch) => {
        axios.get(`/admin/distributors/fetch/${id}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: ADMIN_GET_DISTRIBUTOR,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const distributorUpdate = (id, data) => {
    return (dispatch) => {
        axios.post(`/admin/distributors/update/${id}`, data)
        .then(response => {
            dispatch({
                type: ADMIN_UPDATE_DISTRIBUTOR,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const distributorDelete = (id, data) => {
    return (dispatch) => {
        axios.delete(`/admin/distributors/delete/${id}`, data)
        .then(response => {
            dispatch({
                type: ADMIN_DELETE_DISTRIBUTOR,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}