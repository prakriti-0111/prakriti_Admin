import axios from 'actions/axios';
import {
    SUPERADMIN_LIST_SALESEXECUTIVE,
    SUPERADMIN_ADD_SALESEXECUTIVE,
    SUPERADMIN_GET_SALESEXECUTIVE,
    SUPERADMIN_UPDATE_SALESEXECUTIVE,
    SUPERADMIN_DELETE_SALESEXECUTIVE,
} from '../../actionTypes/superadmin/salesExecutive.types';
import {objectToQuery} from 'src/helpers/helper';

export const salesExecutiveList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/superadmin/employees${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: SUPERADMIN_LIST_SALESEXECUTIVE,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const salesExecutiveCreate = (data) => {
    return (dispatch) => {
        axios.post("/superadmin/employees/store", data)
        .then(response => {
                dispatch({
                    type: SUPERADMIN_ADD_SALESEXECUTIVE,
                    payload: response.data
                });
        })
        .catch(error => {
        })
    }
}

export const salesExecutiveFetch = (id) => {
    return (dispatch) => {
        axios.get(`/superadmin/employees/fetch/${id}?role_id=4`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: SUPERADMIN_GET_SALESEXECUTIVE,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const salesExecutiveUpdate = (id, data) => {
    return (dispatch) => {
        axios.post(`/superadmin/employees/update/${id}`, data)
        .then(response => {
                dispatch({
                    type: SUPERADMIN_UPDATE_SALESEXECUTIVE,
                    payload: response.data
                });
        })
        .catch(error => {
        })
    }
}

export const salesExecutiveDelete = (id, data) => {
    return (dispatch) => {
        axios.delete(`/superadmin/employees/delete/${id}`, data)
        .then(response => {
                dispatch({
                    type: SUPERADMIN_DELETE_SALESEXECUTIVE,
                    payload: response.data
                });
        })
        .catch(error => {
        })
    }
}