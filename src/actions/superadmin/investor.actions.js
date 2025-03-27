import axios from 'actions/axios';
import {
    SUPERADMIN_LIST_INVESTOR,
    SUPERADMIN_ADD_INVESTOR,
    SUPERADMIN_GET_INVESTOR,
    SUPERADMIN_UPDATE_INVESTOR,
    SUPERADMIN_DELETE_INVESTOR,
} from '../../actionTypes/superadmin/investor.types';
import {objectToQuery} from 'src/helpers/helper';

export const investorList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/superadmin/investors${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: SUPERADMIN_LIST_INVESTOR,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const investorCreate = (data) => {
    return (dispatch) => {
        axios.post("/superadmin/investors/store", data)
        .then(response => {
                dispatch({
                    type: SUPERADMIN_ADD_INVESTOR,
                    payload: response.data
                });
        })
        .catch(error => {
        })
    }
}

export const investorFetch = (id) => {
    return (dispatch) => {
        axios.get(`/superadmin/investors/fetch/${id}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: SUPERADMIN_GET_INVESTOR,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const investorUpdate = (id, data) => {
    return (dispatch) => {
        axios.post(`/superadmin/investors/update/${id}`, data)
        .then(response => {
                dispatch({
                    type: SUPERADMIN_UPDATE_INVESTOR,
                    payload: response.data
                });
        })
        .catch(error => {
        })
    }
}

export const investorDelete = (id, data) => {
    return (dispatch) => {
        axios.delete(`/superadmin/investors/delete/${id}`, data)
        .then(response => {
                dispatch({
                    type: SUPERADMIN_DELETE_INVESTOR,
                    payload: response.data
                });
        })
        .catch(error => {
        })
    }
}