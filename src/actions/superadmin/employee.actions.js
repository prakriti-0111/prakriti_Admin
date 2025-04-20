import axios from 'actions/axios';
import {
    SUPERADMIN_LIST_EMPLOYEE,
    SUPERADMIN_ADD_EMPLOYEE,
    SUPERADMIN_GET_EMPLOYEE,
    SUPERADMIN_UPDATE_EMPLOYEE,
    SUPERADMIN_DELETE_EMPLOYEE,
} from '../../actionTypes/superadmin/employee.types';
import {objectToQuery} from 'src/helpers/helper';

export const employeeList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/superadmin/employees${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: SUPERADMIN_LIST_EMPLOYEE,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const employeeCreate = (data) => {
    return (dispatch) => {
        axios.post("/superadmin/employees/store", data)
        .then(response => {
                dispatch({
                    type: SUPERADMIN_ADD_EMPLOYEE,
                    payload: response.data
                });
        })
        .catch(error => {
        })
    }
}

export const employeeFetch = (id, role_id) => {
    role_id = role_id ? role_id : "";
    return (dispatch) => {
        axios.get(`/superadmin/employees/fetch/${id}?role_id=${role_id}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: SUPERADMIN_GET_EMPLOYEE,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const employeeUpdate = (id, data) => {
    return (dispatch) => {
        axios.post(`/superadmin/employees/update/${id}`, data)
        .then(response => {
                dispatch({
                    type: SUPERADMIN_UPDATE_EMPLOYEE,
                    payload: response.data
                });
        })
        .catch(error => {
        })
    }
}

export const employeeDelete = (id, data) => {
    return (dispatch) => {
        axios.delete(`/superadmin/employees/delete/${id}`, data)
        .then(response => {
                dispatch({
                    type: SUPERADMIN_DELETE_EMPLOYEE,
                    payload: response.data
                });
        })
        .catch(error => {
        })
    }
}