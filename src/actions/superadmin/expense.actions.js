import axios from 'actions/axios';
import {
    SUPERADMIN_LIST_EXPENSE,
    SUPERADMIN_ADD_EXPENSE,
    SUPERADMIN_GET_EXPENSE,
    SUPERADMIN_UPDATE_EXPENSE,
    //SUPERADMIN_DELETE_EXPENSE,
    SUPERADMIN_LIST_ATTENDANCE,
    SUPERADMIN_UPDATE_ATTENDANCE,
} from '../../actionTypes/superadmin/expense.types';
import {objectToQuery} from 'src/helpers/helper';

export const expenseList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/superadmin/expenses${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: SUPERADMIN_LIST_EXPENSE,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const expenseCreate = (data) => {
    return (dispatch) => {
        axios.post("/superadmin/expenses/store", data)
        .then(response => {
                dispatch({
                    type: SUPERADMIN_ADD_EXPENSE,
                    payload: response.data
                });
        })
        .catch(error => {
        })
    }
}

export const expenseFetch = (id) => {
    return (dispatch) => {
        axios.get(`/superadmin/expenses/fetch/${id}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: SUPERADMIN_GET_EXPENSE,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const expenseUpdate = (id, data) => {
    return (dispatch) => {
        axios.post(`/superadmin/expenses/update/${id}`, data)
        .then(response => {
                dispatch({
                    type: SUPERADMIN_UPDATE_EXPENSE,
                    payload: response.data
                });
        })
        .catch(error => {
        })
    }
}

/*export const employeeDelete = (id, data) => {
    return (dispatch) => {
        axios.delete(`/superadmin/expenses/delete/${id}`, data)
        .then(response => {
                dispatch({
                    type: SUPERADMIN_DELETE_EXPENSE,
                    payload: response.data
                });
        })
        .catch(error => {
        })
    }
}*/

export const attendanceList = (params) => {
    params = objectToQuery(params, true);
    return axios.get(`/superadmin/attendance-list${params}`);
}

export const getAttendence = (params) => {
    params = objectToQuery(params, true);
    return axios.get(`/superadmin/attendances${params}`);
}  

export const getAttendenceDetails = (params) => {
    params = objectToQuery(params, true);
    return axios.get(`/superadmin/attendance/fetch${params}`);
} 

export const attendanceUpdate = (id, data) => {
    return axios.post(`/superadmin/attendance/update/${id}`, data);
}

export const expenseUpdateStatus = (id, data) => {
    return axios.post(`/superadmin/expenses/update-status/${id}`, data);
}

