import axios from 'actions/axios';
import {
    SUPERADMIN_LIST_EMPLOYEE_SALARY,
    SUPERADMIN_ADD_EMPLOYEE_SALARY,
    SUPERADMIN_GET_EMPLOYEE_SALARY,
    SUPERADMIN_UPDATE_EMPLOYEE_SALARY,
    //SUPERADMIN_DELETE_EMPLOYEE_SALARY,
} from '../../actionTypes/superadmin/employeeSalary.types';
import {objectToQuery} from 'src/helpers/helper';

export const employeeSalaryList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/superadmin/employees/salary/list${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: SUPERADMIN_LIST_EMPLOYEE_SALARY,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const employeeSalaryCreate = (data) => {
    return (dispatch) => {
        axios.post("/superadmin/employees/salary/store", data)
        .then(response => {
                dispatch({
                    type: SUPERADMIN_ADD_EMPLOYEE_SALARY,
                    payload: response.data
                });
        })
        .catch(error => {
        })
    }
}

export const employeeSalaryFetch = (id) => {
    return (dispatch) => {
        axios.get(`/superadmin/employees/salary/fetch/${id}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: SUPERADMIN_GET_EMPLOYEE_SALARY,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const employeeSalaryUpdate = (id, data) => {
    return (dispatch) => {
        axios.post(`/superadmin/employees/salary/update/${id}`, data)
        .then(response => {
                dispatch({
                    type: SUPERADMIN_UPDATE_EMPLOYEE_SALARY,
                    payload: response.data
                });
        })
        .catch(error => {
        })
    }
}

/*export const employeeDelete = (id, data) => {
    return (dispatch) => {
        axios.delete(`/superadmin/employees/salary/delete/${id}`, data)
        .then(response => {
                dispatch({
                    type: SUPERADMIN_DELETE_EMPLOYEE_SALARY,
                    payload: response.data
                });
        })
        .catch(error => {
        })
    }
}*/