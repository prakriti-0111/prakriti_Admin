import axios from 'actions/axios';
import {
    SUPERADMIN_LIST_DISTRIBUTOR,
    SUPERADMIN_ADD_DISTRIBUTOR,
    SUPERADMIN_GET_DISTRIBUTOR,
    SUPERADMIN_UPDATE_DISTRIBUTOR,
    SUPERADMIN_DELETE_DISTRIBUTOR,
} from '../../actionTypes/superadmin/distributor.types';
import {objectToQuery} from 'src/helpers/helper';

export const distributorList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/superadmin/distributors${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: SUPERADMIN_LIST_DISTRIBUTOR,
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
        axios.post("/superadmin/distributors/store", data)
        .then(response => {
            dispatch({
                type: SUPERADMIN_ADD_DISTRIBUTOR,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const distributorFetch = (id) => {
    return (dispatch) => {
        axios.get(`/superadmin/distributors/fetch/${id}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: SUPERADMIN_GET_DISTRIBUTOR,
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
        axios.post(`/superadmin/distributors/update/${id}`, data)
        .then(response => {
            dispatch({
                type: SUPERADMIN_UPDATE_DISTRIBUTOR,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const distributorDelete = (id, data) => {
    return (dispatch) => {
        axios.delete(`/superadmin/distributors/delete/${id}`, data)
        .then(response => {
                dispatch({
                    type: SUPERADMIN_DELETE_DISTRIBUTOR,
                    payload: response.data
                });
        })
        .catch(error => {
        })
    }
}
